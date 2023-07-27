import { type ICard } from '../Infertaces/ICard'
import { type IPlayer } from '../Infertaces/IPlayer'

export class Player implements IPlayer {
  socketId: string
  name: string
  cards: Array<ICard>

  constructor(socketId: string, name: string) {
    this.socketId = socketId
    this.name = name
    this.cards = []
  }
}
