//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title SplitterX is a contract that helps to split eth or ERC20 tokens
 * @author devorsmth.eth
 */
contract SplitterX is ReentrancyGuard {
  using SafeERC20 for IERC20;
  address public owner;
  // 100% == 1000
  uint16 public fee;

  constructor () payable {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    if (msg.sender != owner) revert NotOwner();
    _;
  }
  /**
   * @notice If fee != zero msg.value must include fee
   */
  function splitEth(
    address[] calldata _receivers,
    uint256[] calldata _amounts
  ) external payable nonReentrant {
    uint256 length = _receivers.length;
    if (length != _amounts.length) revert InvalidInput();
    uint256 totalAmount;
    for (uint256 i; i < length; ) {
      if (address(0) == _receivers[i]) revert InvalidInput();
      if (0 == _amounts[i]) revert InvalidInput();
      (bool success, ) = _receivers[i].call{value: _amounts[i]}("");
      if (!success) revert NotSentTo(_receivers[i]);
      totalAmount += _amounts[i];
      unchecked {++i;}
    }

    uint256 fee_ = fee;
    if (0 != fee_) {
      if (msg.value < totalAmount*(1000+fee_)/1000) revert InvalidInput();
    }
    emit SplitEthEvent(msg.sender, _receivers, _amounts);
  }

  /**
   * @notice If fee != zero fee amount of tokens should be also approved
   */
  function splitToken(
    address _token,
    address[] calldata _receivers,
    uint256[] calldata _amounts
  ) external nonReentrant {
    uint256 length = _receivers.length;
    if (length != _amounts.length) revert InvalidInput();
    if (address(0) == _token) revert InvalidInput();

    uint256 totalAmount;
    for (uint256 i; i < length; ) {
      if (address(0) == _receivers[i]) revert InvalidInput();
      if (0 == _amounts[i]) revert InvalidInput();
      IERC20(_token).safeTransferFrom(msg.sender, _receivers[i], _amounts[i]);
      totalAmount += _amounts[i];
      unchecked {++i;}
    }

    uint256 fee_ = fee;
    if (0 != fee_) IERC20(_token).safeTransferFrom(msg.sender, address(this), totalAmount*fee_/1000);
    emit SplitTokenEvent(msg.sender, _receivers, _amounts, _token);
  }

  function setFee(uint16 _newFee) external payable onlyOwner {
    if (1000 < _newFee) revert FeeTooHigh();
    emit FeeChangedEvent(fee, _newFee); 
    fee = _newFee;
  }

  function transferOwnership(address _newOwner) external payable onlyOwner {  
    owner = _newOwner;
    emit OwnershipTransferredEvent(msg.sender, _newOwner);
  }

  function withdrawEth() external payable onlyOwner {
    uint256 amount = address(this).balance;
    if (0 != amount) {
      (bool success, ) = msg.sender.call{value: amount}("");
      if (!success) revert NotSentTo(msg.sender);
    } else revert NotSentTo(msg.sender);
  }

  function withdrawTokens(address _token) external payable onlyOwner {
    uint256 amount = IERC20(_token).balanceOf(address(this));
    if (0 != amount) IERC20(_token).safeTransfer(msg.sender, amount);
    else revert NotSentTo(msg.sender);
  }

  receive() external payable {}

  error NotOwner();
  error FeeTooHigh();
  error InvalidInput();
  error NotSentTo(address receiver);

  event OwnershipTransferredEvent(address indexed oldOwner, address indexed newOwner);
  event FeeChangedEvent(uint16 oldFee, uint16 newFee);
  event SplitEthEvent(address indexed from, address[] indexed to, uint256[] amounts);
  event SplitTokenEvent(address indexed from, address[] indexed to, uint256[] amounts, address token);
}
