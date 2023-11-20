import { computed, ref } from "vue";
import { SkillDetail, SkillDetails } from "../types";
import { actions as actionsPlayer, savedPlayer } from './player';
import { percent } from "./generel/helpers";
import { updateMultiplier, getMultiplier } from "./multiplier";
import { lvlMultiplier } from "./lvl";
import { updateInfo } from "./info";

export const skillTrees = ref([
    {
        name: "fight",
        id: 0,
        getPointsInfo: "get points by killing enemies."
    },
    {
        name: "space ship",
        id: 1,
        getPointsInfo: "get points by move."
    },
    {
        name: "collect",
        id: 2,
        getPointsInfo: "get points by collecting items."
    },
    {
        name: "generell",
        id: 3,
        getPointsInfo: "get points by living long."
    }
])
export const details = ref({

    0: {
        name: "super charger",
        description: "increases the energy production.",
        deatils: "multiplies the charging time by.",
        skillTreeId: 0,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("chargeSpeed", "skill0", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[0] || 0) + lvlIncrease) * getMultiplier("skills0"), "de")))
    } as SkillDetail,
    1: {
        name: "reload automatic",
        description: "increases the reloading speed.",
        deatils: "multiplies the reloading time by.",
        skillTreeId: 0,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("reloadSpeed", "skill1", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[1] || 0) + lvlIncrease) * getMultiplier("skills0"), "de")))
    } as SkillDetail,
    3: {
        name: "slow enemies",
        description: "enemies move slower.",
        deatils: "multiplies the speed by.",
        skillTreeId: 0,
        usedPointsNeed: 40,
        maxLvl: 20,
        multiplier: () => updateMultiplier("enemieSpeed", "skill3", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[2] || 0) + lvlIncrease) * getMultiplier("skills0"), "de")))
    } as SkillDetail,
    4: {
        name: "smaller enemies",
        description: "enemies are smaller.",
        deatils: "multiplies the size by.",
        skillTreeId: 0,
        usedPointsNeed: 40,
        maxLvl: 20,
        multiplier: () => updateMultiplier("enemieSize", "skill4", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[3] || 0) + lvlIncrease) * getMultiplier("skills5"), "de")))
    } as SkillDetail,
    5: {
        name: "big plasma",
        description: "plasma are bigger.",
        deatils: "multiplies the size by.",
        skillTreeId: 0,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("plasmaSize", "skill5", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[5] || 0) + lvlIncrease) * getMultiplier("skills5"), "in")))
    } as SkillDetail,
    6: {
        name: "fast plasma",
        description: "plasma move faster.",
        deatils: "multiplies the speed by.",
        skillTreeId: 0,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("plasmaSpeed", "skill6", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[6] || 0) + lvlIncrease) * getMultiplier("skills5"), "in")))
    } as SkillDetail,
    7: {
        name: "strong plasma",
        description: "plasma makes more damage.",
        deatils: "multiplies the damage by.",
        skillTreeId: 0,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("plasmaDamage", "skill7", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[7] || 0) + lvlIncrease) * getMultiplier("skills5"), "in")))
    } as SkillDetail,
    100: {
        name: "plaid",
        description: "you move faster.",
        deatils: "multiplies the speed by.",
        skillTreeId: 1,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("playerSpeed", "skill100", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[100] || 0) + lvlIncrease) * getMultiplier("skills100"), "in")))
    } as SkillDetail,
    101: {
        name: "4680 battery",
        description: "increases the maximum energy.",
        deatils: "increases the energy maximum by.",
        skillTreeId: 1,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("playerEnergyMax", "skill101", computed((lvlIncrease = 0) => Math.round(((savedPlayer.value.skills[101] || 0) + lvlIncrease) * getMultiplier("skills100"))))
    } as SkillDetail,
    102: {
        name: "shrink ray",
        description: "makes you smaller.",
        deatils: "multiplies the size by.",
        skillTreeId: 1,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("playerSize", "skill102", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[102] || 0) + lvlIncrease) * getMultiplier("skills100"), "de")))
    } as SkillDetail,
    103: {
        name: "overclocking",
        description: "reduces the cooldown of the ability.",
        deatils: "multiplies the cooldown by.",
        skillTreeId: 1,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("abilityCooldown", "skill103", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[103] || 0) + lvlIncrease) * getMultiplier("skills100"), "de")))
    } as SkillDetail,
    104: {
        name: "health points",
        description: "gives you more life.",
        deatils: "increases the maximum life by.",
        skillTreeId: 1,
        usedPointsNeed: 40,
        maxLvl: 20,
        multiplier: () => updateMultiplier("playerHpMax", "skill104", computed((lvlIncrease = 0) => Math.round(((savedPlayer.value.skills[104] || 0) + lvlIncrease) * getMultiplier("skills100"))))
    } as SkillDetail,
    105: {
        name: "armor",
        description: "you get less damage.",
        deatils: "multiplied the preserving damage with.",
        skillTreeId: 1,
        usedPointsNeed: 40,
        maxLvl: 20,
        multiplier: () => updateMultiplier("playerGetDamage", "skill105", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[105] || 0) + lvlIncrease) * getMultiplier("skills100"), "de")))
    } as SkillDetail,
    200: {
        name: "more items",
        description: "items spawn more often.",
        deatils: "multiplies the spawn rate by.",
        skillTreeId: 2,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("itemSpawn", "skill200", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[200] || 0) + lvlIncrease) * getMultiplier("skills200"), "de")))
    } as SkillDetail,
    201: {
        name: "longer items",
        description: "it takes longer for items to despawn.",
        deatils: "multiplies the time until respawn by.",
        skillTreeId: 2,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("itemDespawn", "skill201", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[201] || 0) + lvlIncrease) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    202: {
        name: "longer slow",
        description: "the slow effect lasts longer.",
        deatils: "multiplies the effect time by.",
        skillTreeId: 2,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("slowDuration", "skill202", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[202] || 0) + lvlIncrease) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    203: {
        name: "longer speed",
        description: "the speed effect lasts longer.",
        deatils: "multiplies the effect time by.",
        skillTreeId: 2,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("speedDuration", "skill203", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[203] || 0) + lvlIncrease) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    204: {
        name: "longer stun",
        description: "the stun effect lasts longer.",
        deatils: "multiplies the effect time by.",
        skillTreeId: 2,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("stunDuration", "skill204", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[204] || 0) + lvlIncrease) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    205: {
        name: "stronger slow",
        description: "the slow effect is stronger.",
        deatils: "multiplies the slow effect by.",
        skillTreeId: 2,
        usedPointsNeed: 40,
        required: {
            skillId: 202,
            skillLvl: 20
        },
        maxLvl: 20,
        multiplier: () => updateMultiplier("slowStrength", "skill205", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[205] || 0) + lvlIncrease) * getMultiplier("skills200"), "de")))
    } as SkillDetail,
    206: {
        name: "stronger speed",
        description: "the speed effect is stronger.",
        deatils: "multiplies the speed effect by.",
        skillTreeId: 2,
        usedPointsNeed: 40,
        required: {
            skillId: 203,
            skillLvl: 20
        },
        maxLvl: 20,
        multiplier: () => updateMultiplier("speedStrength", "skill206", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[206] || 0) + lvlIncrease) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    207: {
        name: "stronger shield",
        description: "the shield effect is stronger.",
        deatils: "multiplies the shield effect by.",
        skillTreeId: 2,
        usedPointsNeed: 40,
        required: {
            skillId: 203,
            skillLvl: 20
        },
        maxLvl: 20,
        multiplier: () => updateMultiplier("shieldStrength", "skill207", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[207] || 0) + lvlIncrease) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    208: {
        name: "longer shield",
        description: "the shield effect lasts longer.",
        deatils: "multiplies the effect time by.",
        skillTreeId: 2,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("shieldDuration", "skill208", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[208] || 0) + lvlIncrease) * getMultiplier("skills200"), "in")))
    } as SkillDetail,
    300: {
        name: "more scrap",
        description: "you get more scrap.",
        deatils: "multiplies the scrap by.",
        skillTreeId: 3,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("currency", "300", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[300] || 0) + lvlIncrease) * getMultiplier("skills300"), "in")))
    } as SkillDetail,

    301: {
        name: "more xp",
        description: "you get more xp.",
        deatils: "multiplies the xp by",
        skillTreeId: 3,
        usedPointsNeed: 0,
        maxLvl: 20,
        multiplier: () => updateMultiplier("xp", "301", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[301] || 0) + lvlIncrease) * getMultiplier("skills300"), "in")))
    } as SkillDetail,
    303: {
        name: "four-leaf clover",
        description: "you get more and better time crystals.",
        deatils: "multiplies the time crystal chance by.",
        skillTreeId: 3,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("timeCrystalChance", "303", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[303] || 0) + lvlIncrease) * getMultiplier("skills300"), "in")))
    } as SkillDetail,
    304: {
        name: "more power crystals",
        description: "you get more and better power crystals.",
        deatils: "multiplies the power crystal chance by.",
        skillTreeId: 3,
        usedPointsNeed: 20,
        maxLvl: 20,
        multiplier: () => updateMultiplier("powerCrystalChance", "304", computed((lvlIncrease = 0) => percent(((savedPlayer.value.skills[304] || 0) + lvlIncrease) * getMultiplier("skills300"), "in")))
    } as SkillDetail,
} as SkillDetails)
export function skillMultiplier() {
    Object.values(details.value).forEach(e => e.multiplier())
}


export function getPoints() {
    lvlMultiplier()
    for (const e of [["kills", 1.5, 0], ["move", 2500, 1], ["collect", 1.5, 2], ["time", 8, 3]] as const) {
        const actionValue = Math.round(actionsPlayer.value[e[0]] * getMultiplier(`tree${e[2]}`) / e[1])
        if (actionValue > (savedPlayer.value.points[e[2]] || 0)) {
            const points = actionValue - (savedPlayer.value.points[e[2]] || 0)
            updateInfo(`tree${e[2]}`, `you got ${points} point${points > 1 ? 's' : ''} for the "${skillTrees.value[e[2]].name}" tree.`)
            savedPlayer.value.points[e[2]] = actionValue
        }
    }
}