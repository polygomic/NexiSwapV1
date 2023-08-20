import { useEffect } from 'react'
import useGetPriceData from './useGetPriceData'
import { ORBITEX } from '../constants'

const useGetDocumentTitlePrice = () => {
  const priceData = useGetPriceData();
  let cakePriceUsd = 0;
  try {
    cakePriceUsd = priceData ? parseFloat(priceData.data[ORBITEX.address].price ?? 0) : 0
  } catch (e) {
    // Ignore
  }

  const cakePriceUsdString =
    Number.isNaN(cakePriceUsd) || cakePriceUsd === 0
      ? ''
      : ` - $${cakePriceUsd.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`

  useEffect(() => {
    document.title = `Nexi Exchange${cakePriceUsdString}`
  }, [cakePriceUsdString])
}
export default useGetDocumentTitlePrice
