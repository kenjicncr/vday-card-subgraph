import { log, Value } from '@graphprotocol/graph-ts'
import { RespondCall, SafeTransferFromCall } from './types/NCRVDay/NCRVDayABI'
import { ValentinesDayCard, ValentinesDayCardResponse } from './types/schema'

export function handleSafeTransferFrom(call: SafeTransferFromCall): void  {
  let id = call.transaction.hash.toHex()
  let tokenId = call.inputs.tokenId

  call.block.timestamp

  log.debug(`{}`, [id])

  let message = call.inputs.message_
  let nickname = call.inputs.nickname_
  let sender = call.inputs.from
  let receiver = call.inputs.to

  let vdayCard = ValentinesDayCard.load(id)

  if(!vdayCard) {
      
    vdayCard = new ValentinesDayCard(id)
    vdayCard.tokenId = tokenId
    vdayCard.message = message
    vdayCard.nickname = nickname
    vdayCard.receiver = receiver
    vdayCard.sender = sender

    // create an empty response with only this sender as the receiver
    let vdayCardResponse = new ValentinesDayCardResponse(tokenId.toHexString())
    vdayCardResponse.receiver = sender

    vdayCard.save()
    vdayCardResponse.save()
  } {
     // let vdayCard = VDayCard.load(id)
  }
}

export function handleRespond(call: RespondCall): void {
  let tokenId = call.inputs.tokenId
  let id = tokenId.toHexString()
  let message = call.inputs.message_
  let nickname = call.inputs.nickname_
  let state = call.inputs.state

  let vdayCardResponse = ValentinesDayCardResponse.load(id)

  // only create response if it doesn't already exist

  if(!vdayCardResponse) {
    vdayCardResponse = new ValentinesDayCardResponse(id)
    vdayCardResponse.message = message
    vdayCardResponse.nickname = nickname
    vdayCardResponse.tokenId = tokenId
    vdayCardResponse.sender = call.from
    vdayCardResponse.state = state

    vdayCardResponse.save()
  }

}