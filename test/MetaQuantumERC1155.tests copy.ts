import { ethers, upgrades } from "hardhat";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

chai.use(solidity);
const snooze = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
const { formatBytes32String } = require('ethers').utils;

// an async function.
describe("MetaQuantum ERC1155, NFT Token contract", async () => {

  let accounts: SignerWithAddress[];
  const BaseURL = 'https://ribdvbmipikj.usemoralis.com/'
  
  beforeEach(async () => {
    accounts = await ethers.getSigners();
  });

  describe("Basic value of the MetaQuantum NFT ERC1155", async () => {
   
    it("Should be the Deployer of the owner", async () => {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155");  
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();


        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);

        const Owner = await metaQuantumERC1155.owner();
        expect(accounts[1].address).to.equal(Owner);
    });

    it("Should assign the total supply of tokens to the owner", async () => {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155");
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false});
        await metaQuantumERC1155.deployed();

        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);

        const name = (await metaQuantumERC1155.name()).toString();
        expect(name).to.equal("MetaQuantumERC1155");
    });

    it("Should assign the symbol of the token to the owner", async () => {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155");
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();

        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);

        const symbol = (await metaQuantumERC1155.symbol()).toString();
        expect(symbol).to.equal("MQNFT");
    });

    it("Should be the CONTRACT URI, assign in the deployment", async () => {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155");
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();

        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);

        const uri = (await metaQuantumERC1155.contractURI()).toString();
        expect(uri).to.equal("https://ribdvbmipikj.usemoralis.com/collection.json");
    });

    it("Should be the MINTER_ROLE, assign how constant in the Smart Contract", async () => {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155");
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();

        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);

        const minter = (await metaQuantumERC1155.MINTER_ROLE()).toString();
        expect(minter).to.equal('0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6');
    });

    it("Should be Accounts[0], assign the MINTER_ROLE", async () => {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155");
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();

        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);

        const minter = (await metaQuantumERC1155.MINTER_ROLE()).toString();
        expect(await metaQuantumERC1155.hasRole(minter, accounts[1].address)).to.equal(true);
    });

    it("Should be Mint with another account after to assign the MINTER_ROLE", async () => {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155");
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();

        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);

        const minter = (await metaQuantumERC1155.MINTER_ROLE()).toString();
        expect(await metaQuantumERC1155.hasRole(minter, accounts[1].address)).to.equal(true);
        await metaQuantumERC1155.grantRole(minter, accounts[0].address);
        expect(await metaQuantumERC1155.hasRole(minter, accounts[0].address)).to.equal(true);
        await metaQuantumERC1155.revokeRole(minter, accounts[0].address);
        expect(await metaQuantumERC1155.hasRole(minter, accounts[0].address)).to.equal(false);
    });

    it("Should be transfer the ownership, to another accounts", async () => {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();

        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);
        const tx = await metaQuantumERC1155.transferOwnership(accounts[0].address);
        await tx.wait();
        const Owner = await metaQuantumERC1155.owner();
        expect(accounts[0].address).to.equal(Owner);
        // Verify if can changes the Admin Role, and to assign the new owner of the smart contract
        const minter = (await metaQuantumERC1155.MINTER_ROLE()).toString();
        const owner = (await metaQuantumERC1155.DEFAULT_ADMIN_ROLE()).toString();
        // transfer the ownership to the new admin role
        await metaQuantumERC1155.grantRole(owner, accounts[0].address);
        // old admin role renounce the ownership
        await metaQuantumERC1155.renounceRole(owner, accounts[1].address);
        // verify if the old admin role is not the admin role of the smart contract
        expect(await metaQuantumERC1155.hasRole(owner, accounts[1].address)).to.equal(false);
        // revert if the old admin role, try to grant minter role to another account
        await expect (metaQuantumERC1155.grantRole(minter, accounts[5].address)).to.be.reverted;
        // verify the new admin role, can grant minter role to another account
        await metaQuantumERC1155.connect(accounts[0]).grantRole(minter, accounts[5].address);
        expect(await metaQuantumERC1155.hasRole(owner, accounts[0].address)).to.equal(true);
        expect(await metaQuantumERC1155.hasRole(minter, accounts[5].address)).to.equal(true);

    });

    it("Should be renounce the ownership", async () => {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();

        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);
        const tx = await metaQuantumERC1155.renounceOwnership();
        await tx.wait();
        const Owner = await metaQuantumERC1155.owner();
        expect('0x0000000000000000000000000000000000000000').to.equal(Owner);
    });

    it("Should be create an unique ID", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();  
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);

        const tx = await metaQuantumERC1155.createUniqueID(3);
        let receipt = await tx.wait();

        receipt = receipt.events?.filter((x: any) => {
            return x.event == 'CreateID';
        });
  
       await expect(receipt[0].data).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000001');
       await expect(receipt[1].data).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000002');
       await expect(receipt[2].data).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000003');
       
    })
  });

  // Verify all process and limit the number of tokens that can be minted 15 ids and quantity.
  describe("Minting and verifying the MetaQuantum NFT ERC1155 ", async function () {


    // it("Should be Fail, Minting with 0 amount value", async function () {
    //     const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
    //     const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
    //     await metaQuantumERC1155.deployed();
    //     metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
    //     await snooze(5000);

    //     await expect(metaQuantumERC1155.mint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", 0, '0x00')).to.be.revertedWith("INVALID_TOKEN_AMOUNT")
    // });

    // it("Should be Fail, account doesn't have MINTER_ROLE ", async function () {
    //     const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[2]);
    //     const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
    //     await metaQuantumERC1155.deployed();
    //     metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
    //     await snooze(5000);

    //     await expect(metaQuantumERC1155.mint(accounts[3].address, "QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", 0, '0x00')).to.be.revertedWith("INSUFFICIENT_PERMISSIONS")
    // });

    // it("Should be Fail, Minting with excedd max supply amount value", async function () {
    //     const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
    //     const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
    //     await metaQuantumERC1155.deployed();
    //     metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
    //     await snooze(5000);
      
    //     await expect(metaQuantumERC1155.mint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", 1000001, '0x00')).to.be.revertedWith("EXCEED MAX_AMOUNT")
    // });

    //  it("Should be Mint, one token id and amount", async function () {
    //      const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
    //      const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
    //      await metaQuantumERC1155.deployed();
    //      metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
    //      await snooze(5000);
      
    //      const tx = await metaQuantumERC1155.mint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", 1000, '0x00');
    //      await tx.wait();

    //      expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 1)).to.be.equal(1000);
    //  });

    it("Should be Fail, if Mint Batch with at least one amount equal 0", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);
        
        const ids=[1,2,3,4,5];
        const amounts = [500, 749, 1500, 0, 280];
        const data = '0x00';
        await expect(metaQuantumERC1155.bulkMint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", ids, amounts, data)).to.be.revertedWith("INVALID_TOKEN_AMOUNT");
    })

    it("Should be Fail, if Mint Batch with at least one amount is wrong", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();  
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);
        const ids=[1,2,3,4,5];
        const amounts = [500, 749, 1000, 1000001, 280];
        const data = '0x00';
        await expect(metaQuantumERC1155.bulkMint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", ids, amounts, data)).to.be.revertedWith("EXCEED MAX_AMOUNT");
    })

    it("Should be Mint the Five Token Ids (Busts), based in the Table", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();  
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);

        const ids=[1,2,3,4,5];
        const amounts = [500, 749, 1000, 1500, 280];
        
        const data = '0x00';
        const tx = await metaQuantumERC1155.bulkMint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ",ids, amounts, data);
        await tx.wait();
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 1)).to.be.equal(500);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 2)).to.be.equal(749);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 3)).to.be.equal(1000);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 4)).to.be.equal(1500);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 5)).to.be.equal(280);
    })

    it("Should be Mint the 30 Token Ids (Busts), based in the Table", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();  
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);

        const ids=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
        const amounts = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
        
        const data = '0x00';
        const tx = await metaQuantumERC1155.bulkMint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ",ids, amounts, data);
        await tx.wait();
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 1)).to.be.equal(1);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 2)).to.be.equal(2);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 3)).to.be.equal(3);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 4)).to.be.equal(4);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 5)).to.be.equal(5);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 6)).to.be.equal(6);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 7)).to.be.equal(7);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 8)).to.be.equal(8);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 9)).to.be.equal(9);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 10)).to.be.equal(10);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 11)).to.be.equal(11);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 12)).to.be.equal(12);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 13)).to.be.equal(13);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 14)).to.be.equal(14);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 15)).to.be.equal(15);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 16)).to.be.equal(16);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 17)).to.be.equal(17);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 18)).to.be.equal(18);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 19)).to.be.equal(19);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 20)).to.be.equal(20);
    })

    it("Should be Mint the One Token Ids (Busts), and Transfer to another address ", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();  
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);
        
        const ids=[2];
        const amounts = [500];
        const data = '0x00';
        const tx = await metaQuantumERC1155.bulkMint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", ids, amounts, data);
        await tx.wait();
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 2)).to.be.equal(500);
        
        //new msg.sender connect in contract
        //const metaQuantumERC1155NewTx = new ethers.Contract(metaQuantumERC1155.address,abi,accounts[2]);
        //const tx3 = await metaQuantumERC1155NewTx.safeTransferFrom(accounts[2].address, accounts[3].address, 1, amounts[0], data);
        //expect(await metaQuantumERC1155NewTx.balanceOf(accounts[2].address, 1)).to.be.equal('0');
        //expect(await metaQuantumERC1155NewTx.balanceOf(accounts[3].address, 1)).to.be.equal('500');

        const tx3 = await metaQuantumERC1155.safeTransferFrom(accounts[2].address, accounts[3].address, 2, amounts[0], data);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 2)).to.be.equal(0);
        expect(await metaQuantumERC1155.balanceOf(accounts[3].address, 2)).to.be.equal(500);
    });

    it("Should be Mint Again, if Burn first the Five Token Ids (Busts), based in the Table", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();  
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);

        const ids=[1,2,3,4,5];
        const amounts = [500, 749, 1000, 1500, 280];
        const data = '0x00';
        await metaQuantumERC1155.bulkMint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ",ids, amounts, data);
        await metaQuantumERC1155.connect(accounts[2]).burnBatch(accounts[2].address, ids, amounts);
        await metaQuantumERC1155.bulkMint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ",ids, amounts, data);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 1)).to.be.equal(500);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 2)).to.be.equal(749);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 3)).to.be.equal(1000);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 4)).to.be.equal(1500);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 5)).to.be.equal(280);
    });

    it("Should be Fail, if Mint all Five Token Ids (Busts), based in the Table again", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();  
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);
      
        const ids=[2,4,6,8,10];
        const amounts = [500, 749, 1000001, 1500, 280];
        const data = '0x00';
        await expect(metaQuantumERC1155.bulkMint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", ids, amounts, data)).to.be.revertedWith("EXCEED MAX_AMOUNT");
    })

    it("Should be Mint and After call Burn method to check amounts balance ", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();  
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);
      
        const ids = [1, 2, 3, 4, 5];
        const amounts = [1000000, 1000000, 1000000, 1000000, 1000000];
        const amountsBurn = [100, 150, 90, 75, 80];
        const data = '0x00';
        await metaQuantumERC1155.bulkMint(accounts[2].address,"QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", ids, amounts, data);
        // Validate Balance of for each token before Burn
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 1)).to.be.equal(1000000);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 2)).to.be.equal(1000000);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 3)).to.be.equal(1000000);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 4)).to.be.equal(1000000);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 5)).to.be.equal(1000000);
        await metaQuantumERC1155.connect(accounts[2]).burnBatch(accounts[2].address, ids, amountsBurn);
        // Validate Balance of for each token After Burn
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 1)).to.be.equal(999900);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 2)).to.be.equal(999850);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 3)).to.be.equal(999910);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 4)).to.be.equal(999925);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 5)).to.be.equal(999920);
    })

    it("Should be Mint the Five Custom Token Ids (via parameter), based in the Table", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();  
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);

        const ids=[2,4,6,8,10];
        const amounts = [500, 749, 1000, 1500, 280];
        const data = '0x00';
        const tx = await metaQuantumERC1155.bulkMint(accounts[2].address, "QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", ids, amounts, data);
        await tx.wait();
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 2)).to.be.equal(500);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 4)).to.be.equal(749);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 6)).to.be.equal(1000);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 8)).to.be.equal(1500);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 10)).to.be.equal(280);
    })

    it("Should be Set metadata URL with IpfsHash (via parameter)", async function () {
        const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155",accounts[1]);
        const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155, {initializer: false, unsafeAllowCustomTypes:true, unsafeAllow: ['delegatecall']});
        await metaQuantumERC1155.deployed();  
        metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/?/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,1000000,10000);
        await snooze(5000);

        const ids=[2,4,6,8,10];
        const amounts = [500, 749, 1000, 1500, 280];
        const data = '0x00';
        const tx = await metaQuantumERC1155.bulkMint(accounts[2].address, "QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ", ids, amounts, data);
        await tx.wait();
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 2)).to.be.equal(500);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 4)).to.be.equal(749);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 6)).to.be.equal(1000);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 8)).to.be.equal(1500);
        expect(await metaQuantumERC1155.balanceOf(accounts[2].address, 10)).to.be.equal(280);
        expect(await metaQuantumERC1155.uri(2)).to.be.equal("https://ribdvbmipikj.usemoralis.com/QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ/{id}.json");
        expect(await metaQuantumERC1155.uri(4)).to.be.equal("https://ribdvbmipikj.usemoralis.com/QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ/{id}.json");
        expect(await metaQuantumERC1155.uri(6)).to.be.equal("https://ribdvbmipikj.usemoralis.com/QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ/{id}.json");
        expect(await metaQuantumERC1155.uri(8)).to.be.equal("https://ribdvbmipikj.usemoralis.com/QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ/{id}.json");
        expect(await metaQuantumERC1155.uri(10)).to.be.equal("https://ribdvbmipikj.usemoralis.com/QmaxtqMM8yNfdHVgi1urYndxebUJZDBgEQ5RyaSCHxoYkQ/{id}.json");
    })

  });
});