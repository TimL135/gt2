import { computed, ref } from "vue";
import { savedPlayer, actions } from "./player";
import { updateMultiplier } from "./multiplier";
import { percent } from "./generel/helpers";
import { honorNeed } from "./generel/config";
import { updateInfo } from "./info";

export const scoreLvl = computed(() => Math.floor(savedPlayer.value.score.highScore / honorNeed))

export function getScoreMultiplier() {
    updateMultiplier("discount", "score", computed(() => percent(scoreLvl.value, "de")))
}
export function getScore() {
    let score = Math.round(Object.entries(actions.value).reduce((a, b) => {
        if (b[0] == "time") return a + b[1] * 2
        if (b[0] == 'deathEnemies') return a + b[1] * 5
        if (b[0] == 'collect') return a + b[1] * 10
        if (b[0] == 'kills') return a + b[1] * 12
        return a
    }, 0) * percent(savedPlayer.value.lvl.lvl, "in"))
    if (score > savedPlayer.value.score.highScore) {
        let newHighScore = score
        updateInfo("honor", `you now have ${newHighScore} honor`)
        savedPlayer.value.score.highScore = newHighScore
    }
}