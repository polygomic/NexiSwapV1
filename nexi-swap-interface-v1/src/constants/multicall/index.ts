import { ChainId } from '@nexiswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x361a27AEBf510Ae5e7768B0a4d24E402bE07b56E', // TODO
  [ChainId.TESTNET]: '0x361a27AEBf510Ae5e7768B0a4d24E402bE07b56E'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
