import { computed } from "vue";
import { maxLvl, xpNeed } from "./generel/config";
import { percent } from "./generel/helpers";
import { getMultiplier, updateMultiplier } from "./multiplier";
import { actions, savedPlayer } from "./player";
import { skillTrees } from "./skills";
import { updateInfo } from "./info";

export function getXp() {
    if (savedPlayer.value.lvl.lvl == maxLvl) return

    const xp = Object.entries(actions.value).reduce((a, b) => {
        if (b[0] == 'deathEnemies') return a + b[1] * 1
        if (b[0] == 'collect') return a + b[1] * 5
        if (b[0] == 'kills') return a + b[1] * 10
        return a
    }, 0) * getMultiplier("xp")
    if (xp > 0) updateInfo("xp", `you got ${xp} xp`)
    savedPlayer.value.lvl.xp += xp
    increaseLvl()
}
export function increaseLvl() {
    let increasedLvl = 0
    while (savedPlayer.value.lvl.xp > xpNeed * (savedPlayer.value.lvl.lvl + 1) && savedPlayer.value.lvl.lvl < maxLvl) {
        savedPlayer.value.lvl.xp -= xpNeed * (savedPlayer.value.lvl.lvl + 1)
        savedPlayer.value.lvl.lvl++
        increasedLvl++
    }
    if (increasedLvl > 0) updateInfo("lvl", `you got ${increasedLvl} lvl`)
    if (savedPlayer.value.lvl.lvl == maxLvl) savedPlayer.value.lvl.xp = 0
}
export function lvlMultiplier() {
    skillTrees.value.forEach(e => updateMultiplier(`tree${e.id}`, 'playerLvl', computed(() => percent(savedPlayer.value.lvl.lvl, "in"))))
}
