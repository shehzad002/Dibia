import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../dba/utils'
import useDba from './useDba'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const dba = useDba()
  const masterChefContract = getMasterChefContract(dba)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, dba])

  useEffect(() => {
    if (account && masterChefContract && dba) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, dba])

  return balance
}

export default useEarnings
