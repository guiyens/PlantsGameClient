import { type ICard } from '@/Infertaces/ICard'
import type { ICrop } from './ICrop'

export interface IPlayer {
  socketId: string
  name: string
  cards: Array<ICard>
  flowerCards: Array<ICard>
  crop: ICrop
}
