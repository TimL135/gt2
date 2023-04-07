import { ref } from "vue";
import { SkillDetail, SkillDetails } from "../types";
import { actions as actionsPlayer, savedPlayer } from './player';
import { percent } from "./helpers";

export const skillTrees = ref([
    {
        name: "fight",
        id: 0
    },
    {
        name: "movement",
        id: 1
    },
    {
        name: "collect",
        id: 2
    },
])
export const details = ref({
    0: {
        name: "4680 battery",
        description: "increases the maximum energy.",
        skillTreeId: 0,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => lvl
    } as SkillDetail,
    1: {
        name: "super charger",
        description: "increases the energy production.",
        skillTreeId: 0,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => percent(lvl, "in")
    } as SkillDetail,
    2: {
        name: "reload automatic",
        description: "increases the reloading speed.",
        skillTreeId: 0,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => percent(lvl, "de")
    } as SkillDetail,
    3: {
        name: "magnetic plasma",
        description: "your plasma can collect items.",
        skillTreeId: 0,
        usedPointsNeed: 20,
        maxLvl: 1,
        multiplier: (lvl = 0) => lvl
    } as SkillDetail,
    100: {
        name: "plaid",
        description: "you move faster.",
        skillTreeId: 1,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => percent(lvl, "in")
    } as SkillDetail,
    200: {
        name: "more items",
        description: "items spawn more often.",
        skillTreeId: 2,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => percent(lvl, "de")
    } as SkillDetail,
    201: {
        name: "longer items",
        description: "it takes longer for items to despawn.",
        skillTreeId: 2,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => percent(lvl, "in")
    } as SkillDetail,

} as SkillDetails)
export const newPointsInfo = ref<string[]>([])
export function getPoints() {
    newPointsInfo.value = []
    for (const e of [["kill", 10, 0], ["move", 3000, 1], ["collect", 2, 2]] as const)
        if (Math.round(actionsPlayer.value[e[0]] / e[1]) > (savedPlayer.value.points[e[2]] || 0)) {
            newPointsInfo.value.push(`you got ${Math.round(actionsPlayer.value[e[0]] / e[1]) - (savedPlayer.value.points[e[2]] || 0)} points for the "${skillTrees.value[e[2]].name}" tree.`)
            savedPlayer.value.points[e[2]] = Math.round(actionsPlayer.value[e[0]] / e[1])
        }
}