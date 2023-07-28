import { ChainId } from '@nexiswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x90F420222b60716D36f591eE0822663c49A6d7Ad', // TODO
  [ChainId.TESTNET]: '0x90F420222b60716D36f591eE0822663c49A6d7Ad'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
