import { computed } from "vue";
import { Artefact, PowerCrystal } from "../types";
import { gameloopTicks } from "./game";
import { createId, getRandomInt, percent, secondsToTicks } from "./generel/helpers";
import { getMultiplier, multiplier, updateMultiplier } from "./multiplier";
import { actions, savedPlayer } from "./player";
import { updateInfo } from "./info";
const statTextArtefact = {
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
export function getArtefact() {
    if (Object.keys(savedPlayer.value.artefacts.owned).length >= 5) return
    let amountBuffs = 1
    if (getProbability(4, "artefact") > Math.random()) {
        for (let i = 1; i < 5; i++) {
            if ((savedPlayer.value.lvl.lvl + 1) / 10 > amountBuffs) {
                if (getProbability(4 + (i * 2), "artefact") > Math.random())
                    amountBuffs++
                else break
            } else break
        }
        let buffs = Object.keys(statTextArtefact) as [keyof Artefact]
        const artefact = {} as Artefact
        for (let i = 0; i < amountBuffs; i++) {
            if (buffs.length)
                artefact[buffs.splice(getRandomInt(buffs.length), 1)[0]] = getRandomInt(savedPlayer.value.lvl.lvl + 1) + savedPlayer.value.lvl.lvl + 1
        }
        updateInfo("artefact", `you got a ${Object.keys(artefact).length} star "time crystal"`)
        savedPlayer.value.artefacts.owned[createId()] = artefact
    }
}
export function getPowerCrystal() {
    if (Object.keys(savedPlayer.value.powerCrystal.owned).length >= 5) return
    let amountBuffs = 1
    if (getProbability(3, "powerCrystal") > Math.random()) {
        for (let i = 1; i < 4; i++) {
            if ((savedPlayer.value.lvl.lvl + 1) / 10 > amountBuffs) {
                if (getProbability(3 + (i * 2), "powerCrystal") > Math.random())
                    amountBuffs++
                else break
            } else break
        }
        let buffs = Object.keys(statTextPowerCrystal) as [keyof PowerCrystal]
        const powerCrystal = {} as PowerCrystal
        for (let i = 0; i < amountBuffs; i++) {
            if (buffs.length)
                powerCrystal[buffs.splice(getRandomInt(buffs.length), 1)[0]] = getRandomInt(savedPlayer.value.lvl.lvl + 1) + savedPlayer.value.lvl.lvl + 1
        }
        updateInfo("powerCrystal", `you got a ${Object.keys(powerCrystal).length} star "power crystal"`)
        savedPlayer.value.powerCrystal.owned[createId()] = powerCrystal
    }
}

export function getArtefactMultiplier() {
    for (let e of Object.keys(statTextArtefact)) delete multiplier[e]?.artefact
    for (let e of Object.keys(statTextPowerCrystal)) delete multiplier[e]?.powerCrystal
    if (savedPlayer.value.artefacts.selected == 0) return
    for (let e of Object.entries(savedPlayer.value.artefacts.owned[savedPlayer.value.artefacts.selected]))
        updateMultiplier(e[0], "artefact", computed(() => percent(e[1], "in")))
    if (savedPlayer.value.powerCrystal.selected == 0) return
    for (let e of Object.entries(savedPlayer.value.powerCrystal.owned[savedPlayer.value.powerCrystal.selected]))
        updateMultiplier(e[0], "powerCrystal", computed(() => percent(e[1], "de")))
}
function getProbability(minute: number, type: "artefact" | "powerCrystal") {
    if (type == "artefact")
        return (gameloopTicks.value / secondsToTicks(minute * 60)) * getMultiplier("artefactChance")
    if (type == "powerCrystal")
        return (actions.value.xp / (minute * 50)) * getMultiplier("powerCrystalChance")
    return 0
}
export function showStat(id: number, stat: keyof Artefact) {
    return `increase the time until ${statTextArtefact[stat]} by ${savedPlayer.value.artefacts.owned[id][stat]}%`
}
export function showStatTimeCrystal(id: number, stat: keyof PowerCrystal) {
    return `reduces enemies ${statTextPowerCrystal[stat]} increase by ${Math.round(percent(savedPlayer.value.powerCrystal.owned[id][stat], "de"))}%`
}
