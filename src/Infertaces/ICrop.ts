import type { ICard } from './ICard'
import type IDictionary from './IDictionary'

export interface ICrop {
  dictionary: IDictionary<ICard>
  addCardToCrop(card: ICard, dismiss: (cardsToDismiss: Array<ICard>) => void): void
  addExtres(card: ICard, dismiss: (cardsToDismiss: Array<ICard>) => void): void
}
