//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Splitter is ReentrancyGuard {
  address public owner;
  // 100% == 1000
  uint16 public tax;

  constructor () {
    owner = 0xc8ED1BFD9c71dC422BEA203BD8d869b55Bf252dd;
  }

  modifier onlyOwner() {
    if (msg.sender != owner) revert NotOwner();
    _;
  }

  function splitEth(
    address[] calldata _receivers,
    uint256[] calldata _amounts
  ) external payable nonReentrant {
    if (_receivers.length != _amounts.length) revert InvalidInput();
    uint256 tax_ = tax;
    uint256 totalAmount;
    if (tax_ == 0) {
      for (uint256 i; i < _receivers.length; ++i) {
        (bool success, ) = _receivers[i].call{value: _amounts[i]}("");
        if (!success) revert InvalidInput();
        totalAmount += _amounts[i];
      }
    } else {
      for (uint256 i; i < _receivers.length; ++i) {
        (bool success, ) = _receivers[i].call{value: _amounts[i]*(1000-tax_)/1000}("");
        if (!success) revert InvalidInput();
        totalAmount += _amounts[i];
      }
    }

    if (totalAmount > msg.value) revert InvalidInput();
    emit SplitEthEvent(msg.sender, _receivers, _amounts);
  }

  function splitToken(
    address _token,
    address[] calldata _receivers,
    uint256[] calldata _amounts
  ) external nonReentrant {
    if (_receivers.length != _amounts.length) revert InvalidInput();
    uint256 tax_ = tax;
    uint256 totalAmount;
    if (tax_ == 0) {
      for (uint256 i; i < _receivers.length; ++i) {
        IERC20(_token).transferFrom(msg.sender, _receivers[i], _amounts[i]);
        totalAmount += _amounts[i];
      }
    } else {
      for (uint256 i; i < _receivers.length; ++i) {
        IERC20(_token).transferFrom(msg.sender, _receivers[i], _amounts[i]*(1000-tax_)/1000);
        totalAmount += _amounts[i];
      }
    }

    if (tax_ != 0) IERC20(_token).transferFrom(msg.sender, owner, totalAmount*tax_/1000);
    emit SplitTokenEvent(msg.sender, _receivers, _amounts, _token);
  }

  function getBal(address _in) external view returns (uint256) {
    return _in.balance;
  }

  function setTax(uint16 _newTax) external onlyOwner {
    if (_newTax > 1000) revert TaxTooHigh();
    emit TaxChanged(tax, _newTax); 
    tax = _newTax;
  }

  function transferOwnership(address _newOwner) external onlyOwner {  
    owner = _newOwner;
    emit OwnershipTransferred(msg.sender, _newOwner);
  }

  error NotOwner();
  error TaxTooHigh();
  error InvalidInput();

  event OwnershipTransferred(address oldOwner, address newOwner);
  event TaxChanged(uint16 oldTax, uint16 newTax);
  event SplitEthEvent(address from, address[] to, uint256[] amounts);
  event SplitTokenEvent(address from, address[] to, uint256[] amounts, address token);
}
