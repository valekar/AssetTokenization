# Smart Contract development

This is a smart contract setup for asset tokenization. The idea is that one can generate ERC 20 token (fungible token). We have used OpenZeppelin CrowdSale contract. We use visual code to develop the dapp applications

## To Install Truffle

Run `npm install -g truffle`

## Truffle project setup

1. Run `truffle unbox react` to get a project with client as React
2. Add your smart contracts in your contracts folder
3. Run `truffle develop` to start a develop blockchain in your project
4. Run `truffle migrate --reset` to deploy your smart contracts
5. Run `truffle test` to test your contracts

### Some details

1. Used chai to test the smart contracts. For more details explore OpenZeppelin test cases to understand on how to write test cases.

2. Add **openzeppelin** as a node dependency - Run `npm install @openzeppelin/contracts`

### truffle-config.js file changes

In this file set the compilers version correctly to remove the errors in your visual code studio. Below is one such example -

```
compilers: {
    solc: {
      version: "^0.6.1",
    },
  },

```

More details can be found in [Truffle Config](https://www.trufflesuite.com/docs/truffle/reference/configuration)

### Gas Cost

PS : Gas cost for now is 0.04 ether
