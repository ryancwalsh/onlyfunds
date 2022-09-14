// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC20.sol";
import "./Ownable.sol";

contract Project is ERC20, Ownable {
    uint public softCap;
    uint public hardCap;

    uint public startTime;
    uint public endTime;

    uint public totalFunding;
    uint public totalFunders;
    bool public fundingPeriod = true;
    bool public votingPeriod = false;
    bool public projectCancelled = false;

    mapping(uint => mapping(address => bool)) public alreadyVoted;
    uint public amountAlreadyVoted;

    uint public positivePhaseVotes = 0;
    uint public negativePhaseVotes = 0;
    uint public currentVoteIndex = 0;
    uint public positivePercentage = 0;
    uint public percentageVoted = 0;
    uint public totalVotes = 0;
    uint public negativePercentage = 0;

    bool public partialFundsWithdrawable = true;
    uint public partialFundAmount;

    uint public fixedTotalSupply;
    uint public fixedTotalFunding;

    // Denominator = 1000
    uint public majorityPercentage = 250;

    event Donation(address initiator, uint amount, uint timestamp);
    event PartialCashOut(address owner, uint amount, uint timestamp);
    event ProjectStopped(uint timestamp);

    modifier onlyFunders() {
        require(balanceOf(msg.sender) > 0, "Caller did not fund the project");
        _;
    }

    // Payable constructor can receive Ether
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        address _ownerAddress,
        uint _softCap,
        uint _hardCap,
        uint _startTime,
        uint _endTime
    ) ERC20("", "") {
        transferOwnership(_ownerAddress);
        softCap = _softCap;
        hardCap = _hardCap;
        startTime = _startTime;
        endTime = _endTime;
        _name = tokenName;
        _symbol = tokenSymbol;
    }

    receive() external payable {}

    // PUBLIC

    function donate() public payable {
        require(fundingPeriod == true, "Funding Period is over");
        require(
            block.timestamp > startTime,
            "Funding Period has not started yet"
        );
        require(
            block.timestamp < endTime,
            "The current time is greater than the end time of the fundraising period"
        );
        require(msg.value > 0, "Must donate more than 0");

        _mint(msg.sender, msg.value);
        totalFunding += msg.value;
        totalFunders++;
        emit Donation(msg.sender, msg.value, block.timestamp);
    }

    function initiateVote(uint amount) external onlyFunders {
        require(
            partialFundAmount == 0 && fundingPeriod == false,
            "Either partialFundAmount = 0 or fundingPeriod = true"
        );
        currentVoteIndex++;
        amountAlreadyVoted = 0;
        partialFundAmount = amount;
        // voting event emit
    }

    function vote(bool voteCast) external onlyFunders {
        require(partialFundAmount != 0, "partialFundAmount = 0");
        require(
            alreadyVoted[currentVoteIndex][msg.sender] == false,
            "You already voted"
        );

        if (voteCast == true) {
            positivePhaseVotes += balanceOf(msg.sender);
        } else {
            negativePhaseVotes += balanceOf(msg.sender);
        }

        alreadyVoted[currentVoteIndex][msg.sender] = true;
        amountAlreadyVoted++;

        percentageVoted = (amountAlreadyVoted * 1000) / totalFunders;
        totalVotes = positivePhaseVotes + negativePhaseVotes;

        if (percentageVoted < majorityPercentage) return;

        positivePercentage = (positivePhaseVotes * 1000) / totalVotes;

        if (positivePercentage > majorityPercentage) {
            partialFundsWithdrawable = true;

            positivePhaseVotes = 0;
            negativePhaseVotes = 0;
            percentageVoted = 0;
            totalVotes = 0;

            return;
        }

        negativePercentage = (negativePhaseVotes * 1000) / totalVotes;
        if (negativePercentage > majorityPercentage) {
            projectCancelled = true;

            positivePhaseVotes = 0;
            negativePhaseVotes = 0;
            percentageVoted = 0;
            totalVotes = 0;

            saveTotals();
        }
    }

    // OWNER

    function concludeFundingPeriod() external onlyOwner {
        require(fundingPeriod == true, "fundingPeriod = false");
        require(
            block.timestamp > endTime || totalFunding > hardCap,
            "Either block.timestamp <= endTime or totalFunding <= hardCap"
        );

        if (totalFunding >= softCap) {
            fundingPeriod = false;
            partialFundsWithdrawable = true;
            partialFundAmount = (address(this).balance * 25) / 100;
        } else {
            projectCancelled = true;
            saveTotals();
        }
    }

    function withdrawInvestment() public onlyOwner {
        require(projectCancelled == false, "Project has been cancelled");
        require(fundingPeriod == false, "Project is still being funded");
        require(
            partialFundsWithdrawable == true,
            "partialFundsWithdrawable = false"
        );

        partialFundsWithdrawable = false;

        payable(owner()).transfer(partialFundAmount);

        partialFundAmount = 0;

        // emit PartialCashOut(owner(), amount, block.timestamp);
    }

    function saveTotals() internal {
        fixedTotalSupply = totalSupply();
        fixedTotalFunding = totalFunding;
    }

    function stopProject() public onlyOwner {
        require(projectCancelled == false, "projectCancelled = true");
        projectCancelled = true;
        saveTotals();

        emit ProjectStopped(block.timestamp);
    }

    // EMERGENCY
    function emergencyWithdraw() external onlyFunders {
        require(projectCancelled == true, "Project has not failed");
        require(
            balanceOf(msg.sender) > 0,
            "You have no voting tokens for this project"
        );
        uint percentage = (balanceOf(msg.sender) * 1000) / fixedTotalSupply;
        uint partialAmount = (percentage * fixedTotalFunding) / 1000;
        _burn(msg.sender, balanceOf(msg.sender));
        // Currently not Reentrancy Safe
        payable(msg.sender).transfer(partialAmount);
    }
}
