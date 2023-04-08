import { ref } from "vue";
import { Enemie, EnemieDetails } from "../types";
import { speedConstant } from "./config";
import { field, gameloopInterval } from "./game";
import { getRandomInt } from './helpers';
import { dirVec, norVec } from "./vector";
import { defaultGameObject } from "./gameObject";
import { details as detailsItem } from "./items";
import { player, actions as actionsPlayer, savedPlayer } from "./player";
import { details as detailsSkill } from "./skills";

export const enemies = ref<Enemie[]>([])
export const details = ref<EnemieDetails>({
    0: {
        move: (enemie: Enemie, multiplier: number) => {
            for (const e of ["x", "y"] as const) {
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * speedConstant * multiplier * detailsItem.value[0].multiplier() * detailsItem.value[2].multiplier();
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
            if (enemie.cords.y == field.size.y) {
                enemie.moveVector.y = -1;
                enemie.moveVector.x = (Math.random() - 0.5) * 2;
            }
            if (enemie.cords.x == field.size.x) {
                enemie.moveVector.x = -1;
                enemie.moveVector.y = (Math.random() - 0.5) * 2;
            }
        }
    },
    1: {
        move: (enemie: Enemie, multiplier: number) => {
            for (const e of ["x", "y"] as const) {
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * speedConstant * multiplier * detailsItem.value[0].multiplier() * detailsItem.value[2].multiplier();
            }
        },
        img: 'normal',
        getMoveVector: (enemie: Enemie) => {
            enemie.moveVector = dirVec(player.value.cords, enemie.cords)
        }
    },
    2: {
        move: (enemie: Enemie, multiplier: number) => {
            enemie.getMoveVector(enemie)
            for (const e of ["x", "y"] as const) {
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * speedConstant * detailsItem.value[0].multiplier() * detailsItem.value[2].multiplier();
            }
        },
        img: 'normal',
        getMoveVector: (enemie: Enemie) => {
            enemie.moveVector = dirVec(player.value.cords, enemie.cords)
        }
    },
})
function getSpawnPosition(enemie: Enemie) {
    ({
        0: () => enemie.cords.y = 0 - enemie.size,
        1: () => enemie.cords.y = field.size.y,
        2: () => enemie.cords.x = field.size.x,
        3: () => enemie.cords.x = 0 - enemie.size
    } as { [key: number]: Function })[getRandomInt(4)]()
    if (!enemie.cords.x) enemie.cords.x = getRandomInt(field.size.x);
    if (!enemie.cords.y) enemie.cords.y = getRandomInt(field.size.y);
}
function getSpecial(enemie: Enemie) {
    ({
        0: () => enemie.size *= 1.5,
        1: () => enemie.speed *= 1.5,
    } as { [key: number]: Function })[getRandomInt(2)]()
}
export function spawn() {
    const enemie = {
        ...defaultGameObject(),
        speed: 2,
        damage: 1,
        ...details.value[getRandomInt(Object.values(details.value).length)]
    } as Enemie
    getSpecial(enemie)
    getSpawnPosition(enemie)
    enemie.getMoveVector(enemie)
    enemie.moveVector = norVec(enemie.moveVector)
    enemies.value.push(enemie)
}

export function checkPosition() {
    for (const e of enemies.value) {
        for (const c of ["x", "y"] as const) {
            if (e.cords[c] < - e.size || e.cords[c] > field.size[c]) kill(e)
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
        savedPlayer.value.currency = (savedPlayer.value.currency || 0) + 1
        enemies.value = enemies.value.filter(e => e.id != enemie.id)
        spawn()
    }
}

export function clear() {
    enemies.value = []
}