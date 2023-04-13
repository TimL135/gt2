import {
    move as movePlayer,
    reset as resetPlayer, abilities as abilitiesPlayer, reduceCooldowns, decreaseEffectDuration, actions as actionsPlayer, savedPlayer
} from "./player";
import {
    spawn as spawnEnemie,
    checkPosition as checkPositionEnemies,
    clear as clearEnemies,
    enemies
} from "./enemies";
import { gameTicks } from "./config";
import { collisions } from "./colliosion";
import { move } from "./gameObject";
import { ref } from "vue";
import { clear as clearPlasma, plasmas, checkPosition as checkPositionPlasma } from "./plasma";
import { secondsToTicks } from "./helpers";
import { decreaseLifeDuration, spawn as spawnItem, clear as clearItems, itemMultiplier } from "./items";
import { getPoints, resetInfo as resetInfoSkill } from "./skills";
import { getMultiplier, multiplier } from "./multiplier";


export const field = ref({
    size: {
        x: window.innerWidth / 12 * 8,
        y: window.innerHeight * 0.95
    }
})
export const handy = ref(field.value.size.x < 650)
window.onresize = () => {
    changeDisplaySize()
};
function changeDisplaySize() {
    field.value = {
        size: {
            x: window.innerWidth / 12 * 8,
            y: window.innerHeight * 0.95
        }
    }
    handy.value = field.value.size.x < 650
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
    multiplier.value.enemieSpeed.speed = 1
    clearEnemies()
    clearItems()
    clearPlasma()
    resetPlayer()
    resetInfoDisplay()
    gameloopTicks.value = 0
    for (let i = 0; i < 5; i++)spawnEnemie()
    gameloopInterval.value = setInterval(async () => {
        gameloop();
    }, 1000 / gameTicks);
}

export function stop() {
    if (!gameloopInterval) return
    actionsPlayer.value["time"] = gameloopTicks.value
    getPoints()
    getCurrency()
    actionsPlayer.value = {}
    clearInterval(gameloopInterval.value)
    gameloopInterval.value = 0
}

function gameloop() {
    movePlayer(pressedKeys)
    move(enemies.value)
    move(plasmas.value)
    checkPositionEnemies()
    checkPositionPlasma()
    collisions()
    abilitiesPlayer(pressedKeys)
    reduceCooldowns()
    decreaseEffectDuration()
    decreaseLifeDuration()
    itemMultiplier()
    gameloopTicks.value++
    executeActionEverySec(7.5, increaseEnemySpeed)
    executeActionEverySec(15, spawnEnemie)
    executeActionEverySec(5 * getMultiplier("itemSpawn"), spawnItem)
}

export function executeActionEverySec(sec: number, action: Function) {
    if (gameloopTicks.value % secondsToTicks(sec) == 0) action()
}
export function increaseEnemySpeed() {
    multiplier.value.enemieSpeed.speed += 0.25
}

export function resetInfoDisplay() {
    resetInfoSkill()
    currencyInfo.value = ""
}
export const currencyInfo = ref("")
function getCurrency() {
    if (actionsPlayer.value["currency"]) {
        currencyInfo.value = `you got ${actionsPlayer.value["currency"]} scrap`
        savedPlayer.value.currency = (savedPlayer.value.currency || 0) + actionsPlayer.value["currency"]
    }
}
