import { BigNumber, ethers } from 'ethers'
import Lido from '../abi/Lido.json'

export type EthereumClResponse = {
  withdrawalCredential: string
  totalBeaconBalance: string
  totalLimboBalance: string
  totalBalance: string
}[]

export const parseBeaconBalance = (
  data: EthereumClResponse,
  withdrawalCredential: string,
): BigNumber => {
  return data
    .filter((e) => e.withdrawalCredential == withdrawalCredential)
    .map((e) => BigNumber.from(e.totalBalance))
    .reduce((sum, e) => sum.add(e))
}

export const getBufferedEther = async (
  lidoContract: string,
  provider: ethers.providers.JsonRpcProvider,
): Promise<BigNumber> => {
  const contract = new ethers.Contract(lidoContract, Lido, provider)

  return BigNumber.from((await contract.getBufferedEther()).toString())
}

export const getWithdrawalCredential = async (
  lidoContract: string,
  provider: ethers.providers.JsonRpcProvider,
): Promise<string> => {
  const contract = new ethers.Contract(lidoContract, Lido, provider)

  return await contract.getWithdrawalCredentials()
}
