import type { ICard } from '@/Infertaces/ICard'

export function getImage(card: ICard) {
  if (card && card.type) {
    const newUrl = new URL(`/src/assets/images/${card.image}`, import.meta.url)
    const url = newUrl?.href
    return url
  }
}

export function getImageNocard(imageName: string) {
  if (imageName) {
    const newUrl = new URL(`/src/assets/images/game_elements/${imageName}`, import.meta.url)
    const url = newUrl?.href
    return url
  }
}
