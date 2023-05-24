import { ref } from "vue";
import { Enemie, Plasma, Vector, WeaponDetail } from "../types";
import { createId } from "./generel/helpers";
import { player } from "./player";
import { field } from "./game";
import { getMultiplier } from "./multiplier";
import { playSound } from "./generel/sounds";
import { dirVec, norVec } from "./generel/vector";
import { speedConstant } from "./generel/config";

export const plasmas = ref<Plasma[]>([])
export function clear() {
    enemiePlasmas.value = []
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
    plasma.damage *= getMultiplier("plasmaDamage")
    plasma.getMoveVector(plasma, index)
    plasmas.value.push(plasma)
    playSound("laserShoot")
}
export const enemiePlasmas = ref<Plasma[]>([])
const enemiePlasmaDetails = {
    size: 25,
    speed: 1,
    moveVector: {} as Vector,
    img: 'plasmaEnemie',
}
export function spawnEnemiePlasma(enemie: Enemie) {
    const plasma = {
        ...enemiePlasmaDetails,
        cords: {
            x: enemie.cords.x + (enemie.size * 0, 5 - enemiePlasmaDetails.size * 0, 5),
            y: enemie.cords.y + enemie.size * 0.5
        },
        damage: enemie.damage,
        move: (plasma: Plasma) => {
            for (const e of ["x", "y"] as const) {
                plasma.cords[e] += plasma.moveVector[e] * enemie.speed * getMultiplier("plasmaEnemieSpeed") * 2;
            }
        },
        id: createId(),
    } as Plasma
    plasma.size *= getMultiplier("plasmaEnemieSize")
    plasma.speed *= getMultiplier("plasmaEnemieSpeed")
    plasma.damage *= getMultiplier("plasmaEnemieDamage")
    plasma.moveVector = norVec(dirVec(player.value.cords, plasma.cords))
    enemiePlasmas.value.push(plasma)
}
export function removeEnemiePlamsa(plasma: Plasma) {
    enemiePlasmas.value = enemiePlasmas.value.filter(e => e.id != plasma.id)
}
export function checkPosition() {
    plasmas.value = plasmas.value.filter(e => !(e.cords.x < - e.size || e.cords.x > field.value.size.x || e.cords.y < - e.size || e.cords.y > field.value.size.y))
    enemiePlasmas.value = enemiePlasmas.value.filter(e => !(e.cords.x < - e.size || e.cords.x > field.value.size.x || e.cords.y < - e.size || e.cords.y > field.value.size.y))
}
