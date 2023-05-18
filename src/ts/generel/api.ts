import { SavedPlayer } from "../../types"

export function setSavedPlayer(savedPlayer: SavedPlayer) {
    localStorage.setItem('savedPlayer', JSON.stringify(savedPlayer))
}
export function getSavedPlayer(): SavedPlayer {
    const newPlayer = {
        settings: {
            musicVolume: 50,
            soundsVolume: 50,
            keys: {
                buy10: "Control",
                buy20: "Shift",
                moveUp: "ArrowUp",
                moveDown: "ArrowDown",
                moveLeft: "ArrowLeft",
                moveRight: "ArrowRight",
                shot: " ",
                ability0: "1",
                ability1: "2",
                ability2: "3",
                ability3: "4",
            }
        },
        skills: {},
        points: {},
        buildings: {},
        abilitys: {
            selected: [-1, -1, -1, -1],
            owned: []
        },
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
        },
        passivs: {
            owned: [0],
            selected: 0
        },
        lvl: {
            lvl: 0,
            xp: 0
        },
        timeCrystal: {
            selected: 0,
            owned: {}
        },
        powerCrystal: {
            selected: 0,
            owned: {}
        },
        score: {
            highScore: 0,
        }
    }
    let savedPlayer = JSON.parse(localStorage.getItem('savedPlayer') || '{}')
    if (savedPlayer.artefacts) {
        newPlayer.timeCrystal = savedPlayer.artefacts
        delete savedPlayer.artefacts
    }
    return {
        ...newPlayer,
        ...savedPlayer
    }
}
