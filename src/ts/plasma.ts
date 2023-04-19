import { ref } from "vue";
import { Plasma, Vector, WeaponDetail } from "../types";
import { createId } from "./generel/helpers";
import { player } from "./player";
import { field } from "./game";
import { getMultiplier } from "./multiplier";

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
        id: createId()
    } as Plasma
    plasma.size *= getMultiplier("plasmaSize")
    plasma.speed *= getMultiplier("plasmaSpeed")
    plasma.getMoveVector(plasma, index)
    plasmas.value.push(plasma)
}
export function checkPosition() {
    plasmas.value = plasmas.value.filter(e => !(e.cords.x < - e.size || e.cords.x > field.value.size.x || e.cords.y < - e.size || e.cords.y > field.value.size.y))
}
