import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyToken.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    loaded: false,
    kycAddress: "0xDF52226b26C1425A825b40E1aDF29CA2f20ef23b",
    tokenSaleAddress: null,
    userTokens: 0,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      this.web3 = web3;
      // Use web3 to get the user's accounts.
      this.accounts = await web3.eth.getAccounts();
      console.log(this.accounts[0]);

      // Get the contract instance.
      this.networkId = await web3.eth.net.getId();
      this.tokenInstance = new web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] &&
          MyToken.networks[this.networkId].address
      );

      this.tokenSaleInstance = new web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] &&
          MyTokenSale.networks[this.networkId].address
      );

      console.log(KycContract.networks[this.networkId].address);

      this.kycInstance = new web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] &&
          KycContract.networks[this.networkId].address
      );

      this.listenToTokenTransfer();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        loaded: true,
        tokenSaleAddress: MyTokenSale.networks[this.networkId].address,
        userTokens: this.updateUserTokens,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  updateUserTokens = async () => {
    let userTokens = await this.tokenInstance.methods
      .balanceOf(this.accounts[0])
      .call();
    this.setState({ userTokens: userTokens });
  };
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleWhitelisting = async () => {
    const result = await this.kycInstance.methods
      .setKycCompleted(this.state.kycAddress)
      .send({ from: this.accounts[0] });

    console.log(result);
  };

  listenToTokenTransfer = () => {
    this.tokenInstance.events
      .Transfer({ to: this.accounts[0] })
      .on("data", this.updateUserTokens);
  };

  handleBuyTokens = async () => {
    await this.tokenSaleInstance.methods.buyTokens(this.accounts[0]).send({
      from: this.accounts[0],
      value: this.web3.utils.toWei("1", "wei"),
    });
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2>Token sale</h2>
        <h3>Kyc whitelist</h3>
        Address to Allow :{" "}
        <input
          type="text"
          name="kycAddress"
          value={this.state.kycAddress}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleWhitelisting}> Whitelist</button>
        <h2>Buy Tokens? send them to {this.state.tokenSaleAddress}</h2>
        <p>you currently have :{this.state.userTokens}</p>
        <button onClick={this.handleBuyTokens}> Buy MOre Tokens</button>
      </div>
    );
  }
}

export default App;
