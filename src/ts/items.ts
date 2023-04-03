import { ref } from "vue";
import { Item, ItemdDetails } from "../types";
import { getRandomInt } from './helpers';
import { field, gameloopInterval } from "./game";
import { makeSec } from "./helpers";
import { increaseEffectDuration } from "./player";
import { defaultGameObject } from "./gameObject";

export const items = ref<Item[]>([])
export const details = ref<ItemdDetails>({
    0: {
        name: "slow",
        img: "",
        effect: () => increaseEffectDuration(0, 2),
    },
})
export function spawn() {
    const item = {
        ...defaultGameObject(),
        lifeDuration: makeSec(3),
        ...details.value[getRandomInt(Object.values(details.value).length - 1)]
    }
    for (const e of ["x", "y"] as unknown as ["x" | "y"]) {
        item.cords[e] = getRandomInt(field.size[e] - item.size)
    }
    items.value.push(item)
}