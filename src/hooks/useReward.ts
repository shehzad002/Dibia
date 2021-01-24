import { useCallback } from 'react'

import useDba from './useDba'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../dba/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const dba = useDba()
  const masterChefContract = getMasterChefContract(dba)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, dba])

  return { onReward: handleReward }
}

export default useReward
