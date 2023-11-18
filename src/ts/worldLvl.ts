import { computed, ref } from "vue";
import { savedPlayer } from "./player";
export const worldPointsNeed = computed(() => (savedPlayer.value.world.lvl + 1) * 75)
export const worldPoints = ref(0)