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
            selected: [0, 1, 2, 3],
            owned: [0, 1, 2, 3]
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
    if (savedPlayer.abilitys) {
        for (let i of [0, 1, 2, 3]) {
            if (!savedPlayer.abilitys.owned.includes(i)) savedPlayer.abilitys.owned.push(i)
            if (savedPlayer.abilitys.selected[i] === -1) {
                for (let j of [0, 1, 2, 3]) {
                    if (!savedPlayer.abilitys.owned.includes(j)) {
                        savedPlayer.abilitys.selected[i] = j
                        break
                    }
                }
            }
        }
    }
    return {
        ...newPlayer,
        ...savedPlayer
    }
}
