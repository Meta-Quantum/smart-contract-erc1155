# meta-quantum-smartContracts

## Install MetaQuantum Smart Contract
These are the steps to deploy the Meta Quatum Smart Contract

### 1 - install dependencies

```bash
yarn
```

### 2 - compile

```bash
npx hardhat compile
```

### 3 - test
```
npx hardhat test .\test\<filename>.tests.ts
```

### 4 -  deploy MetaQuantumERC1155  in testnet | mainnet

```bash
npx hardhat run scripts/ERC1155_deploy.ts --network <NETWORK> (mumbai | polygon)

contractAddress: 0x893FF8cf442d528B0b813F41F84AaD7dBf1f6b
```

### 5 - verify MetaQuantumERC1155 contract address
```
npx hardhat verify --network mumbai 0x893FF8cf442d528B0b813F41F84AaD7dBf1f1a6b

Successfully submitted source code for contract
contracts/MetaQuantumERC1155.sol:MetaQuantumERC1155 at 0x893FF8cf442d528B0b813F41F84AaD7dBf1f1a6b
for verification on Etherscan. Waiting for verification result...

Successfully verified contract MetaQuantumERC1155 on Etherscan.
https://mumbai.polygonscan.com/address/0x893FF8cf442d528B0b813F41F84AaD7dBf1f1a6b#code
```
### 6 - verify proxy contract address

```
npx hardhat verify --network mumbai 0x893FF8cf442d528B0b813F41F84AaD7dBf1f1a6b

Successfully submitted source code for contract
contracts/MetaQuantumERC1155.sol:MetaQuantumERC1155 at 0x893FF8cf442d528B0b813F41F84AaD7dBf1f1a6b
for verification on Etherscan. Waiting for verification result...

Successfully verified contract MetaQuantumERC1155 on Etherscan.
https://mumbai.polygonscan.com/address/0x893FF8cf442d528B0b813F41F84AaD7dBf1f1a6b#code

```

## Update MetaQuantum ERC1155 Smart Contract
These are the steps to update the MetaQuantum Smart Contract.

### 1 - set proxy contract address and contract name into script\ERC1155_upgrade.ts script

```
const proxyContracAddress = '0xdaD50113B27551fbfCa918b67cdBDD164DaEcfFG'
const MetaQuantumERC1155V2 = await ethers.getContractFactory("MetaQuantumERC1155V2");
```
    
### 2 - run script\ERC1155_upgrade.ts script

```
npx hardhat run .\scripts\ERC1155_upgrade.ts --network mumbai

Confirm Address:  0xdaD50113B27551fbfCa918b67cdBDD164DaEcfDC
```



