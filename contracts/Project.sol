// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC20.sol";
import "./Ownable.sol";

contract Project is ERC20, Ownable {
    uint public softCap;
    uint public hardCap;
    uint public minimumContribution;
    uint public maximumContribution;
    uint public fundingEndTime;
    uint public fundingStartTime;
    bool public fundingPeriod = true;
    uint public totalFunders;

    uint public partialFundAmount;
    bool public partialFundsCollectable = true;

    uint private _currentVoteIndex;
    uint public votingDuration = 1 minutes;
    uint public votingCooldown = 2 minutes;
    mapping (uint => Voting) private _votings;

    bool public cancelled;
    uint private _fixedTotalSupply;
    uint private _fixedTotalFunding;

    event Donation(address initiator, uint amount, uint timestamp);
    event PartialCashOut(address owner, uint amount, uint timestamp);
    event ProjectStopped(uint timestamp);

    modifier onlyFunders() {
        require(isFunder(msg.sender), "ONLYFUNDS: caller did not fund the project");
        _;
    }

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        address _ownerAddress,
        uint _softCap,
        uint _hardCap,
        uint _fundingStartTime,
        uint _fundingEndTime
    ) ERC20("", "") {
        transferOwnership(_ownerAddress);
        softCap = _softCap;
        hardCap = _hardCap;
        fundingStartTime = _fundingStartTime;
        fundingEndTime = _fundingEndTime;
        _name = tokenName;
        _symbol = tokenSymbol;
    }

    enum VotingType {
        releaseVoting,
        cancelVoting
    }

    struct Voting {
        mapping (address => bool) voted;
        uint positiveVotes;
        uint negativeVotes;
        VotingType category;
        uint startTime;
        uint endTime;
        uint totalVoters;
        bool running;
    }

    // account is funder if he owns voting power tokens
    function isFunder(address account) public view returns (bool) {
        return balanceOf(account) > 0;
    }

    function getFundingBalance() public view returns (uint) {
        return address(this).balance;
    }

    // returns remaining seconds till the end of voting
    function getRemainingVotingDuration() external view returns (uint) {
        uint endTime = _votings[_currentVoteIndex].endTime;

        if (endTime < block.timestamp) {
            return 0;
        } else {
            return endTime - block.timestamp;
        }

    }

    // returns remaining seconds till next voting can be casted
    function getRemainingVotingCooldown() public view returns (uint) {
        uint endTime = _votings[_currentVoteIndex].endTime;

        if ((endTime + votingCooldown) < block.timestamp) {
            return 0;
        } else {
            return (endTime + votingCooldown) - block.timestamp;
        }
    }

    // returns ramaining seconds till funding period is over
    function getRemainingFundingDuration() external view returns (uint) {
        if (block.timestamp < fundingStartTime || fundingEndTime < block.timestamp) {
            return 0;
        } else {
            return fundingEndTime - block.timestamp;
        }
    }

    // mints equivalent token value based on the donation to the donator
    function donate() external payable {
        require(fundingPeriod == true, "ONLYFUNDS: funding period is over");
        require(block.timestamp > fundingStartTime, "ONLYFUNDS: funding period has not started yet");
        require(block.timestamp < fundingEndTime, "ONLYFUNDS: funding period exceeded but not concluded");
        require(msg.value >= minimumContribution && msg.value <= maximumContribution, "ONLYFUNDS: amount exceeds allowed range");
        require((getFundingBalance() + msg.value) < hardCap, "ONLYFUNDS: donation exceeds hardcap");

        //checks if address already donated, if not number of funders increases by 1
        if (balanceOf(msg.sender) == 0) {
            totalFunders++;
        }

        _mint(msg.sender, msg.value);
        emit Donation(msg.sender, msg.value, block.timestamp);
    }

    // project owner gets initial 25% released
    function concludeFundingPeriod() external onlyOwner {
        require(fundingPeriod == true, "ONLYFUNDS: funding period is already concluded");
        require(block.timestamp > fundingEndTime, "ONLYFUNDS: funding period did not end yet");
        require(cancelled == false, "ONLYFUNDS: project is already cancelled");

        if (getFundingBalance() >= softCap) {
            fundingPeriod = false;
            partialFundAmount = getFundingBalance() * 25 / 100;

        } else {
            cancelled = true;
            saveTotals();
        }
    }

    // partial collecting of released funds
    function collectFunds() external onlyOwner {
        require(cancelled == false, "ONLYFUNDS: project is cancelled");
        require(fundingPeriod == true, "ONLYFUNDS: project is still being funded");
        require(partialFundsCollectable == true, "ONLYFUNDS: no collectable funds");

        // reentrancysafe
        partialFundsCollectable = false;
        uint amount = partialFundAmount;
        partialFundAmount = 0;
        payable(owner()).transfer(partialFundAmount);

        emit PartialCashOut(owner(), amount, block.timestamp);
    }

    function saveTotals() internal {
        _fixedTotalSupply = totalSupply();
        _fixedTotalFunding = getFundingBalance();
    }

    // refund of remaining balance after project gets cancelled
    function emergencyWithdraw() external onlyFunders {
        require(cancelled == false, "ONLYFUNDS: project is not cancelled");
        require(balanceOf(msg.sender) > 0, "ONLYFUNDS: missing voting tokens");

        uint percentage = (balanceOf(msg.sender) * 1000) / _fixedTotalSupply;
        uint partialAmount = (percentage * _fixedTotalFunding) / 1000;

        // reentrancysafe
        _burn(msg.sender, balanceOf(msg.sender));
        payable(msg.sender).transfer(partialAmount);
    }

    // starts voting to release a partial amount to the project
    function startReleaseVoting(uint amount) external onlyFunders {
        _initiateVoting(VotingType.releaseVoting);
        partialFundAmount = amount;
    }

    // starts voting for releasing project funda after failed promises / inactive project
    function startCancelVoting() external onlyFunders {
        _initiateVoting(VotingType.cancelVoting);
    }

    function _initiateVoting(VotingType _type) internal {
        require(cancelled == false, "ONLYFUNDS: project is already cancelled");
        require(_votings[_currentVoteIndex].running == false, "ONLYFUNDS: vote already running");
        require(getRemainingVotingCooldown() == 0, "ONLYFUNDS: last voting still on cooldown");

        _currentVoteIndex++;

        Voting storage currentVote = _votings[_currentVoteIndex];
        currentVote.running = true;
        currentVote.startTime = block.timestamp;
        currentVote.endTime = block.timestamp + votingDuration;
        currentVote.category = _type;
    }

    function vote(bool voteState) external onlyFunders {
        Voting storage currentVote =  _votings[_currentVoteIndex];

        require(currentVote.running == true, "Vote not started");
        require(block.timestamp < currentVote.endTime, "Voting period already over");
        require(currentVote.voted[msg.sender] == false, "already voted");

        currentVote.voted[msg.sender] = true;
        currentVote.totalVoters++;

        if (voteState == true) {
            currentVote.positiveVotes += balanceOf(msg.sender);
        } else {
            currentVote.negativeVotes += balanceOf(msg.sender);

        }

        uint majorityWeight = totalSupply() * 10 / 2;

        if ((currentVote.positiveVotes * 10) >= majorityWeight) {
            currentVote.endTime = block.timestamp;
            currentVote.running = false;

            if (currentVote.category == VotingType.releaseVoting) {
                partialFundsCollectable = true;

            } else if (currentVote.category == VotingType.cancelVoting) {
                cancelled = true;
                saveTotals();
            }

        } else if ((currentVote.negativeVotes * 10) >= majorityWeight) {
            currentVote.endTime = block.timestamp;
            currentVote.running = false;
        }

    }

    // conclude voting manually (if not enough people voted for example) (important to check for voting category?)
    function concludeVoting() external onlyFunders {
        Voting storage currentVote =  _votings[_currentVoteIndex];
        require(currentVote.running == true, "ONLYFUNDS: voting already concluded");
        require(block.timestamp > currentVote.endTime, "ONLYFUNDS: voting still running");

        currentVote.running = false;
    }

    // cancels project and gives funders access to the remains
    function endProject() external onlyOwner {
        require(cancelled == false, "ONLYFUNDS: project is already cancelled");

        cancelled = true;
        saveTotals();

        emit ProjectStopped(block.timestamp);
    }
}