import { ref } from "vue";
import { updateMultiplier } from "./multiplier";
import { percent } from "./helpers";
import { savedPlayer } from "./player";

export const details = ref({
    0: {
        name: "0",
        description: "0",
        maxLvl: 5,
        multiplier: (lvl = 0) => updateMultiplier("skills0", "building0", percent(lvl, "in"))
    },
    100: {
        name: "100",
        description: "100",
        maxLvl: 5,
        multiplier: (lvl = 0) => updateMultiplier("skills100", "building100", percent(lvl, "in"))
    },
    200: {
        name: "200",
        description: "200",
        maxLvl: 5,
        multiplier: (lvl = 0) => updateMultiplier("skills200", "building200", percent(lvl, "in"))
    }
})
export function buildingMultiplier() {
    Object.entries(details.value).forEach(e => e[1].multiplier(savedPlayer.value.buildings[+e[0]]))
}