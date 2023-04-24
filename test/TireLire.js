const { expect} = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");
// cc2e3ffadffc44e4cb8c405c95a5e3aa9
describe.only("Test contact",async() =>{
    let contract;
    let accounts;
    beforeEach(async() => {
        const ContractFactory = await ethers.getContractFactory("TireLire");
        contract = await ContractFactory.deploy();
        accounts = await ethers.getSigners();
        await contract.deployed();
    })

    it("False Must Be False",async() => {
        expect(false).to.be.false;
    })

    it("It shoud have a proper name", async() => {
        const name = await contract.name();
        expect(name).to.eq("TireLire");
    })

    it("It shoud have a proper symbol", async() => { 
        const symbol = await contract.symbol();
        expect(symbol).to.eq("TRL");
    })

    it("User can deposit funds",async() => {
        await contract.connect(accounts[0]).depositFunds({value: ethers.utils.parseEther("0.1")});
        expect(await ethers.provider.getBalance(contract.address)).to.be.eq(ethers.utils.parseEther("0.1"));
    })

    it("It should know how mush a user have",async() => {
        await contract.connect(accounts[0]).depositFunds({value: ethers.utils.parseEther("0.1")});
        const balances = await contract.balances(accounts[0].address);
        expect(balances).to.be.eq(ethers.utils.parseEther("0.1"));
    })
})