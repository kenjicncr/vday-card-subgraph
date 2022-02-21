import { log } from '@graphprotocol/graph-ts'
import { SafeTransferFromCall } from './types/NCRVDay/NCRVDayABI'
import { VDayCard } from './types/schema'

export function handleSafeTransferFrom(call: SafeTransferFromCall): void  {
  let id = call.transaction.hash.toHex()
  let tokenId = call.inputs.tokenId

  log.debug(`{}`, [id])

  let message = call.inputs.message_
  let nickname = call.inputs.nickname_
  let sender = call.inputs.from
  let receiver = call.inputs.to


  // let vdayCard = VDayCard.load(id)
  
  let vdayCard = new VDayCard(id)

  vdayCard.tokenId = tokenId
  vdayCard.message = message
  vdayCard.nickname = nickname
  vdayCard.sender = sender
  vdayCard.receiver = receiver
  vdayCard.response = null

  // vdayCard.save()

}