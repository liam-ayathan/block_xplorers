export const chainIdList = {
    1: "Ethereum Mainnet",
    43114: "Avalanche C-Chain",
    137: "Polygon Mainnet",
    56: "Binance Smart Chain Mainnet",
}

// https://chainid.network/chains.json
export const metamaskChainList = {   
    // ethereum: {
    //     chainId: `0x${Number(1).toString(16)}`,
    //     chainName: "Ethereum Mainnet",
    //     nativeCurrency: {
    //       name: "Ether",
    //       symbol: "ETH",
    //       decimals: 18
    //     },
    //     rpcUrls: [
    //         "https://mainnet.infura.io/v3/${INFURA_API_KEY}",
    //         "wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}",
    //         "https://api.mycryptoapi.com/eth",
    //         "https://cloudflare-eth.com"
    //     ],
    //     blockExplorerUrls: ["https://etherscan.io"]
    // },

    polygon: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18
        },
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls: ["https://etherscan.io"]
    },

    avax: {
      // https://docs.avax.network/build/tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask/
      // 43114 --> mainnet for avax:
      // 43113 --> Avalanche FUJI C-Chain

        // chainId: `0x${Number(43114).toString(16)}`,
        // chainName: "Avalanche C-Chain",
        // nativeCurrency: {
        //   name: "AVAX",
        //   symbol: "AVAX",
        //   decimals: 18
        // },
        // rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        // blockExplorerUrls: ["https://snowtrace.io"]

        chainId: `0x${Number(43113).toString(16)}`,
        chainName: "Avalanche FUJI C-Chain",
        nativeCurrency: {
          name: "AVAX",
          symbol: "AVAX",
          decimals: 18
        },
        rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://testnet.snowtrace.io/"],
        // deployedAddress: "0xFa0F7aF4227664e2585Ea097e08E87D1Fe99CdC3"
    },

    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
          name: "Binance Chain Native Token",
          symbol: "BNB",
          decimals: 18
        },
        rpcUrls: [
          "https://bsc-dataseed1.binance.org",
          "https://bsc-dataseed2.binance.org",
          "https://bsc-dataseed3.binance.org",
          "https://bsc-dataseed4.binance.org",
          "https://bsc-dataseed1.defibit.io",
          "https://bsc-dataseed2.defibit.io",
          "https://bsc-dataseed3.defibit.io",
          "https://bsc-dataseed4.defibit.io",
          "https://bsc-dataseed1.ninicoin.io",
          "https://bsc-dataseed2.ninicoin.io",
          "https://bsc-dataseed3.ninicoin.io",
          "https://bsc-dataseed4.ninicoin.io",
          "wss://bsc-ws-node.nariox.org"
        ],
        blockExplorerUrls: ["https://bscscan.com"]
    }
}



export const avaxDocumentAddress = "0x5e17b14ADd6c386305A32928F985b29bbA34Eff5"
// export const avaxDocumentAddress  = "0x64edb395c13D3804498082528b44fc5137A20036"
export const avaxDocumentAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "document",
				"type": "bytes32"
			}
		],
		"name": "DocumentIssued",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "document",
				"type": "bytes32"
			}
		],
		"name": "DocumentRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "documents",
				"type": "bytes32[]"
			}
		],
		"name": "bulkIssue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "documents",
				"type": "bytes32[]"
			}
		],
		"name": "bulkRevoke",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "documentIssued",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "documentRevoked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "document",
				"type": "bytes32"
			}
		],
		"name": "getIssuedBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "document",
				"type": "bytes32"
			}
		],
		"name": "isIssued",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "document",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "blockNumber",
				"type": "uint256"
			}
		],
		"name": "isIssuedBefore",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "document",
				"type": "bytes32"
			}
		],
		"name": "isRevoked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "document",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "blockNumber",
				"type": "uint256"
			}
		],
		"name": "isRevokedBefore",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "document",
				"type": "bytes32"
			}
		],
		"name": "issue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "document",
				"type": "bytes32"
			}
		],
		"name": "revoke",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "version",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]





// avaxDocumentStoreCreatorAddress, avaxDocumentStoreCreatorAbi
export const avaxDocumentStoreCreatorAddress = "0x9d83e140330758a8fFD07F8Bd73e86ebcA8a5692"
export const avaxDocumentStoreCreatorAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createDocumentStore",
		"outputs": [
			{
				"internalType": "address",
				"name": "newDocumentStore",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "DocumentStoreMultiple",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]