import { ref } from "vue";
import { Artefact } from "../types";
import { gameloopTicks } from "./game";
import { createId, getRandomInt, percent, secondsToTicks } from "./generel/helpers";
import { multiplier, updateMultiplier } from "./multiplier";
import { savedPlayer } from "./player";
export const artefactInfo = ref("")
const statText = {
    enemySpawnTime: "new enemies spawn",
    enemySpeedTime: "enemies become faster",
    enemyHpTime: "enemies get more hp",
    enemySpecialTime: " enemies have more powerful special effects",
    enemyDamageTime: "enemies do more damage"
}
export function getArtefact() {
    if (Object.keys(savedPlayer.value.artefacts.owned).length >= 5) return
    let amountBuffs = 1
    if (getProbability(3) > Math.random()) {
        for (let i = 1; i < 5; i++) {
            if ((savedPlayer.value.lvl.lvl + 1) / 10 > amountBuffs) {
                if (getProbability(3 + i) > Math.random())
                    amountBuffs++
                else break
            } else break
        }
        let buffs = Object.keys(statText) as [keyof Artefact]
        const artefact = {} as Artefact
        for (let i = 0; i < amountBuffs; i++) {
            artefact[buffs.splice(getRandomInt(buffs.length), 1)[0]] = getRandomInt(savedPlayer.value.lvl.lvl + 1) + savedPlayer.value.lvl.lvl + 1
        }
        artefactInfo.value = `you got a ${Object.keys(artefact).length} star artefact`
        savedPlayer.value.artefacts.owned[createId()] = artefact
    }
}
export function resetArtefactInfo() {
    artefactInfo.value = ""
}

export function getArtefactMultiplier() {
    for (let e of Object.keys(statText)) delete multiplier.value[e]?.artefact
    if (savedPlayer.value.artefacts.selected == 0) return
    for (let e of Object.entries(savedPlayer.value.artefacts.owned[savedPlayer.value.artefacts.selected]))
        updateMultiplier(e[0], "artefact", percent(e[1], "in"))
}
function getProbability(minute: number) {
    return gameloopTicks.value / secondsToTicks(minute * 60)
}
export function showStat(id: number, stat: keyof Artefact) {
    return `increase the time until ${statText[stat]} by ${savedPlayer.value.artefacts.owned[id][stat]}%`
}
