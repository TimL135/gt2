import { ref } from "vue";
import { Item, ItemdDetails } from "../types";
import { getRandomInt } from './helpers';
import { field } from "./game";
import { secondsToTicks } from "./helpers";
import { increaseEffectDuration, player, actions as actionsPlayer, savedPlayer } from "./player";
import { defaultGameObject } from "./gameObject";
import { details as detailsSkill } from "./skills";

export const items = ref<Item[]>([])
export const details = ref<ItemdDetails>({
    0: {
        name: "slow",
        img: 'slow',
        effect: () => increaseEffectDuration(0, 2 * detailsSkill.value[202].multiplier(savedPlayer.value.skills[202])),
        multiplier: () => player.value.effects[0] ? 0.5 : 1
    },
    1: {
        name: "speed",
        img: "speed",
        effect: () => increaseEffectDuration(1, 2 * detailsSkill.value[203].multiplier(savedPlayer.value.skills[203])),
        multiplier: () => player.value.effects[1] ? 2 : 1
    },
    2: {
        name: "stun",
        img: "stun",
        effect: () => increaseEffectDuration(2, 0.5 * detailsSkill.value[204].multiplier(savedPlayer.value.skills[204])),
        multiplier: () => player.value.effects[2] ? 0 : 1
    },
    3: {
        name: "heal",
        img: "heal",
        effect: () => { if (player.value.hp < player.value.hpMax) player.value.hp += 1 },
        multiplier: () => 1
    },

})
export function spawn() {
    const item = {
        ...defaultGameObject(),
        lifeDuration: secondsToTicks(3 * detailsSkill.value[201].multiplier(savedPlayer.value.skills[201])),
        ...details.value[getRandomInt(Object.values(details.value).length)]
    }
    for (const e of ["x", "y"] as const) {
        item.cords[e] = getRandomInt(field.size[e] - item.size)
    }
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
    deleteItem(item)
}

export function clear() {
    items.value = []
}

export function deleteItem(item: Item) {
    items.value = items.value.filter(i => i.id != item.id)
}
