const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        Splitter: {
          address: "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
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
              inputs: [],
              name: "TaxTooHigh",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "oldOwner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: false,
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
                  indexed: false,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: false,
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
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "oldTax",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "newTax",
                  type: "uint16",
                },
              ],
              name: "TaxChanged",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_in",
                  type: "address",
                },
              ],
              name: "getBal",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
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
                  name: "_newTax",
                  type: "uint16",
                },
              ],
              name: "setTax",
              outputs: [],
              stateMutability: "nonpayable",
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
              inputs: [],
              name: "tax",
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
              inputs: [
                {
                  internalType: "address",
                  name: "_newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
