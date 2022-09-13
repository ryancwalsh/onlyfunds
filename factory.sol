// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./token.sol";

contract MyToken is ERC20, Ownable {
    // ATTS

    constructor() ERC20("MyToken", "MTK") {}

    // METHODS

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function create(address from, uint256 amount) public onlyOwner {
        Project project = new Project();
    }
}
