import {run, ethers, upgrades} from 'hardhat';
import "@nomiclabs/hardhat-ethers";
import abi from "./../abi/MetaQuantumERC1155Abi.json";

const snooze = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
 
	await run("compile");

	const accounts = await ethers.getSigners();

  const metaQuantumERC1155 = new ethers.Contract("0xf7F9c471422bC5244428e5805F668BAbC94548eE",abi,accounts[1]);
	// verify the Address
	console.log("MetaQuantum NFT ERC1155 deployed to:", metaQuantumERC1155.address);
	//initialize
  await metaQuantumERC1155.initialize("MetaQuantumERC1155","MQNFT","https://ribdvbmipikj.usemoralis.com/{id}.json", "https://ribdvbmipikj.usemoralis.com/collection.json", accounts[1].address,accounts[1].address,0,0,{
    gasLimit: 1000000,
  },);
  await snooze(35000);
  // Verify Process MetaQuantum  ERC1155 Implementation
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
