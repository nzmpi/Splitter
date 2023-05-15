const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        SplitterX: {
          address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "FeeTooHigh",
              type: "error",
            },
            {
              inputs: [],
              name: "InvalidInput",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwner",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "NotSentTo",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "oldFee",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "newFee",
                  type: "uint16",
                },
              ],
              name: "FeeChangedEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "oldOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferredEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address[]",
                  name: "to",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              name: "SplitEthEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address[]",
                  name: "to",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
              ],
              name: "SplitTokenEvent",
              type: "event",
            },
            {
              inputs: [],
              name: "fee",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_newFee",
                  type: "uint16",
                },
              ],
              name: "setFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "_receivers",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "_amounts",
                  type: "uint256[]",
                },
              ],
              name: "splitEth",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
                {
                  internalType: "address[]",
                  name: "_receivers",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "_amounts",
                  type: "uint256[]",
                },
              ],
              name: "splitToken",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawEth",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
              ],
              name: "withdrawTokens",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  11155111: [
    {
      name: "sepolia",
      chainId: "11155111",
      contracts: {
        SplitterX: {
          address: "0x3F07E723Cc4CCD8F6B5D7fB84893E2d20F52DB7C",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "FeeTooHigh",
              type: "error",
            },
            {
              inputs: [],
              name: "InvalidInput",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwner",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "NotSentTo",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "oldFee",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "newFee",
                  type: "uint16",
                },
              ],
              name: "FeeChangedEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "oldOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferredEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address[]",
                  name: "to",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              name: "SplitEthEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address[]",
                  name: "to",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
              ],
              name: "SplitTokenEvent",
              type: "event",
            },
            {
              inputs: [],
              name: "fee",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_newFee",
                  type: "uint16",
                },
              ],
              name: "setFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "_receivers",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "_amounts",
                  type: "uint256[]",
                },
              ],
              name: "splitEth",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
                {
                  internalType: "address[]",
                  name: "_receivers",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "_amounts",
                  type: "uint256[]",
                },
              ],
              name: "splitToken",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawEth",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
              ],
              name: "withdrawTokens",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
