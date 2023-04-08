import { SavedPlayer } from "../types"

export function setSavedPlayer(savedPlayer: SavedPlayer) {
    localStorage.setItem('savedPlayer', JSON.stringify(savedPlayer))
}
export function getSavedPlayer(): SavedPlayer {
    return JSON.parse(localStorage.getItem('savedPlayer') || '{"skills":{},"points":{}}')
}
