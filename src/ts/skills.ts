import { ref } from "vue";
import { SkillDetail, SkillDetails } from "../types";
import { actions as actionsPlayer, savedPlayer } from './player';
import { percent } from "./helpers";
import { updateMultiplier, getMultiplier } from "./multiplier";

export const skillTrees = ref([
    {
        name: "fight",
        id: 0
    },
    {
        name: "space ship",
        id: 1
    },
    {
        name: "collect",
        id: 2
    },
])
export const details = ref({

    0: {
        name: "super charger",
        description: "increases the energy production.",
        skillTreeId: 0,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("chargeSpeed", "skill0", percent(lvl * getMultiplier("skills0"), "in"))
    } as SkillDetail,
    1: {
        name: "reload automatic",
        description: "increases the reloading speed.",
        skillTreeId: 0,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("reloadSpeed", "skill1", percent(lvl * getMultiplier("skills0"), "de"))
    } as SkillDetail,
    2: {
        name: "magnetic plasma",
        description: "your plasma can collect items.",
        skillTreeId: 0,
        usedPointsNeed: 20,
        maxLvl: 1,
        multiplier: (lvl = 0) => lvl
    } as SkillDetail,
    3: {
        name: "slow enemies",
        description: "enemies move slower.",
        skillTreeId: 0,
        usedPointsNeed: 40,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("enemieSpeed", "skill3", percent(lvl * getMultiplier("skills0"), "de"))
    } as SkillDetail,
    4: {
        name: "smaller enemies",
        description: "enemies are smaller.",
        skillTreeId: 0,
        usedPointsNeed: 40,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("enemieSize", "skill4", percent(lvl * getMultiplier("skills5"), "de"))
    } as SkillDetail,
    100: {
        name: "plaid",
        description: "you move faster.",
        skillTreeId: 1,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("playerSpeed", "skill100", percent(lvl * getMultiplier("skills100"), "in"))
    } as SkillDetail,
    101: {
        name: "4680 battery",
        description: "you are smaller.",
        skillTreeId: 1,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => Math.round(lvl * getMultiplier("skills100"))
    } as SkillDetail,
    102: {
        name: "shrink ray",
        description: "increases the maximum energy.",
        skillTreeId: 1,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("playerSize", "skill102", percent(lvl * getMultiplier("skills102"), "de"))
    } as SkillDetail,
    200: {
        name: "more items",
        description: "items spawn more often.",
        skillTreeId: 2,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("itemSpawn", "skill200", percent(lvl * getMultiplier("skills200"), "de"))
    } as SkillDetail,
    201: {
        name: "longer items",
        description: "it takes longer for items to despawn.",
        skillTreeId: 2,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("itemDespawn", "skill201", percent(lvl * getMultiplier("skills200"), "in"))
    } as SkillDetail,
    202: {
        name: "longer slow",
        description: "the slow effect lasts longer.",
        skillTreeId: 2,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("slowDuration", "skill202", percent(lvl * getMultiplier("skills200"), "in"))
    } as SkillDetail,
    203: {
        name: "longer speed",
        description: "the speed effect lasts longer.",
        skillTreeId: 2,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("speedDuration", "skill203", percent(lvl * getMultiplier("skills200"), "in"))
    } as SkillDetail,
    204: {
        name: "longer stun",
        description: "the stun effect lasts longer.",
        skillTreeId: 2,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("stunDuration", "skill204", percent(lvl * getMultiplier("skills200"), "in"))
    } as SkillDetail,
} as SkillDetails)
export function skillMultiplier() {
    Object.entries(details.value).forEach(e => e[1].multiplier(savedPlayer.value.skills[+e[0]]))
}
export const newPointsInfo = ref<string[]>([])
export function resetInfo() {
    newPointsInfo.value = []
}
export function getPoints() {
    for (const e of [["kills", 10, 0], ["move", 3000, 1], ["collect", 2, 2]] as const)
        if (Math.round(actionsPlayer.value[e[0]] / e[1]) > (savedPlayer.value.points[e[2]] || 0)) {
            const points = Math.round(actionsPlayer.value[e[0]] / e[1]) - (savedPlayer.value.points[e[2]] || 0)
            newPointsInfo.value.push(`you got ${points} point${points > 1 ? 's' : ''} for the "${skillTrees.value[e[2]].name}" tree.`)
            savedPlayer.value.points[e[2]] = Math.round(actionsPlayer.value[e[0]] / e[1])
        }
}