import type { ICard } from '@/Infertaces/ICard'

export function getImage(card: ICard) {
  if (card && card.type) {
    const newUrl = new URL(`/src/assets/images/cards/${card.image}`, import.meta.url)
    const url = newUrl?.href
    return url
  }
}
