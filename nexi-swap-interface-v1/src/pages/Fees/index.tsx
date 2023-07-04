import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ArrowDown } from 'react-feather'
import { CardBody, ArrowDownIcon, Button, IconButton, Text } from '@crytoswap-libs/uikit'
import { ThemeContext } from 'styled-components'
import Card, { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import CardNav from 'components/CardNav'
import { AutoRow, RowBetween } from 'components/Row'
import AdvancedSwapDetailsDropdown from 'components/swap/AdvancedSwapDetailsDropdown'
import confirmPriceImpactWithoutFee from 'components/swap/confirmPriceImpactWithoutFee'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from 'components/swap/styleds'
import TradePrice from 'components/swap/TradePrice'
import TokenWarningModal from 'components/TokenWarningModal'
import SyrupWarningModal from 'components/SyrupWarningModal'
import SafeMoonWarningModal from 'components/SafeMoonWarningModal'
import ProgressSteps from 'components/ProgressSteps'

import { INITIAL_ALLOWED_SLIPPAGE } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { useExpertModeManager, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import { LinkStyledButton } from 'components/Shared'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Loader from 'components/Loader'
import useI18n from 'hooks/useI18n'
import PageHeader from 'components/PageHeader'
import ConnectWalletButton from 'components/ConnectWalletButton'
import AppBody from '../AppBody'

const Fees = () => {
  const TranslateString = useI18n()
  const { account } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [deadline] = useUserDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  return (
    <>
      <AppBody>
        <Wrapper id="swap-page">
          <CardBody>
            <AutoColumn gap="md">
              <AutoColumn justify="space-between">
                <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                  fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf
                </AutoRow>
              </AutoColumn>
            </AutoColumn>
          </CardBody>
        </Wrapper>
      </AppBody>
    </>
  )
}

export default Fees
