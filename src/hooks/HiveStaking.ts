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
 *
 */
export const buzzkillHatchlingsNftAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
      { name: 'initialCooldownTime', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_PER_TX',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_SUPPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'burnBatch',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'exists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mintBatch',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'publicMint',
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
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
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
      { name: 'newCooldownTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setCooldownTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'newURI', internalType: 'string', type: 'string' },
    ],
    name: 'setTokenURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newuri', internalType: 'string', type: 'string' }],
    name: 'setURI',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'totalMinted',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
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
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

/**
 *
 */
export const buzzkillHatchlingsNftAddress = {
  89: '0x603a23682ae999c5A33BaC9a15216521c9f32Cd8',
} as const

/**
 *
 */
export const buzzkillHatchlingsNftConfig = {
  address: buzzkillHatchlingsNftAddress,
  abi: buzzkillHatchlingsNftAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HiveStaking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const hiveStakingAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_buzzkillHatchlingsNFT',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'buzzkillHatchlingsNFT',
    outputs: [{ name: '', internalType: 'contract IERC1155', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimPoints',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllStakedNFTsForUser',
    outputs: [
      {
        name: '',
        internalType: 'struct HiveStaking.StakedNFT[]',
        type: 'tuple[]',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'stakedAt', internalType: 'uint256', type: 'uint256' },
          { name: 'environmentId', internalType: 'uint256', type: 'uint256' },
          { name: 'hiveId', internalType: 'uint256', type: 'uint256' },
          { name: 'lastClaimedAt', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'environmentId', internalType: 'uint256', type: 'uint256' },
      { name: 'hiveId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getStakedNFTsInHive',
    outputs: [
      {
        name: '',
        internalType: 'struct HiveStaking.StakedNFT[]',
        type: 'tuple[]',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'stakedAt', internalType: 'uint256', type: 'uint256' },
          { name: 'environmentId', internalType: 'uint256', type: 'uint256' },
          { name: 'hiveId', internalType: 'uint256', type: 'uint256' },
          { name: 'lastClaimedAt', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardRatePerDay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newEnvironments', internalType: 'uint256', type: 'uint256' },
      { name: 'newHives', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setEnvironmentsAndHives',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newRate', internalType: 'uint256', type: 'uint256' }],
    name: 'setRewardRate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'environmentId', internalType: 'uint256', type: 'uint256' },
      { name: 'hiveId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stakedNFTsByUser',
    outputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'stakedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'environmentId', internalType: 'uint256', type: 'uint256' },
      { name: 'hiveId', internalType: 'uint256', type: 'uint256' },
      { name: 'lastClaimedAt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stakedNFTsInHive',
    outputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'stakedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'environmentId', internalType: 'uint256', type: 'uint256' },
      { name: 'hiveId', internalType: 'uint256', type: 'uint256' },
      { name: 'lastClaimedAt', internalType: 'uint256', type: 'uint256' },
    ],
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
    name: 'totalBeesStaked',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalEnvironments',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalHivesPerEnvironment',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'environmentId', internalType: 'uint256', type: 'uint256' },
      { name: 'hiveId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userInfo',
    outputs: [
      { name: 'totalPoints', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'message',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'environmentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'hiveId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'userBalance',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DebugStake',
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
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'points',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PointsClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'environmentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'hiveId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Staked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'environmentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'hiveId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unstaked',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] as const

/**
 *
 */
export const hiveStakingAddress = {
  89: '0x67421A9c38eE3a9Ed5Eb665E2B9B0123fd749bB3',
} as const

/**
 *
 */
export const hiveStakingConfig = {
  address: hiveStakingAddress,
  abi: hiveStakingAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__
 *
 *
 */
export const useReadBuzzkillHatchlingsNft = /*#__PURE__*/ createUseReadContract(
  { abi: buzzkillHatchlingsNftAbi, address: buzzkillHatchlingsNftAddress },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"MAX_PER_TX"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftMaxPerTx =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'MAX_PER_TX',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"MAX_SUPPLY"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftMaxSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'MAX_SUPPLY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"balanceOf"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"balanceOfBatch"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftBalanceOfBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'balanceOfBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"cooldownTime"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftCooldownTime =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'cooldownTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"exists"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftExists =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'exists',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"supportsInterface"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"totalMinted"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftTotalMinted =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'totalMinted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"totalSupply"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"uri"`
 *
 *
 */
export const useReadBuzzkillHatchlingsNftUri =
  /*#__PURE__*/ createUseReadContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'uri',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__
 *
 *
 */
export const useWriteBuzzkillHatchlingsNft =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"burn"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftBurn =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"burnBatch"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftBurnBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'burnBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"mint"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"mintBatch"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftMintBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'mintBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"publicMint"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftPublicMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'publicMint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftSafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 *
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
 *
 */
export const useWriteBuzzkillHatchlingsNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setCooldownTime"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftSetCooldownTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setCooldownTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setTokenURI"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftSetTokenUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setTokenURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setURI"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftSetUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const useWriteBuzzkillHatchlingsNftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"burn"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"burnBatch"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftBurnBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'burnBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"mint"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"mintBatch"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftMintBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'mintBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"publicMint"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftPublicMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'publicMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftSafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 *
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
 *
 */
export const useSimulateBuzzkillHatchlingsNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setCooldownTime"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftSetCooldownTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setCooldownTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setTokenURI"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftSetTokenUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setTokenURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"setURI"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftSetUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'setURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const useSimulateBuzzkillHatchlingsNftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__
 *
 *
 */
export const useWatchBuzzkillHatchlingsNftEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 *
 */
export const useWatchBuzzkillHatchlingsNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 *
 */
export const useWatchBuzzkillHatchlingsNftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"TransferBatch"`
 *
 *
 */
export const useWatchBuzzkillHatchlingsNftTransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"TransferSingle"`
 *
 *
 */
export const useWatchBuzzkillHatchlingsNftTransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link buzzkillHatchlingsNftAbi}__ and `eventName` set to `"URI"`
 *
 *
 */
export const useWatchBuzzkillHatchlingsNftUriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: buzzkillHatchlingsNftAbi,
    address: buzzkillHatchlingsNftAddress,
    eventName: 'URI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__
 *
 *
 */
export const useReadHiveStaking = /*#__PURE__*/ createUseReadContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"buzzkillHatchlingsNFT"`
 *
 *
 */
export const useReadHiveStakingBuzzkillHatchlingsNft =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'buzzkillHatchlingsNFT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"getAllStakedNFTsForUser"`
 *
 *
 */
export const useReadHiveStakingGetAllStakedNfTsForUser =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'getAllStakedNFTsForUser',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"getStakedNFTsInHive"`
 *
 *
 */
export const useReadHiveStakingGetStakedNfTsInHive =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'getStakedNFTsInHive',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const useReadHiveStakingOwner = /*#__PURE__*/ createUseReadContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"rewardRatePerDay"`
 *
 *
 */
export const useReadHiveStakingRewardRatePerDay =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'rewardRatePerDay',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"stakedNFTsByUser"`
 *
 *
 */
export const useReadHiveStakingStakedNfTsByUser =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'stakedNFTsByUser',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"stakedNFTsInHive"`
 *
 *
 */
export const useReadHiveStakingStakedNfTsInHive =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'stakedNFTsInHive',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"supportsInterface"`
 *
 *
 */
export const useReadHiveStakingSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"totalBeesStaked"`
 *
 *
 */
export const useReadHiveStakingTotalBeesStaked =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'totalBeesStaked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"totalEnvironments"`
 *
 *
 */
export const useReadHiveStakingTotalEnvironments =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'totalEnvironments',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"totalHivesPerEnvironment"`
 *
 *
 */
export const useReadHiveStakingTotalHivesPerEnvironment =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'totalHivesPerEnvironment',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"userInfo"`
 *
 *
 */
export const useReadHiveStakingUserInfo = /*#__PURE__*/ createUseReadContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
  functionName: 'userInfo',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__
 *
 *
 */
export const useWriteHiveStaking = /*#__PURE__*/ createUseWriteContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"claimPoints"`
 *
 *
 */
export const useWriteHiveStakingClaimPoints =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'claimPoints',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 *
 *
 */
export const useWriteHiveStakingOnErc1155BatchReceived =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"onERC1155Received"`
 *
 *
 */
export const useWriteHiveStakingOnErc1155Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const useWriteHiveStakingRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setEnvironmentsAndHives"`
 *
 *
 */
export const useWriteHiveStakingSetEnvironmentsAndHives =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'setEnvironmentsAndHives',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setRewardRate"`
 *
 *
 */
export const useWriteHiveStakingSetRewardRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'setRewardRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"stake"`
 *
 *
 */
export const useWriteHiveStakingStake = /*#__PURE__*/ createUseWriteContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
  functionName: 'stake',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const useWriteHiveStakingTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"unstake"`
 *
 *
 */
export const useWriteHiveStakingUnstake = /*#__PURE__*/ createUseWriteContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
  functionName: 'unstake',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__
 *
 *
 */
export const useSimulateHiveStaking = /*#__PURE__*/ createUseSimulateContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"claimPoints"`
 *
 *
 */
export const useSimulateHiveStakingClaimPoints =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'claimPoints',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 *
 *
 */
export const useSimulateHiveStakingOnErc1155BatchReceived =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"onERC1155Received"`
 *
 *
 */
export const useSimulateHiveStakingOnErc1155Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const useSimulateHiveStakingRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setEnvironmentsAndHives"`
 *
 *
 */
export const useSimulateHiveStakingSetEnvironmentsAndHives =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'setEnvironmentsAndHives',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setRewardRate"`
 *
 *
 */
export const useSimulateHiveStakingSetRewardRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'setRewardRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"stake"`
 *
 *
 */
export const useSimulateHiveStakingStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'stake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const useSimulateHiveStakingTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"unstake"`
 *
 *
 */
export const useSimulateHiveStakingUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: 'unstake',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__
 *
 *
 */
export const useWatchHiveStakingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"DebugStake"`
 *
 *
 */
export const useWatchHiveStakingDebugStakeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: 'DebugStake',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 *
 */
export const useWatchHiveStakingOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"PointsClaimed"`
 *
 *
 */
export const useWatchHiveStakingPointsClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: 'PointsClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"Staked"`
 *
 *
 */
export const useWatchHiveStakingStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: 'Staked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"Unstaked"`
 *
 *
 */
export const useWatchHiveStakingUnstakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: 'Unstaked',
  })
