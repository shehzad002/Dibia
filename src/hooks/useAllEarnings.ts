import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../dba/utils'
import useDba from './useDba'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const dba = useDba()
  const farms = getFarms(dba)
  const masterChefContract = getMasterChefContract(dba)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, dba])

  useEffect(() => {
    if (account && masterChefContract && dba) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, dba])

  return balances
}

export default useAllEarnings
