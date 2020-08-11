const Token = artifacts.require("MyToken");
const chai = require("./setupChai");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Token test", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    this.myToken = await Token.new(process.env.INITIAL_TOKENS);
  });

  it("should all token be in my account ", async () => {
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    return expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("should be possible to send tokens between accounts", async () => {
    const sentTokens = 1;
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();

    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.bignumber.equal(totalSupply);
    expect(instance.transfer(recipient, sentTokens)).to.be.fulfilled;
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.bignumber.equal(totalSupply.sub(new BN(sentTokens)));
    return expect(
      instance.balanceOf(recipient)
    ).to.eventually.be.a.bignumber.equal(new BN(sentTokens));
  });

  it("not possible to send more tokens than available in total ", async () => {
    let instance = this.myToken;
    let balanceOfDeployer = await instance.balanceOf(deployerAccount);

    expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to
      .eventually.be.rejected;
    return expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
  });
});
