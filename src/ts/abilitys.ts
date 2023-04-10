import { ref } from "vue";
import { increaseEffectDuration, player } from "./player";
import { AbilityDetails } from "../types";
import { secondsToTicks } from "./helpers";

export const details = ref({
    0: {
        name: "slow",
        description: "",
        cooldown: secondsToTicks(5),
        effect: () => { increaseEffectDuration(0, 2) },
        condition: () => true,
        energyCost: 1
    },
    1: {
        name: "speed",
        description: "",
        cooldown: secondsToTicks(5),
        effect: () => { increaseEffectDuration(1, 2) },
        condition: () => true,
        energyCost: 1
    },
    2: {
        name: "stun",
        description: "",
        cooldown: secondsToTicks(5),
        effect: () => { increaseEffectDuration(2, 0.5) },
        condition: () => true,
        energyCost: 1
    },
    3: {
        name: "heal",
        description: "",
        cooldown: secondsToTicks(5),
        effect: () => { player.value.hp += 1 },
        condition: () => player.value.hp < player.value.hpMax,
        energyCost: 1
    }
} as AbilityDetails)