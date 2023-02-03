import {run, ethers, upgrades} from 'hardhat';
import "@nomiclabs/hardhat-ethers";
import abi from "../abi/MetaQuantumERC1155Abi.json";
import dotenv from 'dotenv';
dotenv.config();

const snooze = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
 
	await run("compile");

	const accounts = await ethers.getSigners();
  const provider = ethers.provider;
  const networkName = `${process.env.NETWORK}`;
  const contractAddress = `${process.env.CONTRACT_ADDRESS}`;
  const accountOwner = `${process.env.ACCOUNT_OWNER}`;
  const tokenId = `${process.env.TOKEN_ID}`;
  const amount = `${process.env.AMOUNT}`;

  console.log(networkName);
  console.log(contractAddress);
  console.log(accountOwner);
  console.log(tokenId);
  console.log(amount);

  const metaQuantumERC1155 = new ethers.Contract(contractAddress,abi,accounts[0]);

	console.log("metaQuantum NFT ERC1155 contract address:", metaQuantumERC1155.address);
	//burn


  const estimateGasBurn: any = await metaQuantumERC1155.estimateGas.burn(accountOwner, tokenId, amount);
  console.log(estimateGasBurn);
  const newGasLimitBurn = Math.trunc(
     (15 / 100 + 1) * estimateGasBurn
  );

 const tx1 = await metaQuantumERC1155.burn(accountOwner, tokenId, amount,
     {
       gasPrice: (await provider.getFeeData()).gasPrice,
       gasLimit: newGasLimitBurn
     },
   );

   let receipt: any = await tx1.wait();


   console.log('Confirmation tx', receipt);
   console.log('Burned!');

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
