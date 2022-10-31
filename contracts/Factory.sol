// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./Project.sol";

contract Factory is Ownable {
    mapping(address => address) private _projects;

    function getProject(
        address owner
    ) external view returns (address) {
        return _projects[owner];
    }

    function createProject(
        string memory tokenName,
        string memory tokenSymbol,
        address ownerAddress,
        uint softCap,
        uint hardCap,
        uint minimumContribution,
        uint maximumContribution,
        uint startTime,
        uint endTime
    ) external {
        // TODO: cleanup after fail / success + long after
        require(_projects[msg.sender] == address(0), "ONLYFUNDS: account already owns a running project");

        Project project = new Project(
            tokenName,
            tokenSymbol,
            ownerAddress,
            softCap,
            hardCap,
            minimumContribution,
            maximumContribution,
            startTime,
            endTime
        );
        _projects[msg.sender] = address(project);
    }
}
