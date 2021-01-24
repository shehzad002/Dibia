import {useCallback} from 'react'

import useDba from './useDba'
import {useWallet} from 'use-wallet'

import {leave, getXDbaStakingContract} from '../dba/utils'

const useLeave = () => {
  const {account} = useWallet()
  const dba = useDba()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXDbaStakingContract(dba),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, dba],
  )

  return {onLeave: handle}
}

export default useLeave
