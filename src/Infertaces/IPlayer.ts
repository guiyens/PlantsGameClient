import { type ICard } from '@/Infertaces/ICard'

export interface IPlayer {
  socketId: string
  name: string
  cards: Array<ICard>
}
