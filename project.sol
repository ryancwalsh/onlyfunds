// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.3/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.7.3/access/Ownable.sol";

contract Payable {
    // Payable address can receive Ether
    address payable public owner;

    // ATTS

        // this can be set by the factory?
        uint public timeToDeadline = 30 days; 
        // this should be set by the factory
        // uint public fundraiseStartTime = block.timestamp;
        uint public fundraiseStartTime = 70 days; 
        uint public fundraiseEndTime = fundraiseStartTime + timeToDeadline;

    // Payable constructor can receive Ether
    constructor() payable {
        owner = payable(msg.sender);
    }

    // METHODS

        function donate() public payable {
            if (fundraiseStartTime + timeToDeadline < block.timestamp) {
            // give donator DAO Token
            _mint(msg.sender, msg.value);
            totalFunds += msg.value;
            }
        }

        // Function to withdraw all Ether from this contract.
        function withdrawInvestment() public onlyOwner {
        // get the amount of Ether stored in this contract
            uint amount = address(this).balance;

            // send all Ether to owner
            // Owner can receive Ether since the address of owner is payable
            // --- how accurate is the timestamp thing?
            if (fundraiseStartTime + timeToDeadline < block.timestamp)
            (bool success, ) = owner.call{value: amount}("");
            require(success, "Failed to withdraw");
        }

        function withdrawDAO() public {

        }


        function stopProject() public onlyOwner {
            
        }

}