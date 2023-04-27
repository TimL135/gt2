import { computed, ref } from "vue";
import { savedPlayer } from "./player";
import { updateMultiplier } from "./multiplier";
import { percent } from "./generel/helpers";

export const scoreLvl = ref(0)

function updateScoreLvl() {
    scoreLvl.value = Math.floor(savedPlayer.value.score.highScore / 500)
}
export function getScoreMultiplier() {
    updateScoreLvl()
    updateMultiplier("discount", "score", computed(() => percent(scoreLvl.value, "de")))
}