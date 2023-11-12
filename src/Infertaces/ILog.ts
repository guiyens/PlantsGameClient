import { EGroup, type ICard } from './ICard'
import { type IPlayer } from './IPlayer'

export interface ILog {
  player: Partial<IPlayer>
  date: Date
  action: EGroup
  playerAffectted?: Partial<IPlayer>
  cardPlayed: ICard
}
