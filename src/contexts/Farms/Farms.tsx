import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useDba from '../../hooks/useDba'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../dba/utils'
import { getFarms } from '../../dba/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const dba = useDba()
  const { account } = useWallet()

  const farms = getFarms(dba)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
