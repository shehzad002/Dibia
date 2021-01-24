import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Dba } from '../../dba'

export interface DbaContext {
  dba?: typeof Dba
}

export const Context = createContext<DbaContext>({
  dba: undefined,
})

declare global {
  interface Window {
    dbasauce: any
  }
}

const DbaProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [dba, setDba] = useState<any>()

  // @ts-ignore
  window.dba = dba
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const dbaLib = new Dba(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setDba(dbaLib)
      window.dbasauce = dbaLib
    }
  }, [ethereum])

  return <Context.Provider value={{ dba }}>{children}</Context.Provider>
}

export default DbaProvider
