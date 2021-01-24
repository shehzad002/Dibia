import { useCallback } from 'react'

import useDba from './useDba'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../dba/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const dba = useDba()
  const masterChefContract = getMasterChefContract(dba)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, dba],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
