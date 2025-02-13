const fs = require('fs');
require("@nomicfoundation/hardhat-toolbox");

const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    // mumbai: {
    //   url: "https://rpc-mumbai.maticvigil.com",
    //   accounts: [privateKey]
    // }
  },
  solidity: "0.8.4",
};
