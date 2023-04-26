import { computed } from "vue"
import { savedPlayer } from "../player"

export const gameTicks = 30
export const speedConstant = computed(() => 30 / gameTicks)


export const generalSize = computed(() => (window.innerWidth / 2560 + window.innerHeight / 1360) / 2)

export const xpNeed = 125
export const maxLvl = 49//is displayed with +1

export const cost = {
    abilitys: 500,
    passivs: 500,
    spaceShip: 250,
    weapons: 500,
    buildings: 350,
}

export const getCurrencyInfo = "Scrap is a currency used to buy items. You can get scrap by killing enemies. You can also get scrap by selling items."
