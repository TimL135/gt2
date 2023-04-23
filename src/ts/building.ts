import { computed, ref } from "vue";
import { updateMultiplier } from "./multiplier";
import { percent } from "./generel/helpers";
import { savedPlayer } from "./player";
import { skillTrees } from "./skills";

export const details = ref({
    0: {
        name: "barrack",
        description: `Improves skills in the "${skillTrees.value[0].name}" skill tree.`,
        maxLvl: 5,
        multiplier: () => updateMultiplier("skills0", "building0", computed(() => percent((savedPlayer.value.buildings[0] || 0), "in")))
    },
    100: {
        name: "workshop",
        description: `Improves skills in the "${skillTrees.value[1].name}" skill tree.`,
        maxLvl: 5,
        multiplier: () => updateMultiplier("skills100", "building100", computed(() => percent((savedPlayer.value.buildings[100] || 0), "in")))
    },
    200: {
        name: "scrapyard",
        description: `Improves skills in the "${skillTrees.value[2].name}" skill tree.`,
        maxLvl: 5,
        multiplier: () => updateMultiplier("skills200", "building200", computed(() => percent((savedPlayer.value.buildings[200] || 0), "in")))
    },
    300: {
        name: "city hall",
        description: `Improves skills in the "${skillTrees.value[3].name}" skill tree.`,
        maxLvl: 5,
        multiplier: () => updateMultiplier("skills300", "building300", computed(() => percent((savedPlayer.value.buildings[300] || 0), "in")))
    },

})
export function buildingMultiplier() {
    Object.values(details.value).forEach(e => e.multiplier())
}