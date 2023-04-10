import { ref } from "vue";
import { SpaceShipDetails } from "../types";

export const details = ref({
    0: {
        speed: 4,
        hpMax: 5,
        energyMax: 5,
        size: 50
    },
    1: {
        speed: 6,
        hpMax: 3,
        energyMax: 3,
        size: 30
    },
    2: {
        speed: 3,
        hpMax: 8,
        energyMax: 8,
        size: 60
    }
} as SpaceShipDetails)
export const imgs = ["player"]