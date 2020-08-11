pragma solidity ^0.6.1;
import "./Crowdsale.sol";
import "./KycContract.sol";

contract MyTokenSale is Crowdsale {
    KycContract kyc;

    constructor(
        uint256 rate,
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    ) public Crowdsale(rate, wallet, token) {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount)
        internal
        override
        view
    {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(
            kyc.completed(msg.sender),
            "KYC not completed, purchase not allowd"
        );
    }
}
