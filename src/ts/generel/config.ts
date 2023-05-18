import { computed } from "vue"

export const gameTicks = 30
export const speedConstant = computed(() => 30 / gameTicks)


export const generalSize = computed(() => (window.innerWidth / 2560 + window.innerHeight / 1360) / 2)

export const xpNeed = 120
export const maxLvl = 49//is displayed with +1

export const cost = {
    abilitys: 250,
    passivs: 250,
    spaceShip: 200,
    weapons: 250,
    buildings: 200,
}

export const getCurrencyInfo = "Scrap is a currency used to buy items. You can get scrap by killing enemies. You can also get scrap by selling items."
