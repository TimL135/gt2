import { ref } from "vue";
import { Item, ItemdDetails } from "../types";
import { getRandomInt } from './helpers';
import { field } from "./game";
import { makeSec } from "./helpers";
import { increaseEffectDuration, player } from "./player";
import { defaultGameObject } from "./gameObject";

export const items = ref<Item[]>([])
export const details = ref<ItemdDetails>({
    0: {
        name: "slow",
        img: 'public/img/items/slow.png',
        effect: () => increaseEffectDuration(0, 2),
        multiplier: () => player.value.effects[0] ? 0.5 : 1
    },
    1: {
        name: "speed",
        img: "public/img/items/speed.png",
        effect: () => increaseEffectDuration(1, 2),
        multiplier: () => player.value.effects[1] ? 2 : 1
    },
    2: {
        name: "stun",
        img: "public/img/items/stun.png",
        effect: () => increaseEffectDuration(2, 0.5),
        multiplier: () => player.value.effects[2] ? 0 : 1
    },
    3: {
        name: "heal",
        img: "public/img/items/heal.png",
        effect: () => { if (player.value.hp < player.value.hpMax) player.value.hp += 1 },
        multiplier: () => 1
    },

})
export function spawn() {
    const item = {
        ...defaultGameObject(),
        lifeDuration: makeSec(3),
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
    item.effect()
    deleteItem(item)
}

export function deleteItem(item: Item) {
    items.value = items.value.filter(i => i.id != item.id)
}
