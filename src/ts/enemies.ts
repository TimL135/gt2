import { ref } from "vue";
import { Enemie, EnemieDetails } from "../types";
import { speedConstant } from "./config";
import { field, gameloopInterval } from "./game";
import { getRandomInt } from './helpers';
import { dirVec, norVec } from "./vector";
import { defaultGameObject } from "./gameObject";
import { player, actions as actionsPlayer } from "./player";
import { getMultiplier, multiplier } from "./multiplier";

export const enemies = ref<Enemie[]>([])
export const details = ref<EnemieDetails>({
    0: {
        move: (enemie: Enemie) => {
            for (const e of ["x", "y"] as const) {
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * speedConstant * getMultiplier("enemieSpeed");
            }
        },
        img: 'normal',
        getMoveVector: (enemie: Enemie) => {
            if (enemie.cords.y == -enemie.size) {
                enemie.moveVector.y = 1;
                enemie.moveVector.x = (Math.random() - 0.5) * 2;
            }
            if (enemie.cords.x == -enemie.size) {
                enemie.moveVector.x = 1;
                enemie.moveVector.y = (Math.random() - 0.5) * 2;
            }
            if (enemie.cords.y == field.value.size.y) {
                enemie.moveVector.y = -1;
                enemie.moveVector.x = (Math.random() - 0.5) * 2;
            }
            if (enemie.cords.x == field.value.size.x) {
                enemie.moveVector.x = -1;
                enemie.moveVector.y = (Math.random() - 0.5) * 2;
            }
        }
    },
    1: {
        move: (enemie: Enemie) => {
            for (const e of ["x", "y"] as const) {
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * speedConstant * getMultiplier("enemieSpeed");
            }
        },
        img: 'aim',
        getMoveVector: (enemie: Enemie) => {
            enemie.moveVector = dirVec(player.value.cords, enemie.cords)
        }
    },
    2: {
        move: (enemie: Enemie) => {
            enemie.getMoveVector(enemie)
            for (const e of ["x", "y"] as const) {
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * speedConstant * getMultiplier("enemieSpeed") / multiplier.value.enemieSpeed.speed;
            }
        },
        img: 'chase',
        getMoveVector: (enemie: Enemie) => {
            enemie.moveVector = dirVec(player.value.cords, enemie.cords)
        }
    },
})
function getSpawnPosition(enemie: Enemie) {
    const positions = {
        0: () => enemie.cords.y = 0 - enemie.size,
        1: () => enemie.cords.y = field.value.size.y,
        2: () => enemie.cords.x = field.value.size.x,
        3: () => enemie.cords.x = 0 - enemie.size
    } as { [key: number]: Function }
    positions[getRandomInt(Object.keys(positions).length)]()
    if (!enemie.cords.x) enemie.cords.x = getRandomInt(field.value.size.x);
    if (!enemie.cords.y) enemie.cords.y = getRandomInt(field.value.size.y);
}
function getSpecial(enemie: Enemie) {
    const specials = {
        0: () => enemie.size *= 1.5,
        1: () => enemie.speed *= 1.5,
    } as { [key: number]: Function }
    specials[getRandomInt(Object.keys(specials).length)]()
}
export function spawn() {
    const enemie = {
        ...defaultGameObject(),
        speed: 2,
        damage: 1,
        ...details.value[getRandomInt(Object.values(details.value).length)]
    } as Enemie
    enemie.size *= getMultiplier("enemieSize")
    getSpecial(enemie)
    getSpawnPosition(enemie)
    enemie.getMoveVector(enemie)
    enemie.moveVector = norVec(enemie.moveVector)
    enemies.value.push(enemie)
}

export function checkPosition() {
    for (const e of enemies.value) {
        for (const c of ["x", "y"] as const) {
            if (e.cords[c] < - e.size || e.cords[c] > field.value.size[c]) kill(e)
        }
    }
}

export function hitPlasma(enemie: Enemie) {
    actionsPlayer.value["kills"] = (actionsPlayer.value["kills"] || 0) + 1
    remove(enemie)
}

export function kill(enemie: Enemie) {
    remove(enemie)
}

export function remove(enemie: Enemie) {
    if (gameloopInterval.value) {
        actionsPlayer.value["currency"] = (actionsPlayer.value["currency"] || 0) + 1
        enemies.value = enemies.value.filter(e => e.id != enemie.id)
        spawn()
    }
}

export function clear() {
    enemies.value = []
}