import { useCallback } from 'react'

import useDba from './useDba'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../dba/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const dba = useDba()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(dba),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, dba],
  )

  return { onStake: handleStake }
}

export default useStake
