pragma solidity ^0.6.1;

contract Ownable {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function isOwner() internal view returns (bool) {
        return msg.sender == owner;
    }

    modifier onlyOwner() {
        require(isOwner(), "You are not the owner");
        _;
    }
}

contract KycContract is Ownable {
    mapping(address => bool) allowed;

    function setKycCompleted(address _addr) public onlyOwner {
        allowed[_addr] = true;
    }

    function setKycRevoked(address _addr) public onlyOwner {
        allowed[_addr] = false;
    }

    function completed(address _addr) public view returns (bool) {
        return allowed[_addr];
    }

    function revoked(address _addr) public view returns (bool) {
        return allowed[_addr];
    }
}
