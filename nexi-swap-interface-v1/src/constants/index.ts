import { ChainId, JSBI, Percent, Token, WETH } from '@nexiswap/sdk'

export const ROUTER_ADDRESS = '0x4A79de69D92708C71fF51A862F7A72DD85d15491'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const CRYTOSW = new Token(ChainId.MAINNET, '0xbAAeB48E51d2B8cd75914FA0d4B3cf6f06Ca9a5b', 18, 'CRYTOSW', 'CrytoSwap Token')
export const WNEXI = new Token(ChainId.MAINNET, '0xdB4B34cD613fe929019a3296B10171482ce0df60', 18, 'WNEXI', 'Wrapped NEXI')
export const CRUSD = new Token(ChainId.MAINNET, '0x492ffa18b9D3830Ebc5D59D5855219C591756234', 18, 'CRUSD', 'Cryto USD')
export const BUSD = new Token(ChainId.MAINNET, '0xE0dFffc2E01A7f051069649aD4eb3F518430B6a4', 18, 'BUSD', 'Binance USD')
export const USDT = new Token(ChainId.MAINNET, '0x7afd064DaE94d73ee37d19ff2D264f5A2903bBB0', 18, 'USDT', 'Tether USD')
export const ETH = new Token(ChainId.MAINNET, '0xE282a15DBad45e3131620C1b8AF85B7330Cb3b4B', 18, 'ETH', 'Binance-Peg Ethereum Token')

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], CRUSD, BUSD, USDT, ETH],
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
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], CRUSD, BUSD, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], CRUSD, BUSD, USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [CRYTOSW, WNEXI],
    [CRYTOSW, CRUSD],
    [WNEXI, CRUSD],
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
