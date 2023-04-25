const { expect} = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

// cc2e3ffadffc44e4cb8c405c95a5e3aa9
describe.only("Test contact",async() =>{
    let contract;
    let accounts;
    let send ;
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

    it("You can only deposit once", async() => {
        await contract.connect(accounts[0]).depositFunds({value: ethers.utils.parseEther("0.1")});
        const before = await ethers.provider.getBalance(contract.address);
        await contract.connect(accounts[0]).depositFunds({value: ethers.utils.parseEther("0.1")});
        const after = await ethers.provider.getBalance(contract.address);
        expect(before).to.be.eq(after);
    })

    it("It should penlise for a withdraw before 24h",async() => {
        const balanceBefore = await ethers.provider.getBalance(accounts[0].address);
        await contract.connect(accounts[0]).depositFunds({value: ethers.utils.parseEther("0.1")});
        await contract.connect(accounts[0]).withdrawfunds();
        const balanceAfter = await ethers.provider.getBalance(accounts[0].address);
        expect(balanceBefore.sub(balanceAfter)).to.be.eq(20127520582274537n);
    })

    it("It should take the right amout from the conract",async() => {
        const balanceBefore = await ethers.provider.getBalance(contract.address);
        await contract.connect(accounts[0]).depositFunds({value: ethers.utils.parseEther("0.1")});
        await contract.connect(accounts[0]).withdrawfunds();
        const balanceAfter = await ethers.provider.getBalance(contract.address);
        expect(balanceAfter.sub(balanceBefore)).to.be.eq(ethers.utils.parseEther("0.02"));
    })
    it("It should not penalize for a withdraw after 24h", async () => {
        const balanceBefore = await ethers.provider.getBalance(accounts[0].address);
        await contract.connect(accounts[0]).depositFunds({ value: ethers.utils.parseEther("0.1") });
 
        await ethers.provider.send("evm_increaseTime", [86400]);
        await ethers.provider.send("evm_mine");

        await contract.connect(accounts[0]).withdrawfunds();
        const balanceAfter = await ethers.provider.getBalance(accounts[0].address);
        const priceOfGas = 116419661160704n
        expect(balanceBefore.sub(priceOfGas)).to.be.eq(balanceAfter);
    });

})