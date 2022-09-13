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
    bool public projectCancelled = true;

    mapping(uint => mapping(address => bool)) private alreadyVoted;
    uint private amountAlreadyVoted;

    uint public positivePhaseVotes;
    uint public negativePhaseVotes;
    uint public currentVoteIndex;

    bool public partialFundsWithdrawable;
    uint public partialFundAmount;

    uint private fixedTotalSupply;
    uint private fixedTotalFunding;

    // Denominator = 1000
    uint public majorityPercentage = 510;

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
        emit Donation(msg.sender, msg.value, block.timestamp);
    }

    function initiateVote(uint amount) external onlyFunders {
        require(
            partialFundAmount == 0 && fundingPeriod == false,
            "Either partialFundAmount = 0 or fundingPeriod = false"
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

        uint percentageVoted = (amountAlreadyVoted * 1000) / totalFunders;
        uint totalVotes = positivePhaseVotes + negativePhaseVotes;

        if (percentageVoted < majorityPercentage) return;

        uint positivePercentage = (positivePhaseVotes * 1000) / totalVotes;

        if (positivePercentage > majorityPercentage) {
            partialFundsWithdrawable = true;
            return;
        }

        uint negativePercentage = (negativePhaseVotes * 1000) / totalVotes;
        if (negativePercentage > majorityPercentage) {
            projectCancelled = true;
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
        } else {
            projectCancelled = true;
            saveTotals();
        }
    }

    function withdrawInvestment() public onlyOwner {
        require(projectCancelled == false, "Project has been cancelled");
        require(
            partialFundsWithdrawable == true,
            "partialFundsWithdrawable = false"
        );

        payable(owner()).transfer(partialFundAmount);

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
