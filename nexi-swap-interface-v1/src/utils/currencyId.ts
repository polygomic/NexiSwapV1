import { Currency, ETHER, Token } from '@nexiswap/sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'NEXI'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
