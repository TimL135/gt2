import { computed, ref } from "vue";
import { Item, ItemdDetails } from "../types";
import { getRandomInt } from './generel/helpers';
import { field } from "./game";
import { secondsToTicks } from "./generel/helpers";
import { increaseEffectDuration, player, actions as actionsPlayer, healPlayer } from "./player";
import { defaultGameObject } from "./gameObject";
import { getMultiplier, updateMultiplier } from "./multiplier";
import { playSound } from "./generel/sounds";

export const items = ref<Item[]>([])
export const details = ref<ItemdDetails>({
    0: {
        name: "slow",
        img: 'slow',
        effect: () => increaseEffectDuration(0, 2 * getMultiplier("slowDuration")),
        multiplier: () => updateMultiplier("enemieSpeed", "item0", computed(() => player.value.effects[0] ? 0.5 * getMultiplier("slowStrength") : 1))
    },
    1: {
        name: "speed",
        img: "speed",
        effect: () => increaseEffectDuration(1, 2 * getMultiplier("speedDuration")),
        multiplier: () => updateMultiplier("playerSpeed", "item1", computed(() => player.value.effects[1] ? 1.5 * getMultiplier("speedStrength") : 1))
    },
    2: {
        name: "stun",
        img: "stun",
        effect: () => increaseEffectDuration(2, 1 * getMultiplier("stunDuration")),
        multiplier: () => updateMultiplier("enemieSpeed", "item2", computed(() => player.value.effects[2] ? 0 : 1))
    },
    3: {
        name: "shield",
        img: "shield",
        effect: () => increaseEffectDuration(3, 2 * getMultiplier("shieldDuration")),
        multiplier: () => updateMultiplier("playerGetDamage", "item3", computed(() => player.value.effects[3] ? 0.75 * getMultiplier("shieldStrength") : 1))
    },
    4: {
        name: "heal",
        img: "heal",
        effect: () => { healPlayer(1) },
        multiplier: () => 1
    },


})
export function itemMultiplier() {
    Object.values(details.value).forEach(e => e.multiplier())
}
export function spawn(cords?: { x: number, y: number }) {
    const item = {
        ...defaultGameObject(),
        lifeDuration: secondsToTicks(5 * getMultiplier("itemDespawn")),
        ...details.value[getRandomInt(Object.values(details.value).length)]
    }
    item.size *= getMultiplier("itemSize")
    if (cords) item.cords = cords
    else for (const e of ["x", "y"] as const) item.cords[e] = getRandomInt(field.value.size[e] - item.size)
    items.value.push(item)
}

export function decreaseLifeDuration() {
    items.value.forEach(item => {
        item.lifeDuration -= +!!item.lifeDuration
        if (!item.lifeDuration) deleteItem(item)
    })
}

export function collectItem(item: Item) {
    actionsPlayer.value["collect"] = (actionsPlayer.value["collect"] || 0) + 1
    item.effect()
    playSound("powerUp")
    deleteItem(item)
}

export function clear() {
    items.value = []
}

export function deleteItem(item: Item) {
    items.value = items.value.filter(i => i.id != item.id)
}
