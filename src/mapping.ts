import { log, Value } from '@graphprotocol/graph-ts'
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

  let vdayCard = VDayCard.load(id)

  if(!vdayCard) {
      
    vdayCard = new VDayCard(id)
    vdayCard.set("id", Value.fromString(id))
    vdayCard.set("message", Value.fromString(message))
    vdayCard.set("nickname", Value.fromString(nickname))
    vdayCard.set("sender", Value.fromAddress(sender))
    vdayCard.set("receiver", Value.fromAddress(receiver))

    vdayCard.save()
  } {
     // let vdayCard = VDayCard.load(id)
  }

}