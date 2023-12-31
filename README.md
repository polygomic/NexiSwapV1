
## Preparing source

- Clone `pancake-swap-core`
```
git clone git@github.com:pancakeswap/pancake-swap-core.git
cd pancake-swap-core
git checkout -b factory 3b214306770e86bc3a64e67c2b5bdb566b4e94a7
yarn install
yarn compile
```

- Clone `pancake-swap-periphery`
```
git clone git@github.com:pancakeswap/pancake-swap-periphery.git
cd pancake-swap-periphery
git checkout -b router d769a6d136b74fde82502ec2f9334acc1afc0732
yarn install
yarn add @uniswap/v2-core@"file:../pancake-swap-core"
yarn compile
```

- Clone `pancake-swap-interface-v1`
```
git clone git@github.com:pancakeswap/pancake-swap-interface-v1.git
cd pancake-swap-interface-v1
git checkout -b v1 0257017f2daaae2f67c24ded70b5829f74a01b3c
yarn install
```


## Setup

### Install contract merger: https://www.npmjs.com/package/sol-merger
```
npm install sol-merger -g
```

### Prepare `NexiSwapFactory` and `NexiSwapRouter`
```
sol-merger pancake-swap-core/contracts/PancakeFactory.sol ./build
sol-merger pancake-swap-core/contracts/PancakePair.sol ./build
sol-merger pancake-swap-periphery/contracts/PancakeRouter01.sol ./build
sol-merger pancake-swap-periphery/contracts/PancakeRouter.sol ./build
```

### Deploy `PancakeFactory` and `PancakeRouter`

- Access: https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.5.16+commit.9c3226ce.js

#### Deploy WNEXI

+ New File: `WNEXI.sol` => Copy source from https://gist.github.com/nhancv/b0b35f16472e4998d0fd17b7a1e4f707
+ Compiler tab => Select compiler: `v0.8.3+commit.8d00100c`
+ Deploy tab => Select `WNEXI` -> Deploy

#### Deploy PancakeFactory

+ New File: `PancakeFactory.sol` => Copy source from `./build/PancakeFactory.sol`
+ Compiler tab => Select compiler: `v0.5.16+commit.9c3226ce`
+ Deploy tab => Select `PancakeFactory` -> Fill your address as `feeToSetter` in constructor -> Deploy

#### Deploy PancakeRouter01

+ New File: `PancakeRouter01.sol` => Copy source from `./build/PancakeRouter01.sol`
+ Expand `PancakeFactory` deployed above -> Read `INIT_CODE_PAIR_HASH` -> Copy this hash without prefix `0x`. Ex: `bb600ba95884f2c2837114fd2f157d00137e0b65b0fe5226523d720e4a4ce539`
+ Edit `PancakeRouter01`: Find `PancakeLibrary` -> `pairFor` function => Replace new hex by `INIT_CODE_PAIR_HASH` above. Ex: `hex'd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66'` -> `hex'bb600ba95884f2c2837114fd2f157d00137e0b65b0fe5226523d720e4a4ce539'`
+ Compiler tab => Select compiler: `v0.6.6+commit.6c089d02`
+ Deploy tab => Select `PancakeRouter01` -> Fill `PancakeFactory` address and `WNEXI` address as constructor params -> Deploy

#### Deploy PancakeRouter (Main Router)

+ New File: `PancakeRouter.sol` => Copy source from `./build/PancakeRouter.sol`
+ Expand `PancakeFactory` deployed above -> Read `INIT_CODE_PAIR_HASH` -> Copy this hash without prefix `0x`. Ex: `bb600ba95884f2c2837114fd2f157d00137e0b65b0fe5226523d720e4a4ce539`
+ Edit `PancakeRouter`: Find `PancakeLibrary` -> `pairFor` function => Replace new hex by `INIT_CODE_PAIR_HASH` above. Ex: `hex'd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66'` -> `hex'bb600ba95884f2c2837114fd2f157d00137e0b65b0fe5226523d720e4a4ce539'`
+ Compiler tab => Select compiler: `v0.6.6+commit.6c089d02`; Check on `Enable optimization: 200` to avoid `Contract code size limit` issue
+ Deploy tab => Select `PancakeRouter` -> Fill `PancakeFactory` address and `WNEXI` address as constructor params -> Deploy


