import { computed, ref } from "vue";
import { SkillDetail, SkillDetails } from "../types";
import { actions as actionsPlayer, player, savedPlayer } from './player';
import { percent, secondsToTicks } from "./generel/helpers";
import { updateMultiplier, getMultiplier } from "./multiplier";
import { generalSize } from "./generel/config";
import { lvlMultiplier } from "./lvl";
import { updateInfo } from "./info";

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
        multiplier: () => updateMultiplier("chargeSpeed", "skill0", computed(() => percent((savedPlayer.value.skills[0] || 0) * getMultiplier("skills0"), "in")))
    } as SkillDetail,
    1: {
        name: "reload automatic",
        description: "increases the reloading speed.",
        skillTreeId: 0,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("reloadSpeed", "skill1", computed(() => percent((savedPlayer.value.skills[1] || 0) * getMultiplier("skills0"), "de")))
    } as SkillDetail,
    3: {
        name: "slow enemies",
        description: "enemies move slower.",
        skillTreeId: 0,
        usedPointsNeed: 40,
        maxLvl: 20,
        multiplier: () => updateMultiplier("enemieSpeed", "skill3", computed(() => percent((savedPlayer.value.skills[2] || 0) * getMultiplier("skills0"), "de")))
    } as SkillDetail,
    4: {
        name: "smaller enemies",
        description: "enemies are smaller.",
        skillTreeId: 0,
        usedPointsNeed: 40,
        maxLvl: 20,
        multiplier: () => updateMultiplier("enemieSize", "skill4", computed(() => percent((savedPlayer.value.skills[3] || 0) * getMultiplier("skills5"), "de")))
    } as SkillDetail,
    5: {
        name: "big plasma",
        description: "plasma are bigger.",
        skillTreeId: 0,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("plasmaSize", "skill5", computed(() => percent((savedPlayer.value.skills[5] || 0) * getMultiplier("skills5"), "in")))
    } as SkillDetail,
    6: {
        name: "fast plasma",
        description: "plasma move faster.",
        skillTreeId: 0,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("plasmaSpeed", "skill6", computed(() => percent((savedPlayer.value.skills[6] || 0) * getMultiplier("skills5"), "in")))
    } as SkillDetail,
    7: {
        name: "strong plasma",
        description: "plasma makes more damage.",
        skillTreeId: 0,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("plasmaDamage", "skill7", computed(() => percent((savedPlayer.value.skills[7] || 0) * getMultiplier("skills5"), "in")))
    } as SkillDetail,
    100: {
        name: "plaid",
        description: "you move faster.",
        skillTreeId: 1,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("playerSpeed", "skill100", computed(() => percent((savedPlayer.value.skills[100] || 0) * getMultiplier("skills100"), "in")))
    } as SkillDetail,
    101: {
        name: "4680 battery",
        description: "increases the maximum energy.",
        skillTreeId: 1,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("playerEnergyMax", "skill101", computed(() => Math.round((savedPlayer.value.skills[101] || 0) * getMultiplier("skills100"))))
    } as SkillDetail,
    102: {
        name: "shrink ray",
        description: "makes you smaller.",
        skillTreeId: 1,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("playerSize", "skill102", computed(() => percent((savedPlayer.value.skills[102] || 0) * getMultiplier("skills100"), "de")))
    } as SkillDetail,
    103: {
        name: "overclocking",
        description: "reduces the cooldown of the ability.",
        skillTreeId: 1,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("abilityCooldown", "skill103", computed(() => percent((savedPlayer.value.skills[103] || 0) * getMultiplier("skills100"), "de")))
    } as SkillDetail,
    104: {
        name: "armor",
        description: "gives you more life.",
        skillTreeId: 1,
        usedPointsNeed: 40,
        maxLvl: 20,
        multiplier: () => updateMultiplier("playerHpMax", "skill104", computed(() => Math.round((savedPlayer.value.skills[104] || 0) * getMultiplier("skills100"))))
    } as SkillDetail,
    200: {
        name: "more items",
        description: "items spawn more often.",
        skillTreeId: 2,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("itemSpawn", "skill200", computed(() => percent((savedPlayer.value.skills[200] || 0) * getMultiplier("skills200"), "de")))
    } as SkillDetail,
    201: {
        name: "longer items",
        description: "it takes longer for items to despawn.",
        skillTreeId: 2,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("itemDespawn", "skill201", computed(() => percent((savedPlayer.value.skills[201] || 0) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    202: {
        name: "longer slow",
        description: "the slow effect lasts longer.",
        skillTreeId: 2,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("slowDuration", "skill202", computed(() => percent((savedPlayer.value.skills[202] || 0) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    203: {
        name: "longer speed",
        description: "the speed effect lasts longer.",
        skillTreeId: 2,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("speedDuration", "skill203", computed(() => percent((savedPlayer.value.skills[203] || 0) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    204: {
        name: "longer stun",
        description: "the stun effect lasts longer.",
        skillTreeId: 2,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("stunDuration", "skill204", computed(() => percent((savedPlayer.value.skills[204] || 0) * getMultiplier("skills200"), "in")))
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
        multiplier: () => updateMultiplier("slowStrength", "skill205", computed(() => percent((savedPlayer.value.skills[205] || 0) * getMultiplier("skills200"), "de")))
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
        multiplier: () => updateMultiplier("speedStrength", "skill206", computed(() => percent((savedPlayer.value.skills[206] || 0) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    300: {
        name: "discount",
        description: "reduces the scrap costs.",
        skillTreeId: 3,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("discount", "300", computed(() => percent((savedPlayer.value.skills[300] || 0) * getMultiplier("skills300"), "de")))
    } as SkillDetail,

    301: {
        name: "more xp",
        description: "you get more xp.",
        skillTreeId: 3,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("xp", "302", computed(() => percent((savedPlayer.value.skills[302] || 0) * getMultiplier("skills300"), "in")))
    } as SkillDetail,
    302: {
        name: "more scrap",
        description: "you get more scrap.",
        skillTreeId: 3,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("currency", "301", computed(() => percent((savedPlayer.value.skills[301] || 0) * getMultiplier("skills300"), "in")))
    } as SkillDetail,
    303: {
        name: "four-leaf clover",
        description: "you get more and better artefacts",
        skillTreeId: 3,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("artefactChance", "303", computed(() => percent((savedPlayer.value.skills[303] || 0) * getMultiplier("skills300"), "in")))
    } as SkillDetail,
    304: {
        name: "more power crystals",
        description: "you get more and better power crystals.",
        skillTreeId: 3,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("powerCrystalChance", "304", computed(() => percent((savedPlayer.value.skills[304] || 0) * getMultiplier("skills300"), "in")))
    } as SkillDetail,
})
export function skillMultiplier() {
    Object.values(details.value).forEach(e => e.multiplier())
}


export function getPoints() {
    lvlMultiplier()
    for (const e of [["kills", 2, 0], ["move", 3000, 1], ["collect", 2, 2], ["time", 10, 3]] as const) {
        const actionValue = Math.round(actionsPlayer.value[e[0]] * getMultiplier(`tree${e[2]}`) / e[1])
        if (actionValue > (savedPlayer.value.points[e[2]] || 0)) {
            const points = actionValue - (savedPlayer.value.points[e[2]] || 0)
            updateInfo(`tree${e[2]}`, `you got ${points} point${points > 1 ? 's' : ''} for the "${skillTrees.value[e[2]].name}" tree.`)
            savedPlayer.value.points[e[2]] = actionValue
        }
    }
}