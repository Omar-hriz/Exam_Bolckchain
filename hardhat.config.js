require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url:'https://goerli.infura.io/v3/cc2e3fadffc44e4cb8c405c95a5e3aa9',
      chainId: 5,
      accounts: ["512b6c9b8b710d398c0eccf17b0a93035ba5cbeb7afea50ead7ebecdacb357ba"]
    }
  },
  etherscan:{
    apiKey:{
      goerli: "6H8E2E378JHE1TUPXCBXSVIX5MJZY3TWEX"
    }
  }
};
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
};
