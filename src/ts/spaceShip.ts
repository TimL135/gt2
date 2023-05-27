import { ref } from "vue";
import { OwnedSpaceShip, SpaceShipDetails, SpaceShipStats } from "../types";
import { percent } from "./generel/helpers";

export const details = ref({
    0: {
        speed: 6,
        hpMax: 5,
        energyMax: 5,
        size: 40,
        statsMultiplier: {
            speed: "const",
            hpMax: "in",
            energyMax: "in",
            size: "const"
        }
    },
    1: {
        speed: 6,
        hpMax: 3,
        energyMax: 3,
        size: 30,
        statsMultiplier: {
            speed: "in",
            hpMax: "const",
            energyMax: "const",
            size: "de"
        }
    },
    2: {
        speed: 4,
        hpMax: 8,
        energyMax: 8,
        size: 55,
        statsMultiplier: {
            speed: "const",
            hpMax: "in",
            energyMax: "in",
            size: "in"
        }
    }
} as SpaceShipDetails)
export const imgs = ["player", "player2", "player3", "player4", "player5"]

export function getStats(spaceShip: OwnedSpaceShip) {
    const stats = {} as SpaceShipStats
    (Object.keys(details.value[0]).filter(e => e != 'statsMultiplier') as ["speed", "hpMax", "energyMax", "size"]).forEach(e => stats[e] = +(details.value[spaceShip.stats][e] * percent(spaceShip.statsMultiplier || 0, details.value[spaceShip.stats].statsMultiplier[e])).toFixed(1))
    return stats
}