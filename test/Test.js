const { expect} = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");
// cc2e3ffadffc44e4cb8c405c95a5e3aa9
describe("Test contact",async() =>{
    let contract;
    let accounts;
    beforeEach(async() => {
        const ContractFactory = await ethers.getContractFactory("Test");
        contract = await ContractFactory.deploy();
        accounts = await ethers.getSigners();
        await contract.deployed();
    })
    it("False Must Be False",async() => {
        expect(false).to.be.false;
    })
})