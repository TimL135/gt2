import { ref } from "vue";
import { updateMultiplier } from "./multiplier";
import { percent } from "./helpers";
import { savedPlayer } from "./player";
import { skillTrees } from "./skills";

export const details = ref({
    0: {
        name: "barrack",
        description: `Improves skills in the "${skillTrees.value[0].name}" skill tree.`,
        maxLvl: 5,
        multiplier: (lvl = 0) => updateMultiplier("skills0", "building0", percent(lvl, "in"))
    },
    100: {
        name: "workshop",
        description: `Improves skills in the "${skillTrees.value[1].name}" skill tree.`,
        maxLvl: 5,
        multiplier: (lvl = 0) => updateMultiplier("skills100", "building100", percent(lvl, "in"))
    },
    200: {
        name: "scrapyard",
        description: `Improves skills in the "${skillTrees.value[2].name}" skill tree.`,
        maxLvl: 5,
        multiplier: (lvl = 0) => updateMultiplier("skills200", "building200", percent(lvl, "in"))
    }
})
export function buildingMultiplier() {
    Object.entries(details.value).forEach(e => e[1].multiplier(savedPlayer.value.buildings[+e[0]]))
}