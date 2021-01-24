import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import useDba from '../../hooks/useDba'
import {getContract} from '../../utils/erc20'
import UnstakeXDba from './components/UnstakeXDba'
import StakeDba from "./components/StakeDba";

import {contractAddresses} from '../../dba/lib/constants'
import {getXDbaSupply} from "../../dba/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";

const StakeXDba: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.xDba[3],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const dba = useDba()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXDbaSupply(dba)
      setTotalSupply(supply)
    }
    if (dba) {
      fetchTotalSupply()
    }
  }, [dba, setTotalSupply])



  const lpContract = useMemo(() => {
    debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXDba
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StakeDba
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              ℹ️️ You will earn a portion of the swaps fees based on the amount
              of xDba held relative the weight of the staking. xDba can be minted
              by staking Dba. To redeem Dba staked plus swap fees convert xDba
              back to Dba. {totalSupply ? `There are currently ${getBalanceNumber(totalSupply)} xDBA in existence.` : '' }
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default StakeXDba
