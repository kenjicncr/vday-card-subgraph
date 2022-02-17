import { SafeTransferFromCall } from './types/NCRVDay/NCRVDayABI'
import { VDayCard } from './types/schema'
export function handleSafeTransferFrom(event: SafeTransferFromCall) {
  let tokenId = event.inputs.tokenId.toString()

  let message = event.inputs.message_
  let nickname = event.inputs.nickname_
  let sender = event.inputs.from.toString()
  let receiver = event.inputs.to.toString()

  let vdayCard = VDayCard.load(tokenId)
  
  if(vdayCard === null) {
    vdayCard = new VDayCard(tokenId)

    vdayCard.message = message
    vdayCard.nickname = nickname
    vdayCard.sender = sender
    vdayCard.receiver = receiver

    vdayCard.save()
  }

}