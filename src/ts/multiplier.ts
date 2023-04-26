import { ComputedRef } from "vue";
import { speedConstant, generalSize } from "./generel/config";

export const multiplier = {
    playerSize: {
        generalSize
    },
    playerSpeed: {
        speedConstant,
        generalSize
    },
    enemieSize: {
        generalSize
    },
    enemieSpeed: {
        speedConstant,
        generalSize
    },
    itemSize: {
        generalSize
    },
    plasmaSize: {
        generalSize
    },
    plasmaSpeed: {
        generalSize
    },
} as { [key: string]: { [key: string]: ComputedRef<number> } }

export function getMultiplier(type: string) {
    return Object.values(multiplier[type] || {}).reduce((a, b) => a *= b.value, 1)
}
export function getAddition(type: string) {
    return Object.values(multiplier[type] || {}).reduce((a, b) => a += b.value, 0)
}
export function updateMultiplier(product: string, category: string, value: ComputedRef<number>) {
    if (multiplier[product]) multiplier[product][category] = value;
    else multiplier[product] = { [category]: value };
}
