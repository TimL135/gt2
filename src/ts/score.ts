import { computed, ref } from "vue";
import { savedPlayer } from "./player";
import { updateMultiplier } from "./multiplier";

export const scoreLvl = ref(0)

function updateScoreLvl() {
    scoreLvl.value = Math.floor(savedPlayer.value.score.highScore / 1000)
}
export function getScoreMultiplier() {
    updateScoreLvl()
    updateMultiplier("discount", "score", computed(() => scoreLvl.value))
}