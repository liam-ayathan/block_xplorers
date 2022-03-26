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
        chainId: `0x${Number(43114).toString(16)}`,
        chainName: "Avalanche C-Chain",
        nativeCurrency: {
          name: "AVAX",
          symbol: "AVAX",
          decimals: 18
        },
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://snowtrace.io"]
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