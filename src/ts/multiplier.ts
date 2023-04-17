import { ref } from "vue";
import { speedConstant, generalSize } from "./generel/config";

export const multiplier = ref<{ [key: string]: { [key: string]: number } }>({
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
    enemieDamage: {},
    enemieSpecial: {},
    enemieHp: {},

})
export function getMultiplier(type: string) {
    return Object.values(multiplier.value[type] || {}).reduce((a, b) => a *= b, 1)
}
// export function getAddition(type: string) {
//     return Object.values(multiplier.value[type] || {}).reduce((a, b) => a += b, 0)
// }
export function updateMultiplier(product: string, category: string, value: number) {
    if (multiplier.value[product]) multiplier.value[product][category] = value;
    else multiplier.value[product] = { [category]: value };
}
