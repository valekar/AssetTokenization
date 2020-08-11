"use strict";

require("dotenv").config({ path: "../.env" });
var chai = require("chai");

const BN = web3.utils.BN;

module.exports = BN;

var chaiBN = require("chai-bn")(BN);

chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

module.exports = chai;
