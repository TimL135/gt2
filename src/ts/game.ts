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
import { gameTicks } from "./generel/config";
import { collisions } from "./colliosion";
import { move } from "./gameObject";
import { computed, ref } from "vue";
import { clear as clearPlasma, plasmas, checkPosition as checkPositionPlasma } from "./plasma";
import { secondsToTicks, ticksToSeconds } from "./generel/helpers";
import { decreaseLifeDuration, spawn as spawnItem, clear as clearItems } from "./items";
import { getPoints, } from "./skills";
import { getMultiplier, updateMultiplier } from "./multiplier";
import { getXp } from "./lvl";
import { getTimeCrystal, getPowerCrystal } from "./crystals";
import { resetInfo, updateInfo } from "./info";
import { clearPoints, decreasePointsLifeDuration } from "./points";

export const field = ref({
    size: {
        x: window.innerWidth / 12 * 8,
        y: window.innerHeight * 0.95
    }
})
export const touchscreen = ref((('ontouchstart' in window) || (navigator.maxTouchPoints > 0)))
if (touchscreen.value) document.body.classList.add("touchscreen")
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
}

export const gameloopTicks = ref(0)

export const pressedKeys = {} as Record<string, boolean>
window.onkeyup = (e: any) => {
    pressedKeys[e.key] = false;
};
window.onkeydown = (e: any) => {
    pressedKeys[e.key] = true;
};
export const gameloopInterval = ref<number | NodeJS.Timer>(0)

const enemieSpeedTime = ref(1)
const enemieHpTime = ref(1)
const enemieDamageTime = ref(1)
const enemieSpecialTime = ref(1)
updateMultiplier("enemieSpeed", "enemieSpeedTime", computed(() => (enemieSpeedTime.value * 0.2 * getMultiplier("enemieSpeedPower")) + 1))
updateMultiplier("enemieHp", "enemieHpTime", computed(() => (enemieHpTime.value * 0.2 * getMultiplier("enemieHpPower")) + 1))
updateMultiplier("enemieDamage", "enemieDamageTime", computed(() => (enemieDamageTime.value * 0.2 * getMultiplier("enemieDamagePower")) + 1))
updateMultiplier("enemieSpecial", "enemieSpecialTime", computed(() => (enemieSpecialTime.value * 0.2 * getMultiplier("enemieSpecialPower")) + 1))
export function start() {
    if (gameloopInterval.value) return
    enemieSpeedTime.value = 1
    enemieHpTime.value = 1
    enemieDamageTime.value = 1
    enemieSpecialTime.value = 1
    clearEnemies()
    clearItems()
    clearPlasma()
    resetPlayer()
    resetInfo()
    clearPoints()
    gameloopTicks.value = 0
    for (let i = 0; i < 5; i++)spawnEnemie()
    gameloopInterval.value = setInterval(async () => {
        gameloop();
    }, 1000 / gameTicks);
}

export function stop() {
    if (!gameloopInterval) return
    actionsPlayer.value["time"] = ticksToSeconds(gameloopTicks.value)
    getScore()
    getXp()
    getTimeCrystal()
    getPowerCrystal()
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
    decreasePointsLifeDuration()
    gameloopTicks.value++
    executeActionEverySec(10 * getMultiplier("enemieSpeedTime"), increaseEnemieSpeed)
    executeActionEverySec(10 * getMultiplier("enemieHpTime"), increaceEnemieHpMax)
    executeActionEverySec(10 * getMultiplier("enemieDamageTime"), increaceEnemieDamage)
    executeActionEverySec(10 * getMultiplier("enemieSpecialTime"), increaceEnemieSpecial)
    executeActionEverySec(15 * getMultiplier("enemieSpawnTime"), spawnEnemie)
    executeActionEverySec(5 * getMultiplier("itemSpawn"), spawnItem)
}

export function executeActionEverySec(sec: number, action: Function) {
    if (gameloopTicks.value % secondsToTicks(sec) == 0) action()
}

export function increaseEnemieSpeed() {
    enemieSpeedTime.value++
}
export function increaceEnemieHpMax() {
    enemieHpTime.value++
}
export function increaceEnemieSpecial() {
    enemieSpecialTime.value++
}
export function increaceEnemieDamage() {
    enemieDamageTime.value++
}

function getCurrency() {
    if (actionsPlayer.value["currency"]) {
        let currency = Math.round(actionsPlayer.value["currency"] * getMultiplier("currency"))
        updateInfo("currency", `you got ${currency} scrap`)
        savedPlayer.value.currency = Math.round((savedPlayer.value.currency || 0) + currency)
    }
}
function getScore() {
    let score = Object.entries(actionsPlayer.value).reduce((a, b) => {
        if (b[0] == "time") return a + b[1] * 1
        if (b[0] == 'deathEnemies') return a + b[1] * 3
        if (b[0] == 'collect') return a + b[1] * 10
        if (b[0] == 'kills') return a + b[1] * 12
        return a
    }, 0)
    if (score > savedPlayer.value.score.highScore) {
        let newHighScore = Math.round(score)
        updateInfo("highScore", `you got a new highscore: ${newHighScore}`)
        savedPlayer.value.score.highScore = newHighScore
    }
}