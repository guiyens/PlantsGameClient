import { type ICard } from '../Infertaces/ICard'
import { type IGame, StateEnum } from '../Infertaces/IGame'
import { type IPlayer } from '../Infertaces/IPlayer'

export class Game implements IGame {
  players: IPlayer[]
  cardDeck: ICard[]
  userActive: string
  state: StateEnum

  constructor() {
    this.players = []
    this.cardDeck = []
    this.userActive = ''
    this.state = StateEnum.WAITING
  }
}
