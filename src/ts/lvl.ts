import { maxLvl, xpNeed } from "./generel/config";
import { percent } from "./generel/helpers";
import { updateMultiplier } from "./multiplier";
import { actions, savedPlayer } from "./player";
import { skillTrees } from "./skills";

export let xpInfo = ""
export function getXp() {
    if (savedPlayer.value.lvl.lvl == maxLvl) return

    const xp = Object.entries(actions.value).reduce((a, b) => {
        if (b[0] == 'deathEnemies') return a + b[1] * 1
        if (b[0] == 'kills') return a + b[1] * 5
        if (b[0] == 'collect') return a + b[1] * 10
        return a
    }, 0)
    if (xp > 0) xpInfo = `you got ${xp} xp`
    else xpInfo = ""
    savedPlayer.value.lvl.xp += xp
    increaseLvl()
}
export let lvlInfo = ""
export function increaseLvl() {
    let increasedLvl = 0
    while (savedPlayer.value.lvl.xp > xpNeed * (savedPlayer.value.lvl.lvl + 1) && savedPlayer.value.lvl.lvl < maxLvl) {
        savedPlayer.value.lvl.xp -= xpNeed * (savedPlayer.value.lvl.lvl + 1)
        savedPlayer.value.lvl.lvl++
        increasedLvl++
    }
    if (increasedLvl > 0) lvlInfo = `you got ${increasedLvl} lvl`
    else lvlInfo = ""
    if (savedPlayer.value.lvl.lvl == maxLvl) savedPlayer.value.lvl.xp = 0
}
export function lvlMultiplier() {
    skillTrees.value.forEach(e => updateMultiplier(`tree${e.id}`, 'playerLvl', percent(savedPlayer.value.lvl.lvl, "in")))
}
export function resetInfo() {
    xpInfo = ""
    lvlInfo = ""
}