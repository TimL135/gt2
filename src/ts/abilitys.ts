import { ref } from "vue";
import { increaseEffectDuration, player, savedPlayer } from "./player";
import { AbilityDetails } from "../types";
import { secondsToTicks } from "./helpers";
import { updateMultiplier } from "./multiplier";
import { details as detailsWeapon } from "./weapon";

export const details = ref({
    0: {
        name: "slow",
        description: "gives the slow effect.",
        cooldown: secondsToTicks(5),
        effect: () => { increaseEffectDuration(0, 2) },
        condition: () => true,
        energyCost: 1
    },
    1: {
        name: "speed",
        description: "gives the speed effect.",
        cooldown: secondsToTicks(5),
        effect: () => { increaseEffectDuration(1, 2) },
        condition: () => true,
        energyCost: 1
    },
    2: {
        name: "stun",
        description: "gives the stun effect.",
        cooldown: secondsToTicks(5),
        effect: () => { increaseEffectDuration(2, 0.5) },
        condition: () => true,
        energyCost: 1
    },
    3: {
        name: "heal",
        description: "heals you.",
        cooldown: secondsToTicks(5),
        effect: () => { player.value.hp += 1 },
        condition: () => player.value.hp < player.value.hpMax,
        energyCost: 1
    },
    4: {
        name: "wormhole",
        description: "makes you faster and invulnerable for a short time.",
        cooldown: secondsToTicks(10),
        effect: () => {
            player.value.invincible = true
            updateMultiplier("playerSpeed", "ability4", 2)
            setTimeout(() => {
                player.value.invincible = false
                updateMultiplier("playerSpeed", "ability4", 1)
            }, 1000)
        },
        condition: () => true,
        energyCost: 1
    },
    5: {
        name: "plasma hail",
        description: "you shoot in all directions.",
        cooldown: secondsToTicks(10),
        effect: () => {
            const direction = player.value.direction
            for (let i = 0; i < 8; i++) {
                player.value.direction = 45 * i
                detailsWeapon.value[savedPlayer.value.weapons.selected].shot()
            }
            player.value.direction = direction
        },
        condition: () => true,
        energyCost: 1
    },
    6: {
        name: "time machine",
        description: "reduces the cooldown of your skills.",
        cooldown: secondsToTicks(10),
        effect: () => {
            Object.keys(player.value.cooldowns).forEach(e => {
                player.value.cooldowns[e] -= secondsToTicks(5)
                if (player.value.cooldowns[e] < 0) player.value.cooldowns[e] = 0
            })
        },
        condition: () => true,
        energyCost: 1
    },
    7: {
        name: "repair work",
        description: "restores life, is canceled as soon as your life is full or you move.",
        cooldown: secondsToTicks(15),
        effect: () => {
            const cords = { ...player.value.cords }
            const interval = setInterval(() => {
                if (player.value.hp >= player.value.hpMax
                    || cords.x != player.value.cords.x
                    || cords.y != player.value.cords.y) {
                    clearInterval(interval)
                    return
                }
                player.value.hp++
            }, 500)
        },
        condition: () => player.value.hp < player.value.hpMax,
        energyCost: 1
    }
} as AbilityDetails)