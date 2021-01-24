import {useCallback} from 'react'

import useDba from './useDba'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getDbaContract,
  getXDbaStakingContract
} from '../dba/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const dba = useDba()
  const lpContract = getDbaContract(dba)
  const contract = getXDbaStakingContract(dba)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
