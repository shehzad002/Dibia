import { useContext } from 'react'
import { Context } from '../contexts/DbaProvider'

const useDba = () => {
  const { dba } = useContext(Context)
  return dba
}

export default useDba
