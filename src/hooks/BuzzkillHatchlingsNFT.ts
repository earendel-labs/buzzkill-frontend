import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BuzzkillHatchlingsNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const buzzkillHatchlingsNftAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
      { name: '_maxSupply', internalType: 'uint256', type: 'uint256' },
      { name: '_initialBatchSize', internalType: 'uint256', type: 'uint256' },
      {
        name: '_initialCurrentMaxSupply',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_maxMintPerAddr', internalType: 'uint256', type: 'uint256' },
      { name: '_cooldown', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newMaxSupply',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchReleased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newMaxMintPerAddress',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newCooldownTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newBatchSize',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MintingParametersUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newCommonURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'newRareURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'newUltraRareURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'RarityURIsUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'quantity',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenIds',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'tokenURIs',
        internalType: 'string[]',
        type: 'string[]',
        indexed: false,
      },
    ],
    name: 'TokensMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'addressMintedCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'adminMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cooldownTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentBatchSize',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentMaxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'lastMintedTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxMintPerAddress',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'quantity', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'releaseNextBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newBatchSize', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setBatchSize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newCooldownTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setCooldownTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newMaxMintPerAddress',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setMaxMintPerAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'setMaxSupply',
    outputs: [],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenRarity',
    outputs: [
      {
        name: '',
        internalType: 'enum BuzzkillHatchlings.Rarity',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const buzzkillHatchlingsNftAddress = {
  88: '0x425A8e5965bb30091BdEFfa482fC1A348042Be34',
} as const

/**
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const buzzkillHatchlingsNftConfig = {
  address: buzzkillHatchlingsNftAddress,
  abi: buzzkillHatchlingsNftAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNft = /*#__PURE__*/ createUseReadContract(
  { abi: buzzkillHatchlingsNftAbi, address: buzzkillHatchlingsNftAddress },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"addressMintedCount"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftAddressMintedCount =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'addressMintedCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"cooldownTime"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftCooldownTime =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'cooldownTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"currentBatchSize"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftCurrentBatchSize =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'currentBatchSize',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"currentMaxSupply"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftCurrentMaxSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'currentMaxSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"getApproved"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"lastMintedTime"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftLastMintedTime =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'lastMintedTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"maxMintPerAddress"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftMaxMintPerAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'maxMintPerAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"maxSupply"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftMaxSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'maxSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftName =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'name',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftPaused =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'paused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setMaxSupply"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftSetMaxSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setMaxSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'symbol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftTokenByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'tokenByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"tokenRarity"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftTokenRarity =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'tokenRarity',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useReadBuzzkillHatchlingsNftTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNft =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"adminMint"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftAdminMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'adminMint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftPause =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"releaseNextBatch"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftReleaseNextBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'releaseNextBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setBatchSize"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftSetBatchSize =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setBatchSize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setCooldownTime"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftSetCooldownTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setCooldownTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setMaxMintPerAddress"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftSetMaxMintPerAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setMaxMintPerAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWriteBuzzkillHatchlingsNftUnpause =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"adminMint"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftAdminMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'adminMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"releaseNextBatch"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftReleaseNextBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'releaseNextBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setBatchSize"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftSetBatchSize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setBatchSize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setCooldownTime"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftSetCooldownTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setCooldownTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setMaxMintPerAddress"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftSetMaxMintPerAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setMaxMintPerAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useSimulateBuzzkillHatchlingsNftUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"BatchReleased"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftBatchReleasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'BatchReleased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"MintingParametersUpdated"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftMintingParametersUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'MintingParametersUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"Paused"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"RarityURIsUpdated"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftRarityUrIsUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'RarityURIsUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"TokensMinted"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftTokensMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'TokensMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"Unpaused"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x425A8e5965bb30091BdEFfa482fC1A348042Be34)
 */
export const useWatchBuzzkillHatchlingsNftUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'Unpaused',
  })
