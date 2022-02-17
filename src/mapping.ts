import { SafeTransferFromCall } from './types/NCRVDay/NCRVDayABI'
import { VDayCard } from './types/schema'
export function handleSafeTransferFrom(event: SafeTransferFromCall): void  {
  let id = event.inputs.tokenId.toHex()
  let tokenId = event.inputs.tokenId

  let message = event.inputs.message_
  let nickname = event.inputs.nickname_
  let sender = event.inputs.from.toString()
  let receiver = event.inputs.to.toString()

  let vdayCard = VDayCard.load(id)
  
  if(vdayCard === null) {
    vdayCard = new VDayCard(id)

    vdayCard.tokenId = tokenId
    vdayCard.message = message
    vdayCard.nickname = nickname
    vdayCard.sender = sender
    vdayCard.receiver = receiver

    vdayCard.save()
  }

}