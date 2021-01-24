import {useCallback} from 'react'

import useDba from './useDba'
import {useWallet} from 'use-wallet'

import {enter, getXDbaStakingContract} from '../dba/utils'

const useEnter = () => {
  const {account} = useWallet()
  const dba = useDba()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXDbaStakingContract(dba),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, dba],
  )

  return {onEnter: handle}
}

export default useEnter
