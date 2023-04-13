import { task } from "hardhat/config";
import "hardhat-gas-reporter";
import 'hardhat-contract-sizer';
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import '@typechain/hardhat';
import "@typechain/ethers-v5";
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-spdx-license-identifier';
import '@nomiclabs/hardhat-etherscan';
import 'dotenv/config';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 export default  {
	networks: {
		mainnet: {
			chainId: 1,
			url: process.env.PROVIDER_URL,
			gasPrice: 65000000000,
			accounts: {
				mnemonic:process.env.MNEMONIC
			}
		},
		polygon: {
			chainId: 137,
			url:process.env.PROVIDER_URL,
			gasPrice: 65000000000,
			accounts: {
				mnemonic:process.env.MNEMONIC,
				count:parseInt(`${process.env.ACCOUNTS}`)
			}
		},
		mumbai: {
			chainId: 80001,
			url: process.env.PROVIDER_URL,
			gasPrice: 65000000000,
			accounts: {
				mnemonic:process.env.MNEMONIC,
				count:parseInt(`${process.env.ACCOUNTS}`)
			}
		},
		localhost: {
			url: "http://127.0.0.1:8545",
			gasPrice: 35000000000,
			blockGasLimit: 149000000
		},
		hardhat: {
			gasPrice: 35000000000,
			blockGasLimit: 149000000,
			chainId: 31337,
			accounts: {
				mnemonic:process.env.MNEMONIC,
				count:parseInt(`${process.env.ACCOUNTS}`)
			}
		}
	},
	solidity: {
		version: "0.8.4",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	},
	paths: {
		sources: "./contracts",
		tests: "./test",
		cache: "./cache",
		artifacts: "./artifacts"
	},
	mocha: {
		timeout: 500000
	},
	gasReporter: {
		currency: 'USD',
		token: 'MATIC',
		gasPriceApi: 'https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice',
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
		maxMethodDiff: 10
	},
	contractSizer: {
		alphaSort: true,
		runOnCompile: true,
		disambiguatePaths: false,
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		//apiKey: process.env.ETHERSCAN_API_KEY
		apiKey: process.env.POLYGON_API_KEY
	},
	spdxLicenseIdentifier: {
		overwrite: true,
		runOnCompile: true,
	},
	abiExporter: {
		path: './abi',
		runOnCompile: true,
		clear: true,
		flat: true,
		only: [],
		spacing: 2,
		pretty: true,
	},
	typechain: {
		outDir: './type',
		target: 'ethers-v5'
	  },
};
