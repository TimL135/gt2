import { move as movePlayer, reset as resetPlayer, abilities as abilitiesPlayer, reduceCooldowns, decreaseEffectDuration, } from "./player";
import {
    spawn as spawnEnemie,
    checkPosition as checkPositionEnemies,
    clear as clearEnemies,
    enemies
} from "./enemies";
import { gameTicks } from "./config";
import { collisions } from "./colliosion";
import { move } from "./gameObject";
import { computed, ref } from "vue";
import { plasmas } from "./plasma";
import { makeSec } from "./helpers";
import { spawn as spawnItem } from "./items";

export const field = {
    size: {
        x: window.innerWidth / 12 * 8,
        y: window.innerHeight * 0.9
    }
}

export const gameloopTicks = ref(0)

export const pressedKeys = {} as Record<string, boolean>
window.onkeyup = (e: any) => {
    pressedKeys[e.key] = false;
};
window.onkeydown = (e: any) => {
    pressedKeys[e.key] = true;
};
export const gameloopInterval = ref(0)

export function start() {
    if (gameloopInterval.value) return
    clearEnemies()
    resetPlayer()
    gameloopTicks.value = 0
    for (let i = 0; i < 5; i++)spawnEnemie()
    gameloopInterval.value = setInterval(async () => {
        gameloop();
    }, 1000 / gameTicks);
}

export function stop() {
    if (!gameloopInterval) return
    clearInterval(gameloopInterval.value)
    gameloopInterval.value = 0
}

function gameloop() {
    movePlayer(pressedKeys)
    move(enemies.value, enemySpeedMultiplier.value)
    move(plasmas.value)
    checkPositionEnemies()
    collisions()
    abilitiesPlayer(pressedKeys)
    reduceCooldowns()
    decreaseEffectDuration()
    gameloopTicks.value++
    executeActionEverySec(7.5, increaseEnemySpeed)
    executeActionEverySec(15, spawnEnemie)
    executeActionEverySec(5, spawnItem)
}

export function executeActionEverySec(sec: number, action: Function) {
    if (gameloopTicks.value % Math.round(makeSec(sec)) == 0) action()
}
const enemySpeed = ref(1)
export function increaseEnemySpeed() {
    enemySpeed.value += 0.25
}

export const enemySpeedMultiplier = computed(() => {
    return enemySpeed.value
})

