/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IMyERC721,
  IMyERC721Interface,
} from "../../../contracts/TokenSale.sol/IMyERC721";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IMyERC721__factory {
  static readonly abi = _abi;
  static createInterface(): IMyERC721Interface {
    return new utils.Interface(_abi) as IMyERC721Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMyERC721 {
    return new Contract(address, _abi, signerOrProvider) as IMyERC721;
  }
}
