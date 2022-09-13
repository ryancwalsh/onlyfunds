// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.3/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.7.3/access/Ownable.sol";

contract MyToken is ERC20, Ownable {

    // ATTS
    
        uint256 public totalFunds = 0;
        uint public timeToDeadline = 30 days; 
        //uint public fundraiseStartTime = block.timestamp;
        uint public fundraiseStartTime = 70 days; 
        uint public fundraiseEndTime = fundraiseStartTime + timeToDeadline;

    constructor() ERC20("MyToken", "MTK") {}

    // METHODS
        
        function mint(address to, uint256 amount) public onlyOwner {
            _mint(to, amount);
        }


}