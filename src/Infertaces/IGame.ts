import { type IPlayer } from '@/Infertaces/IPlayer'
import { type ICard } from '@/Infertaces/ICard'

export interface IGame {
  players: Array<IPlayer>
  cardDeck: Array<ICard>
  userActive: string
  state: StateEnum
}

export enum StateEnum {
  WAITING,
  STARTED,
  FINISHED
}
