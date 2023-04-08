import { ref } from "vue";
import { Plasma, Vector, WeaponDetail } from "../types";
import { getRandomInt } from "./helpers";
import { player } from "./player";

export const plasmas = ref<Plasma[]>([])
export function clear() {
    plasmas.value = []
}
export function spawn(details: WeaponDetail, index = 0) {
    const plasma = {
        ...details,
        cords: {
            x: player.value.cords.x + (player.value.size * 0, 5 - details.size * 0, 5),
            y: player.value.cords.y + player.value.size * 0.5
        },
        img: 'plasma',
        moveVector: {} as Vector,
        direction: 0,
        id: getRandomInt(100000)
    } as Plasma
    plasma.getMoveVector(plasma, index)
    plasmas.value.push(plasma)
    console.log(plasmas.value)
}

