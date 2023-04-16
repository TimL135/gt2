import { ref } from "vue";
import { increaseEffectDuration, player } from "./player";
import { plasmas } from "./plasma";
import { percent } from "./generel/helpers";
import { collisionsCheck } from "./colliosion";
import { collectItem, items } from "./items";
import { updateMultiplier } from "./multiplier";

export const details = ref<{ [key: number]: { name: string; description: string; effect: (e?: any) => any } }>({
    0: {
        name: "none",
        description: "",
        effect: () => { }
    },
    1: {
        name: "magnetic plasma",
        description: "your plasma can collect items.",
        effect: () => {
            for (const plasma of plasmas.value) {
                for (const item of items.value) {
                    if (collisionsCheck(plasma, item)) collectItem(item)
                }
            }
        }
    },
    2: {
        name: "generator",
        description: "you generate energy when you move.",
        effect: (charge: number) => {
            charge += player.value.speed
            if (charge > 1000 && player.value.energy < player.value.energyMax) {
                player.value.energy++
                charge = 0
            }
            return charge
        }
    },
    3: {
        name: "energy explosion",
        description: "enemies are stunted when the energy is recharged.",
        effect: () => {
            increaseEffectDuration(2, 1.5)
        }
    },
    4: {
        name: "reflector shields",
        description: "you are briefly invincible after a hit.",
        effect: () => {
            player.value.invincible = true
            setTimeout(() => {
                player.value.invincible = false
            }, 1000)
        }
    },
    5: {
        name: "fear rabbit",
        description: "you become smaller and faster with low life",
        effect: () => {
            updateMultiplier("playerSize", "passiv5", (percent((100 - (player.value.hp / player.value.hpMax) * 100), "de")))
            updateMultiplier("playerSpeed", "passiv5", (percent((100 - (player.value.hp / player.value.hpMax) * 100), "in")))
        }
    },
})