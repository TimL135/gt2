import { computed, ref } from "vue";
import { savedPlayer } from "./player";
import { updateMultiplier } from "./multiplier";

export const scoreLvl = ref(Math.floor(savedPlayer.value.score.highScore / 1000))

export function updateScoreLvl() {
    scoreLvl.value = Math.floor(savedPlayer.value.score.highScore / 1000)
}
export function getScoreMultiplier() {
    updateMultiplier("discount", "score", computed(() => scoreLvl.value))
}