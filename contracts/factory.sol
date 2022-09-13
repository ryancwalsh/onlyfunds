// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./Project.sol";

contract Factory is Ownable {
    mapping(address => address[]) private _projects;

    function getProject(address owner)
        external
        view
        returns (address[] memory)
    {
        return _projects[owner];
    }

    function createProject(
        string memory tokenName,
        string memory tokenSymbol,
        address ownerAddress,
        uint softCap,
        uint hardCap,
        uint startTime,
        uint endTime
    ) external {
        Project project = new Project(
            tokenName,
            tokenSymbol,
            ownerAddress,
            softCap,
            hardCap,
            startTime,
            endTime
        );
        _projects[msg.sender].push(address(project));
    }
}
