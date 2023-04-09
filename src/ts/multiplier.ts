import { ref } from "vue";
import { speedConstant } from "./config";

export const multiplier = ref<{ [key: string]: { [key: string]: number } }>({
    playerSpeed: {
        speedConstant
    },
    enemieSpeed: {
        speedConstant
    },
})
export function getMultiplier(type: string) {
    return Object.values(multiplier.value[type]).reduce((a, b) => a *= b, 1) || 1
}
export function updateMultiplier(product: string, category: string, value: number) {
    if (multiplier.value[product]) multiplier.value[product][category] = value;
    else multiplier.value[product] = { [category]: value };
}
