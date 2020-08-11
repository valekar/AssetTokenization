pragma solidity ^0.6.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Blocky_Works", "BLW") {
        _setupDecimals(0);
        _mint(msg.sender, initialSupply);
    }
}
