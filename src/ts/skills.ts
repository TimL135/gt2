import { ref } from "vue";
import { SkillDetail, SkillDetails } from "../types";
import { actions as actionsPlayer, player, savedPlayer } from './player';
import { percent, secondsToTicks } from "./generel/helpers";
import { updateMultiplier, getMultiplier } from "./multiplier";
import { generalSize } from "./generel/config";
import { lvlMultiplier } from "./lvl";

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
    {
        name: "generell",
        id: 3
    }
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
    5: {
        name: "big plasma",
        description: "plasma are bigger.",
        skillTreeId: 0,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("plasmaSize", "skill5", percent(lvl * getMultiplier("skills5"), "in"))
    } as SkillDetail,
    6: {
        name: "fast plasma",
        description: "plasma move faster.",
        skillTreeId: 0,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("plasmaSpeed", "skill6", percent(lvl * getMultiplier("skills5"), "in"))
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
        description: "increases the maximum energy.",
        skillTreeId: 1,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => Math.round(lvl * getMultiplier("skills100"))
    } as SkillDetail,
    102: {
        name: "shrink ray",
        description: "makes you smaller.",
        skillTreeId: 1,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("playerSize", "skill102", percent(lvl * getMultiplier("skills100"), "de"))
    } as SkillDetail,
    103: {
        name: "growth ray",
        description: "makes you bigger.",
        skillTreeId: 1,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("playerSize", "skill103", percent(lvl * getMultiplier("skills100"), "in"))
    } as SkillDetail,
    104: {
        name: "armor",
        description: "gives you more life especially effective when your spaceship is big.",
        skillTreeId: 1,
        usedPointsNeed: 40,
        maxLvl: 20,
        multiplier: (lvl = 0) => Math.round(((player.value.size / generalSize) / 100) * lvl * getMultiplier("skills100"))
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
    205: {
        name: "stronger slow",
        description: "the slow effect is stronger.",
        skillTreeId: 2,
        usedPointsNeed: 40,
        required: {
            skillId: 202,
            skillLvl: 20
        },
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("slowStrength", "skill205", percent(lvl * getMultiplier("skills200"), "de"))
    } as SkillDetail,
    206: {
        name: "stronger speed",
        description: "the speed effect is stronger.",
        skillTreeId: 2,
        usedPointsNeed: 40,
        required: {
            skillId: 203,
            skillLvl: 20
        },
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("speedStrength", "skill206", percent(lvl * getMultiplier("skills200"), "in"))
    } as SkillDetail,
    300: {
        name: "discount",
        description: "reduces the scrap costs.",
        skillTreeId: 3,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("discount", "300", percent(lvl * getMultiplier("skills300"), "de"))
    } as SkillDetail,
    301: {
        name: "more points",
        description: `you get more points for the ${skillTrees.value[0].name} tree.`,
        skillTreeId: 3,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("tree0", "301", percent(lvl * getMultiplier("skills300"), "in"))
    } as SkillDetail,
    302: {
        name: "more points",
        description: `you get more points for the ${skillTrees.value[1].name} tree.`,
        skillTreeId: 3,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("tree1", "302", percent(lvl * getMultiplier("skills300"), "in"))
    } as SkillDetail,
    303: {
        name: "more points",
        description: `you get more points for the ${skillTrees.value[2].name} tree.`,
        skillTreeId: 3,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("tree2", "303", percent(lvl * getMultiplier("skills300"), "in"))
    } as SkillDetail,
    304: {
        name: "more points",
        description: `you get more points for the ${skillTrees.value[3].name} tree.`,
        skillTreeId: 3,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: (lvl = 0) => updateMultiplier("tree3", "304", percent(lvl * getMultiplier("skills300"), "in"))
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
    lvlMultiplier()
    for (const e of [["kills", 10, 0], ["move", 3000, 1], ["collect", 2, 2], ["time", secondsToTicks(10), 3]] as const) {
        const actionValue = Math.round(actionsPlayer.value[e[0]] * getMultiplier(`tree${e[2]}`) / e[1])
        if (actionValue > (savedPlayer.value.points[e[2]] || 0)) {
            const points = actionValue - (savedPlayer.value.points[e[2]] || 0)
            newPointsInfo.value.push(`you got ${points} point${points > 1 ? 's' : ''} for the "${skillTrees.value[e[2]].name}" tree.`)
            savedPlayer.value.points[e[2]] = actionValue
        }
    }
}