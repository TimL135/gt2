import { SavedPlayer } from "../types"

export function setSavedPlayer(savedPlayer: SavedPlayer) {
    localStorage.setItem('savedPlayer', JSON.stringify(savedPlayer))
}
export function getSavedPlayer(): SavedPlayer {
    const savePlayer = JSON.stringify({
        skills: {},
        points: {},
        buildings: {},
        weapons: {
            owned: [0],
            selected: 0
        },
        spaceShip: {
            selected: 0,
            owned: {
                0: {
                    img: 'player',
                    stats: 0
                }
            }
        }
    })
    return JSON.parse(localStorage.getItem('savedPlayer') || savePlayer)
}
