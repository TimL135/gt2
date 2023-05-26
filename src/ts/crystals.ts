import { computed } from "vue";
import { TimeCrystal, PowerCrystal } from "../types";
import { gameloopTicks } from "./game";
import { createId, getRandomInt, percent, secondsToTicks } from "./generel/helpers";
import { getMultiplier, multiplier, updateMultiplier } from "./multiplier";
import { actions, savedPlayer } from "./player";
import { updateInfo } from "./info";
const statTextTimeCrystal = {
    enemieSpawnTime: "new enemies spawn",
    enemieSpeedTime: "enemies become faster",
    enemieHpTime: "enemies get more hp",
    enemieSpecialTime: " enemies have more powerful special effects",
    enemieDamageTime: "enemies do more damage"
}
const statTextPowerCrystal = {
    enemieSpeedPower: "speed",
    enemieHpPower: "hp",
    enemieSpecialPower: "special effects",
    enemieDamagePower: "damage"
}
export function getCrystal(type: "time" | "power") {
    type CrystalType = `${typeof type}Crystal`
    const crystalType = type + "Crystal" as CrystalType
    const savedCrystal = savedPlayer.value[crystalType]
    const statText = type === "time" ? statTextTimeCrystal : statTextPowerCrystal
    const probability = type === "time" ? 4 : 3
    const maxBuffs = type === "time" ? 5 : 4
    if (Object.keys(savedCrystal.owned).length >= 5) return
    let amountBuffs = 1
    if (getProbability(probability, crystalType) > Math.random()) {
        for (let i = 1; i < maxBuffs; i++) {
            if ((savedPlayer.value.lvl.lvl + 1) / 10 > amountBuffs) {
                if (getProbability(probability + (i * 2), crystalType) > Math.random())
                    amountBuffs++
                else break
            } else break
        }
        let buffs = Object.keys(statText) as [keyof TimeCrystal | keyof PowerCrystal]
        const crystal = {} as { [key in keyof TimeCrystal | keyof PowerCrystal]: number }
        for (let i = 0; i < amountBuffs; i++) {
            if (buffs.length)
                crystal[buffs.splice(getRandomInt(buffs.length), 1)[0]] = getRandomInt(savedPlayer.value.lvl.lvl + 1) + savedPlayer.value.lvl.lvl + 1
        }
        updateInfo(type + "Crystal", `you got a ${Object.keys(crystal).length} star "${type} crystal"`)
        savedCrystal.owned[createId()] = crystal
    }
}

export function getCrystalMultiplier() {
    for (let e of Object.keys(statTextTimeCrystal)) delete multiplier[e]?.TimeCrystal
    for (let e of Object.keys(statTextPowerCrystal)) delete multiplier[e]?.powerCrystal
    if (savedPlayer.value.timeCrystal.selected == 0) return
    for (let e of Object.entries(savedPlayer.value.timeCrystal.owned[savedPlayer.value.timeCrystal.selected]))
        updateMultiplier(e[0], "TimeCrystal", computed(() => percent(e[1], "in")))
    if (savedPlayer.value.powerCrystal.selected == 0) return
    for (let e of Object.entries(savedPlayer.value.powerCrystal.owned[savedPlayer.value.powerCrystal.selected]))
        updateMultiplier(e[0], "powerCrystal", computed(() => percent(e[1], "de")))
}
function getProbability(minute: number, type: "timeCrystal" | "powerCrystal") {
    if (type == "timeCrystal")
        return (gameloopTicks.value / secondsToTicks(minute * 60)) * getMultiplier("timeCrystalChance")
    if (type == "powerCrystal")
        return (actions.value.xp / (minute * 50)) * getMultiplier("powerCrystalChance")
    return 0
}

export function showStatCrystal(id: number, stat: keyof PowerCrystal | keyof TimeCrystal, crystalType: string) {
    if (crystalType == "powerCrystal")
        return `reduces enemies ${statTextPowerCrystal[stat as keyof PowerCrystal]} increase by ${Math.round((1 - percent(savedPlayer.value.powerCrystal.owned[id][stat as keyof PowerCrystal], "de")) * 100)}%`
    if (crystalType == "timeCrystal")
        return `increase the time until ${statTextTimeCrystal[stat as keyof TimeCrystal]} by ${savedPlayer.value.timeCrystal.owned[id][stat as keyof TimeCrystal]}%`
}
