import type { Address } from "viem";
import { arbitrum, zksync } from "viem/chains";

import type { ChainId } from "@/types";

type LessonDictionary = Record<ChainId, Record<Address, string>>;

export const FOUNDRY_COURSE_CONFIG = {
  address: {
    [arbitrum.id]: "0x39338138414Df90EC67dC2EE046ab78BcD4F56D9" as Address,
    [zksync.id]: "0xBbA202c6DA89646F13C11a63C4aF182E4fFd4c2e" as Address,
  },
  lessonDictionary: {
    [arbitrum.id]: {
      "0x2e99A4CA9c85383ccB54769adB3837437e296479": "1",
      "0x76D2403b80591d5F6AF2b468BC14205fa5452AC0": "2",
      "0x34d130B174F4a30A846FED7C02FCF53A19a4c2B6": "3",
      "0xf988Ebf9D801F4D3595592490D7fF029E438deCa": "5",
      "0xA2626bE06C11211A44fb6cA324A67EBDBCd30B70": "4",
      "0xdeB8d8eFeF7049E280Af1d5FE3a380F3BE93B648": "6",
      "0xcf4fbA490197452Bd414E16D563623253eFb57D3": "7",
      "0x33ee14Fb8816c92fe401165330bbE29706942183": "8",
      "0xdF7cdFF0c5e85c974D6377244D9A0CEffA2b7A86": "9",
      "0xaB67557218F60C06acA750B9F8A20018e5604ebf": "10",
      "0x444aE92325dCE5D14d40c30d2657547513674dD6": "11",
      "0x3DbBF2F9AcFB9Aac8E0b31563dd75a2D69148D64": "12",
      "0x3aD9F29AB266E4828450B33df7a9B9D7355Cd821": "13",
      "0xc584bD01fD60F671409661a6802170BbEFba5c47": "14",
      "0xa0c7ADA2c7c29729d12e2649BC6a0a293Ac46725": "15",
    },
    [zksync.id]: {
      "0xfa257F68Ca436F6e00299917837D7712Fa5bdf75": "FS1",
      "0x5f9f9f46ECb48D625e320888922Bf86555608E9C": "FS2",
      "0x1D5c2Eb5F17Fa0BA4E3DfDDBF59DC0e6316219Ff": "FS3",
      "0x598c64586d890222c085eCb3a01Db36237D6ccE4": "FS4",
      "0x687C1d191ccD64777dF009942A148fBF7F52F006": "FS5",
      "0xbe19357f00B8A80154bB927a95d82888Ee70F6F8": "FS6",
      "0xDBb7cFfb41261D9a445b09E7c5dF28De18254D5B": "FS7",
      "0x1caB99eE7dB4d76B7ec069c0add758A7497dbE5a": "FS8",
      "0xEFA0f9Ca73f5C2f4b735eEDf63d49B1680054158": "FS9",
      "0x475d9da05E73e283EB5B490c89cfDf36B0Bca5fc": "FS10",
      "0x9085b18f712A7F26DC2f4C2F485ffCd1D0a10433": "FS11",
      "0xC4C177DEa09d046D68b0Ad2E0d8003090f0FD832": "FS12",
      "0xaf3697C1B7e686a7f83dcbb753AcbBA4c2A940aB": "FS13",
      "0xC63704f836505F6967d8e6Ee8A1678B57f7b5Ec9": "FS14",
      "0xb54B64B3BB587b39F189797c68A6bd183fFB4379": "FS15",
    },
  } as LessonDictionary,

  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "FoundryCourseNft__NFTNotMinted",
      type: "error",
    },
    {
      inputs: [],
      name: "FoundryCourseNft__NotChallengeContract",
      type: "error",
    },
    {
      inputs: [],
      name: "FoundryCourseNft__YouAlreadySolvedThis",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "newUri",
          type: "string",
        },
      ],
      name: "BaseTokenImageUriChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "challengeContract",
          type: "address",
        },
      ],
      name: "ChallengeAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "oldChallenge",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newChallenge",
          type: "address",
        },
      ],
      name: "ChallengeReplaced",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "solver",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "challenge",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "twitterHandle",
          type: "string",
        },
      ],
      name: "ChallengeSolved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
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
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "challengeContract",
          type: "address",
        },
      ],
      name: "addChallenge",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
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
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
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
      inputs: [
        {
          internalType: "string",
          name: "newUri",
          type: "string",
        },
      ],
      name: "changeBaseUri",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
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
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "getChallengeContract",
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
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getChallengeContractFromTokenId",
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
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getChallengeContractFullDescription",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTokenCounter",
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
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "contractAddress",
          type: "address",
        },
      ],
      name: "isChallengeContract",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          internalType: "string",
          name: "twitterHandle",
          type: "string",
        },
      ],
      name: "mintNft",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
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
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
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
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "challengeIndex",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "newChallenge",
          type: "address",
        },
      ],
      name: "replaceChallenge",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
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
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
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
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
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
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const,
};

