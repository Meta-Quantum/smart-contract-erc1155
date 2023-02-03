import {run, ethers, upgrades} from 'hardhat';
import "@nomiclabs/hardhat-ethers";

const main = async () => {

	await run("compile");

	const accounts = await ethers.getSigners();
	//Set contract Proxy Contract Address 
	const proxyContracAddress = '0xdaD50113B27551fbfCa918b67cdBDD164DaEcfFG'
	//Set smart contract name
	const MetaQuatumERC1155V2 = await ethers.getContractFactory("MetaQuatumERC1155V2");
    //put in first parameter the contract address from Proxy deployed
	const metaQuantumERC1155 = await upgrades.upgradeProxy(proxyContracAddress, MetaQuatumERC1155V2);
	console.log("Confirm Address: ", metaQuantumERC1155.address);
}


main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});