#### Setup Frontend

- Update .env
```
cd pancake-swap-interface-v1
cp .env.development .env
```

- Update `PancakeRouter` address to `ROUTER_ADDRESS` at `src/constants/index.ts`
  
- Update support chain to testnet at `src/connectors/index.ts`
	+ Change from `supportedChainIds: [424, 1424]` to `supportedChainIds: [424]`
	+ Change from `424` to `1424`

- Update `PancakeFactory` address and code hash to `FACTORY_ADDRESS` and `INIT_CODE_HASH` at `node_modules/@nexiswap/sdk/dist/constants.d.ts`, `node_modules/@nexiswap/sdk/dist/sdk.cjs.development.js`, `node_modules/@nexiswap/sdk/dist/sdk.cjs.production.min.js` and `node_modules/@nexiswap/sdk/dist/sdk.esm.js`

- Update `PancakeFactory` address to `v2 factory`; `PancakeRouter01` address to `v2 router 01` and `PancakeRouter` address to `v2 router 02` at `src/state/swap/hooks.ts`

- Update `WNEXI` address at `node_modules/@nexiswap/sdk/dist/sdk.cjs.development.js`, `node_modules/@nexiswap/sdk/dist/sdk.cjs.production.min.js`, `node_modules/@nexiswap/sdk/dist/sdk.esm.js`

- VERIFY CHANGES by `Find All` old addresses and replace new ones:
	+ WNEXI:            0xaE8E19eFB41e7b96815649A6a60785e1fbA84C1e
	+ PancakeFactory:  0xBCfCcbde45cE874adCB698cC183deBcF17952812
	+ INIT_CODE_HASH:  0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66
	+ PancakeRouter01: 0xf164fC0Ec4E93095b804a4795bBe1e041497b92a
	+ PancakeRouter:   0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F
	
- Deploy your own tokens
	+ Deploy your own tokens and update info (token address + chainId to 97) to `src/constants/token/nexiswap.json`
	+ Remember update token icon with name as token address in lowercase mode to `public/images/coins`
	+ Update support network from `ChainId.MAINNET` to `ChainId.BSCTESTNET` at `src/constants/index.ts`
	+ Update coin addresses to your at `src/constants/index.ts`
	+ Update `src/components/Menu/index.tsx`: From `priceData.data[CAKE.address].price` to `priceData.data[CAKE.address]?.price ?? 0`
	+ Update `src/hooks/useGetDocumentTitlePrice.ts`: From `priceData.data[CAKE.address].price` to `priceData.data[CAKE.address]?.price ?? 0`
	
- Custom menu at `src/components/Menu/config.ts`

### Start and Build Frontend

- Start
```
yarn start
```

- Build
```
yarn build
```

### Deployment

- WNEXI:            0xdB4B34cD613fe929019a3296B10171482ce0df60
- PancakeFactory:  0x0c39e33074fbF499E36A0366C262e4533428f20a
- INIT_CODE_HASH:  0x869daf6275064e5c7719dcb6c71a8f7909f964cf5bf5a5a5e32ba7c2e55b582e
- PancakeRouter01: 0xE871eAaBe471a9472eAD5eD75d49622d8a729D94
- PancakeRouter:   0xD6bAe477b2731d87A65872024dD1dce5b6C0747b
- Frontend:        https://pcs.nhancv.com 

**Tokens**

- BAKE Token: 0xb289b361a633A9D2b0B39BAE76BB458d83f58CEC
- BUSD Token: 0xE0dFffc2E01A7f051069649aD4eb3F518430B6a4
- ETH Token:  0xE282a15DBad45e3131620C1b8AF85B7330Cb3b4B
- USDT Token: 0x7afd064DaE94d73ee37d19ff2D264f5A2903bBB0
- XRP Token:  0x3833B175Af1900b457cf83B839727AF6C9cF0bEe
- DAI Token:  0x3Cf204795c4995cCf9C1a0B3191F00c01B03C56C
- CAKE Token: 0xB8F5B50ed77596b5E638359d828000747bb3dd89
