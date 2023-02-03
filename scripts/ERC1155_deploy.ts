import {run, ethers, upgrades} from 'hardhat';
import "@nomiclabs/hardhat-ethers";

const snooze = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
 
	await run("compile");

	const accounts = await ethers.getSigners();

  console.log("Accounts:", accounts.map((a: { address: any; }) => a.address));

	const MetaQuantumERC1155 = await ethers.getContractFactory("MetaQuantumERC1155");  
	const metaQuantumERC1155 = await upgrades.deployProxy(MetaQuantumERC1155,{initializer: false,unsafeAllowCustomTypes:true});
	await metaQuantumERC1155.deployed();
  
  await snooze(35000);
	// verify the Address
	console.log("MetaQuantum NFT ERC1155 deployed proxy address:", metaQuantumERC1155.address);
	//initialize
  const tx2 = await metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://gateway.pinata.cloud/ipfs/?/{id}.json", "https://gateway.pinata.cloud/ipfs/QmTfE2qX3Bje2n2dRmuqi6x3tK4CFnQiHVDZmF4AfhNNLb/contract_metadata.json", accounts[0].address,accounts[0].address,1000000,10000);
  await tx2.wait();

  await snooze(35000);

  console.log("MetaQuantum NFT ERC1155 initialized");

  //  const ids = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  //  const amounts = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  //  const tx3 = await metaQuantumERC1155.bulkMint(accounts[0].address,"Quzmsdals42a",ids, amounts,'0x00',{
  //    gasLimit: 1000000,
  //  });
  
  //  await tx3.wait();
  //  console.log("Mint NFTs", tx3.hash);
  

  // Verify Process MetaQuantum NFT ERC1155 Implementation
  //await run("verify:verify", {
  //  address: metaQuantumERC1155.address,
  //    constructorArguments: [    
  //    ],
  //  contract: "contracts/MetaQuantumERC1155.sol:MetaQuantumERC1155",
  //});


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