export const SECURITY_COURSE_CONFIG = {
  address: {
    [arbitrum.id]: "0xDe0e797bfAd78F0615d75430C53F8fe3C9e49883" as Address,
    [zksync.id]: "0x176bB45B13AA90D2CD313d526F14a2F4C6583495" as Address,
  },
  lessonDictionary: {
    [arbitrum.id]: {
      "0xf923431dA74Ecc873C4D641FBDfa2564bAAfCA9F": "S0",
      "0x7a0f40757f6ba868b44ce959a1D4B8bc22C21d59": "S1",
      "0xeAb9C7AC697408fD1581494577C7c0716C3B75E6": "S2",
      "0x89edc4c74810bedbd53d7dA677eB420DC0154B0b": "S3",
      "0xeF72bA6575b86BeaA9B9e4A78BCa4A58F3cCE276": "S4",
      "0xBdaAb68a462db80fB0052947bDADba7A87fcD0fb": "S5",
      "0x956c6B0894923ba448f8bC7bB9706A2B8F60277D": "S6",
      "0xB855afC44095225105329a7416D55d0A780fc39d": "S7",
      "0xC0B55591dE55258021985Aed8DD2af40fbD659C7": "S8",
    },
    [zksync.id]: {
      "0x792c3109086241130545cDa23d2E4244B64d8296": "SS0",
      "0x096f1835070EfCC3C53FFBA41C23cfD087e85b51": "SS1",
      "0xc8B948a7fF5FBfC4b7334fF7628973aefC469A9d": "SS2",
      "0xA248D0d263D47f988E7B09962058fDf1407c6F9e": "SS3",
      "0x9cB9C62f4d29C0300655e838831deaDeeb481Baf": "SS4",
      "0x21dDDcEF5E67EC2EdD9E95A868219C68196bcAD8": "SS5",
      "0x84c98b9A74707E116b35d0b3b0C851b96D62647c": "SS6",
      "0x31B827e55DBA91f39581647FA14AD7CC5fc9EDaB": "SS7",
      "0xC580F34dafb8Fd324Fa22C3aCABF8cb2090117e2": "SS8",
    },
  } as LessonDictionary,
  abi: [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    { inputs: [], name: "CTFRegistry__NFTNotMinted", type: "error" },
    { inputs: [], name: "CTFRegistry__NotChallengeContract", type: "error" },
    { inputs: [], name: "CTFRegistry__YouAlreadySolvedThis", type: "error" },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "address", name: "owner", type: "address" },
      ],
      name: "ERC721IncorrectOwner",
      type: "error",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "ERC721InsufficientApproval",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "approver", type: "address" }],
      name: "ERC721InvalidApprover",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "operator", type: "address" }],
      name: "ERC721InvalidOperator",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "ERC721InvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "receiver", type: "address" }],
      name: "ERC721InvalidReceiver",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "sender", type: "address" }],
      name: "ERC721InvalidSender",
      type: "error",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ERC721NonexistentToken",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "owner", type: "address" },
        { indexed: true, internalType: "address", name: "approved", type: "address" },
        { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "owner", type: "address" },
        { indexed: true, internalType: "address", name: "operator", type: "address" },
        { indexed: false, internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, internalType: "string", name: "newUri", type: "string" }],
      name: "BaseTokenImageUriChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, internalType: "address", name: "challengeContract", type: "address" }],
      name: "ChallengeAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "address", name: "oldChallenge", type: "address" },
        { indexed: false, internalType: "address", name: "newChallenge", type: "address" },
      ],
      name: "ChallengeReplaced",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "address", name: "solver", type: "address" },
        { indexed: false, internalType: "address", name: "challenge", type: "address" },
        { indexed: false, internalType: "string", name: "twitterHandle", type: "string" },
      ],
      name: "ChallengeSolved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
        { indexed: true, internalType: "address", name: "newOwner", type: "address" },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "from", type: "address" },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [{ internalType: "address", name: "challengeContract", type: "address" }],
      name: "addChallenge",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "newUri", type: "string" }],
      name: "changeBaseUri",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
      name: "getChallengeContract",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getChallengeContractFromTokenId",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getChallengeContractFullDescription",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTokenCounter",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "contractAddress", type: "address" }],
      name: "isChallengeContract",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "receiver", type: "address" },
        { internalType: "string", name: "twitterHandle", type: "string" },
      ],
      name: "mintNft",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
    {
      inputs: [
        { internalType: "uint256", name: "challengeIndex", type: "uint256" },
        { internalType: "address", name: "newChallenge", type: "address" },
      ],
      name: "replaceChallenge",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const,
};

FOUNDRY_COURSE_CONFIG.address[arbitrum.id];
