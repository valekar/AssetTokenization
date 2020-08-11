var myToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
var KycContract = artifacts.require("./KycContract");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(myToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(KycContract);
  await deployer.deploy(
    MyTokenSale,
    1,
    addr[0],
    myToken.address,
    KycContract.address
  );

  let instance = await myToken.deployed();
  await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
};
