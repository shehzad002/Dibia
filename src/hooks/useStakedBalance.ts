import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../dba/utils'
import useDba from './useDba'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const dba = useDba()
  const masterChefContract = getMasterChefContract(dba)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, dba])

  useEffect(() => {
    if (account && dba) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, dba])

  return balance
}

export default useStakedBalance
