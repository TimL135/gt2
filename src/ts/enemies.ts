import { ref } from "vue";
import { Enemie, EnemieDetails, Plasma } from "../types";
import { field, gameloopInterval } from "./game";
import { getRandomInt, secondsToTicks } from './generel/helpers';
import { dirVec, norVec } from "./generel/vector";
import { defaultGameObject } from "./gameObject";
import { player, actions as actionsPlayer, savedPlayer, healPlayer } from "./player";
import { getMultiplier, multiplier } from "./multiplier";
import { playSound } from "./generel/sounds";
import { addPoint } from "./points";
import { spawnEnemiePlasma } from "./plasma";
import { spawn as spawnItem } from "./items";

export const enemies = ref<Enemie[]>([])
export const details = ref<EnemieDetails>({
    0: {
        move: (enemie: Enemie) => {
            for (const e of ["x", "y"] as const) {
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * getMultiplier("enemieSpeed") * (enemie.hp / enemie.hpMax);
            }
        },
        img: 'normal',
        special: () => { },
        onKill: (enemie: Enemie) => { spawnItem(enemie.cords) },
        specialCooldown: 0,
        specialMaxCooldown: 0,
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
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * getMultiplier("enemieSpeed") * (enemie.hp / enemie.hpMax);
            }
        },
        img: 'aim',
        special: () => { },
        onKill: (enemie: Enemie) => { spawnItem(enemie.cords) },
        specialCooldown: 0,
        specialMaxCooldown: 0,
        getMoveVector: (enemie: Enemie) => {
            enemie.moveVector = dirVec(player.value.cords, enemie.cords)
        }
    },
    2: {
        move: (enemie: Enemie) => {
            if (enemie.specialCooldown)
                enemie.getMoveVector(enemie)
            for (const e of ["x", "y"] as const) {
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * (getMultiplier("enemieSpeed") / multiplier.enemieSpeed.enemieSpeedTime.value) * (enemie.hp / enemie.hpMax);
            }
        },
        img: 'chase',
        special: (enemie: Enemie) => { enemie.specialMaxCooldown = 0 },
        onKill: (enemie: Enemie) => { spawnItem(enemie.cords) },
        specialCooldown: secondsToTicks(10),
        specialMaxCooldown: secondsToTicks(10),
        getMoveVector: (enemie: Enemie) => {
            enemie.moveVector = dirVec(player.value.cords, enemie.cords)
        }
    },
    3: {
        move: (enemie: Enemie) => {
            for (const e of ["x", "y"] as const) {
                enemie.cords[e] += enemie.moveVector[e] * enemie.speed * getMultiplier("enemieSpeed") * (enemie.hp / enemie.hpMax);
            }
        },
        img: 'shot',
        special: (enemie) => { spawnEnemiePlasma(enemie) },
        onKill: (enemie: Enemie) => { spawnItem(enemie.cords) },
        specialCooldown: secondsToTicks(1),
        specialMaxCooldown: secondsToTicks(4),
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
        0: () => enemie.size *= 1.1 * getMultiplier("enemieSpecial"),
        1: () => enemie.speed *= 1.1 * getMultiplier("enemieSpecial"),
        2: () => enemie.hpMax *= 1.1 * getMultiplier("enemieSpecial"),
        3: () => enemie.damage *= 1.1 * getMultiplier("enemieSpecial"),
    } as { [key: number]: Function }
    specials[getRandomInt(Object.keys(specials).length)]()
}
export function spawn() {
    const enemie = {
        ...defaultGameObject(),
        size: 37.5,
        speed: 4,
        damage: 1 * getMultiplier("enemieDamage"),
        hp: 1,
        hpMax: 1 * getMultiplier("enemieHp"),
        ...details.value[getRandomInt(Object.values(details.value).length)]
        // ...details.value[3]
    } as Enemie
    enemie.size *= getMultiplier("enemieSize")
    getSpecial(enemie)
    enemie.hp = enemie.hpMax
    getSpawnPosition(enemie)
    enemie.getMoveVector(enemie)
    enemie.moveVector = norVec(enemie.moveVector)
    enemies.value.push(enemie)
}
export function doEnemieSpecial() {
    for (const e of enemies.value) {
        e.specialCooldown -= +!!e.specialCooldown
        if (!e.specialCooldown && !player.value.effects[2]) {
            e.special(e)
            e.specialCooldown = e.specialMaxCooldown
        }

    }
}
export function checkPosition() {
    for (const e of enemies.value) {
        for (const c of ["x", "y"] as const) {
            if (e.cords[c] < - e.size || e.cords[c] > field.value.size[c]) death(e)
        }
    }
}

export function hitPlasma(enemie: Enemie, plasma: Plasma) {
    enemie.hp -= plasma.damage
    if (savedPlayer.value.passivs.selected == 7) healPlayer(plasma.damage / 4)
    addPoint(plasma.damage, "damageEnemie", { ...enemie.cords })
    if (enemie.hp <= 0) {
        actionsPlayer.value["kills"] = (actionsPlayer.value["kills"] || 0) + 1
        actionsPlayer.value["currency"] = (actionsPlayer.value["currency"] || 0) + 3
        enemie.onKill(enemie)
        playSound("explosion")
        remove(enemie)
    }
}

export function death(enemie: Enemie) {
    actionsPlayer.value["currency"] = (actionsPlayer.value["currency"] || 0) + 1
    remove(enemie)
}

export function remove(enemie: Enemie) {
    if (gameloopInterval.value) {
        actionsPlayer.value["deathEnemies"] = (actionsPlayer.value["deathEnemies"] || 0) + 1
        enemies.value = enemies.value.filter(e => e.id != enemie.id)
        spawn()
    }
}

export function clear() {
    enemies.value = []
}