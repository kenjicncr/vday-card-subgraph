import { Bytes, log, Value } from '@graphprotocol/graph-ts'
import { RespondCall, SafeTransferFromCall } from './types/NCRVDay/NCRVDayABI'
import { ValentinesDayCard, ValentinesDayCardResponse } from './types/schema'

export function handleSafeTransferFrom(call: SafeTransferFromCall): void  {
  let tokenId = call.inputs.tokenId
  let id = tokenId.toHexString()
  let timeSent = call.block.timestamp

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
    vdayCard.timeSent = timeSent

    // create an empty response with only this sender as the receiver
    let vdayCardResponse = new ValentinesDayCardResponse(id)
    vdayCardResponse.tokenId = tokenId
    vdayCardResponse.receiver = sender

    // set response vday card
    vdayCard.response = vdayCardResponse.id

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
  let timeSent = call.block.timestamp


  let vdayCard = ValentinesDayCard.load(id)

  if(vdayCard) {
    // only create response
    // if a vday card has been sent
    // if the message is empty

    const zeroSender = Bytes.fromHexString("0x00000000")
    let vdayCardResponse = ValentinesDayCardResponse.load(id)

    if(vdayCardResponse) {
      if(!vdayCardResponse.message) {
        vdayCardResponse = new ValentinesDayCardResponse(id)
        vdayCardResponse.message = message
        vdayCardResponse.nickname = nickname
        vdayCardResponse.tokenId = tokenId
        vdayCardResponse.state = state
        vdayCardResponse.timeSent = timeSent
        
        // this makes sure we set the sender
        vdayCardResponse.sender = call.from
        vdayCardResponse.save()
      }
    }
  }

}