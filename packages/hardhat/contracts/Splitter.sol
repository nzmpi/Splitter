//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Splitter is ReentrancyGuard {
  address public owner;
  // 100% == 1000
  uint16 public tax;
  TestToken public token;

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
    uint256 totalAmount;
    for (uint256 i; i < _receivers.length; ++i) {
      (bool success, ) = _receivers[i].call{value: _amounts[i]}("");
      if (!success) revert InvalidInput();
      totalAmount += _amounts[i];
    }

    if (totalAmount*(1000+tax)/1000 > msg.value) revert InvalidInput();
    emit SplitEthEvent(msg.sender, _receivers, _amounts);
  }

  function splitToken(
    address _token,
    address[] calldata _receivers,
    uint256[] calldata _amounts
  ) external nonReentrant {
    if (_receivers.length != _amounts.length) revert InvalidInput();

    uint256 totalAmount;
    for (uint256 i; i < _receivers.length; ++i) {
      IERC20(_token).transferFrom(msg.sender, _receivers[i], _amounts[i]);
      totalAmount += _amounts[i];
    }

    uint256 tax_ = tax;
    if (tax_ != 0) IERC20(_token).transferFrom(msg.sender, owner, totalAmount*tax_/1000);
    emit SplitTokenEvent(msg.sender, _receivers, _amounts, _token);
  }

  function createToken() external {
    token = new TestToken();
    token.mint(10000);
    token.approveAll(msg.sender);
  }

  function getBalance(address _in) external view returns (uint256) {
    return token.balanceOf(_in);
  }

  function getSupply() external view returns (uint256) {
    return token.totalSupply();
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

  function withdrawEth() external onlyOwner {
    (bool success, ) = owner.call{value: address(this).balance}("");
    if (!success) revert();
  }

  error NotOwner();
  error TaxTooHigh();
  error InvalidInput();

  event OwnershipTransferred(address oldOwner, address newOwner);
  event TaxChanged(uint16 oldTax, uint16 newTax);
  event SplitEthEvent(address from, address[] to, uint256[] amounts);
  event SplitTokenEvent(address from, address[] to, uint256[] amounts, address token);
}

contract TestToken is ERC20 {
  constructor() ERC20("TestToken","TEST") {}

  function mint(uint256 _amount) external {
    _mint(tx.origin, _amount);
  }

  function approveAll(address _owner) external {
    _approve(_owner, msg.sender, type(uint256).max);
  }

}
