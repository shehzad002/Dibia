import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}



export const contractAddresses = {
  dba: {
    3: '0xf70710d9b444A2244045D2F3354DB9b5A9398E7D',
  },
  masterChef: {
    3: '0xA82EbdCd71E93A9d30608573D2dEfc1AE5B8EbDe',
  },
  weth: {
    3: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  xDba: {
    3: '0xAB03b257DE4381827fb9532aE1C2f51844DDa522'
  }
}



export const supportedPools = [
  // Perm Menu
  {
    pid: 0,
    lpAddresses: {
      3: '0xf70710d9b444A2244045D2F3354DB9b5A9398E7D',
    },
    tokenAddresses: {
      3: '0xf70710d9b444A2244045D2F3354DB9b5A9398E7D',
    },
    name: 'Dba Party!',
    symbol: 'DBA-ETH SLP',
    tokenSymbol: 'DBA',
    icon: '🍣',
  }
  
]
