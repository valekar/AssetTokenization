require("dotenv").config({ path: "../.env" });

const chai = require("./setupChai");
const { myToken } = require("./MyToken.test");
const BN = web3.utils.BN;

const expect = chai.expect;

const MySaleToken = artifacts.require("MyTokenSale");
const MyToken = artifacts.require("MyToken");
const MyKycContract = artifacts.require("KycContract");

contract("Token Sale test", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  it("should not have any tokens in my deployerAccount", async () => {
    let instance = await MyToken.deployed();
    return expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("all tokens should be in the token sale contract ", async () => {
    let instance = await MyToken.deployed();
    let myTokenSaleInstance = await MySaleToken.deployed();
    let balanceOfTokenSaleContract = await instance.balanceOf(
      myTokenSaleInstance.address
    );
    let totalSupply = await instance.totalSupply();

    return expect(balanceOfTokenSaleContract).to.be.a.bignumber.equal(
      totalSupply
    );
  });

  it("should be possible to buy tokens", async () => {
    let tokenInstance = await MyToken.deployed();
    let saleTokenInstance = await MySaleToken.deployed();
    let kycContractInstance = await MyKycContract.deployed();

    let balanceBefore = await tokenInstance.balanceOf(deployerAccount);

    await kycContractInstance.setKycCompleted(deployerAccount, {
      from: deployerAccount,
    });

    expect(
      saleTokenInstance.sendTransaction({
        from: deployerAccount,
        value: web3.utils.toWei("1", "wei"),
      })
    ).to.be.fulfilled;
    return expect(
      tokenInstance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
  });
});
