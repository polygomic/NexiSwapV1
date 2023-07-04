import { ChainId } from '@nexiswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xbAA780BcD8bFefB45A10d32424Bd11F2F57644Db', // TODO
  [ChainId.TESTNET]: '0xbAA780BcD8bFefB45A10d32424Bd11F2F57644Db'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
