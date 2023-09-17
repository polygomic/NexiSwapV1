import { ChainId, JSBI, Percent, Token, WETH } from '@nexiswap/sdk'

export const ROUTER_ADDRESS = '0xFdA21D9F78E193C45ee410d67300B4353eF6cF10'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const CASHUSD = new Token(ChainId.MAINNET, '0x40Aa6A2463fBAabEA6DB995aaB604C2393cbc37D', 18, 'CASHUSD', 'Cash USD')
export const WNEXI = new Token(ChainId.MAINNET, '0xEC3ceC066E5b2331fCD0Eb7eE5A9B17F617A6efb', 18, 'WNEXI', 'Wrapped NEXI')
export const ORBITEX = new Token(ChainId.MAINNET, '0x613d19fd91A62513e16Ecc1c0A4bFb16480bd2Bb', 18, 'ORBITEX', 'Orbitex')
export const USDT = new Token(ChainId.MAINNET, '0x69F6c3e18028012Fbad46A9e940889daF6b4241D', 18, 'USDT', 'Tether USD')

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], CASHUSD, WNEXI, USDT, ORBITEX],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], CASHUSD, WNEXI, USDT,ORBITEX],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], CASHUSD, WNEXI, USDT,ORBITEX],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [CASHUSD, WNEXI],
    [CASHUSD, USDT],
    [WNEXI, USDT],
    [ORBITEX, USDT],
    [ORBITEX, CASHUSD],
    [ORBITEX, WNEXI],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
