import { ref } from "vue";
import { Enemie, EnemieDetails } from "../types";
import { speedConstant } from "./config";
import { field, gameloopInterval } from "./game";
import { getRandomInt } from './helpers';
import { norVec } from "./vector";
import { defaultGameObject } from "./gameObject";
import { slowEffect, stunEffect } from "./items";

export const enemies = ref<Enemie[]>([])
export const details = ref<EnemieDetails>({
    0: {
        move: (enemie: Enemie, multiplier: number) => {
            for (const e of ["x", "y"] as unknown as ["x" | "y"]) {
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * speedConstant * multiplier * slowEffect.value * stunEffect.value;
            }
        },
        img: 'public/img/enemies/enemie1.png',
    }
})
export function spawn() {
    const enemie = {
        ...defaultGameObject(),
        speed: 2,
        damage: 1,
        ...details.value[getRandomInt(Object.values(details.value).length)]
    }
    switch (getRandomInt(4)) {
        case 0:
            enemie.cords.y = 0 - enemie.size;
            enemie.moveVector.x = (Math.random() - 0.5) * 2;
            enemie.moveVector.y = 1;
            break;
        case 1:
            enemie.cords.y = field.size.y;
            enemie.moveVector.x = (Math.random() - 0.5) * 2;
            enemie.moveVector.y = -1;
            break;
        case 2:
            enemie.cords.x = field.size.x;
            enemie.moveVector.x = -1;
            enemie.moveVector.y = (Math.random() - 0.5) * 2;
            break;
        case 3:
            enemie.cords.x = 0 - enemie.size;
            enemie.moveVector.x = 1;
            enemie.moveVector.y = (Math.random() - 0.5) * 2;
            break;
    }
    enemie.moveVector = norVec(enemie.moveVector)
    if (!enemie.cords.x) enemie.cords.x = getRandomInt(field.size.x);
    if (!enemie.cords.y) enemie.cords.y = getRandomInt(field.size.y);
    enemies.value.push(enemie)
}

export function checkPosition() {
    for (const e of enemies.value) {
        for (const c of ["x", "y"] as unknown as ["x" | "y"]) {
            if (e.cords[c] < - e.size || e.cords[c] > field.size[c]) kill(e)
        }
    }
}

export function hitPlasma(enemie: Enemie) {
    remove(enemie)
}

export function kill(enemie: Enemie) {
    remove(enemie)
}

export function remove(enemie: Enemie) {
    if (gameloopInterval.value) {
        enemies.value = enemies.value.filter(e => e.id != enemie.id)
        spawn()
    }
}

export function clear() {
    enemies.value = []
}