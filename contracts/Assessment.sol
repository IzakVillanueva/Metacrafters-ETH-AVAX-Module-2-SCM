// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Tavern {
    address payable public owner; 
    uint256 public tab;
    uint256 public level;

    event Deposit(uint256 amount);
    event Purchase(uint256 amount);
    event IncreaseLevel(uint256 amount);

    constructor(uint initTab) payable {
        owner = payable(msg.sender);
        tab = initTab;
    }

    function getTab() public view returns(uint256){
        return tab;
    }

    function getLevel() public view returns(uint256){
        return level;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousTab = tab;
        require(msg.sender == owner, "You are not the owner of this account");
        tab += _amount;
        assert(tab == _previousTab + _amount);
        emit Deposit(_amount);
    }

    function increaseLevel(uint256 _lvl) public {
        uint _previousLevel = level;
        level += _lvl;
        assert(level == _previousLevel + _lvl);
        emit IncreaseLevel(_lvl);
    }

    // custom error
    error InsufficientTab(uint256 tab, uint256 purchaseAmount);

    function purchase(uint256 _purchaseAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousTab = tab;
        if (tab < _purchaseAmount) {
            revert InsufficientTab({
                tab: tab,
                purchaseAmount: _purchaseAmount
            });
        }
        tab -= _purchaseAmount;
        assert(tab == (_previousTab - _purchaseAmount));
        emit Purchase(_purchaseAmount);
    }
}
