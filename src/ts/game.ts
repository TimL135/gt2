import {
    move as movePlayer,
    reset as resetPlayer, abilities as abilitiesPlayer, reduceCooldowns, decreaseEffectDuration, actions as actionsPlayer, savedPlayer, getAllMultiplier
} from "./player";
import {
    spawn as spawnEnemie,
    checkPosition as checkPositionEnemies,
    clear as clearEnemies,
    enemies,
    doEnemieSpecial
} from "./enemies";
import { gameTicks } from "./generel/config";
import { collisions } from "./colliosion";
import { move } from "./gameObject";
import { computed, ref } from "vue";
import { clear as clearPlasma, plasmas, checkPosition as checkPositionPlasma, enemiePlasmas } from "./plasma";
import { secondsToTicks, ticksToSeconds } from "./generel/helpers";
import { decreaseLifeDuration, spawn as spawnItem, clear as clearItems } from "./items";
import { getPoints, } from "./skills";
import { getMultiplier, updateMultiplier } from "./multiplier";
import { getXp } from "./lvl";
import { getCrystal } from "./crystals";
import { resetInfo, updateInfo } from "./info";
import { clearPoints, decreasePointsLifeDuration } from "./points";
import { getScore } from "./score";
import { details as detailsPassiv } from "./passivs";
import { worldPoints, worldPointsNeed } from '@/ts/worldLvl';

export const field = ref({
    size: {
        x: window.innerWidth / 12 * 8,
        y: window.innerHeight * 0.90
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
const enemieSpeedTime = ref(0)
const enemieHpTime = ref(0)
const enemieDamageTime = ref(0)
const enemieSpecialTime = ref(0)
function setupMultipliers() {
    updateMultiplier("enemieSpeed", "enemieSpeedTime", computed(() => (enemieSpeedTime.value * 0.1 * getMultiplier("enemieSpeedPower")) + 1))
    updateMultiplier("enemieHp", "enemieHpTime", computed(() => (enemieHpTime.value * 0.1 * getMultiplier("enemieHpPower")) + 1))
    updateMultiplier("enemieDamage", "enemieDamageTime", computed(() => (enemieDamageTime.value * 0.1 * getMultiplier("enemieDamagePower")) + 1))
    updateMultiplier("enemieSpecial", "enemieSpecialTime", computed(() => (enemieSpecialTime.value * 0.1 * getMultiplier("enemieSpecialPower")) + 1))
}
setupMultipliers()
export function start() {
    if (gameloopInterval.value) return
    worldPoints.value = 0
    enemieSpeedTime.value = savedPlayer.value.world.lvl
    enemieHpTime.value = savedPlayer.value.world.lvl
    enemieDamageTime.value = savedPlayer.value.world.lvl
    enemieSpecialTime.value = savedPlayer.value.world.lvl
    clearEnemies()
    clearItems()
    clearPlasma()
    resetPlayer()
    resetInfo()
    clearPoints()
    getAllMultiplier()
    if (savedPlayer.value.passivs.selected == 4) detailsPassiv.value[4].effect()
    if (savedPlayer.value.passivs.selected == 6) detailsPassiv.value[6].effect()

    gameloopTicks.value = 0
    for (let i = 0; i < ((savedPlayer.value.world.lvl * 2) + 5) * getMultiplier("enemieSpawnTime"); i++)spawnEnemie()
    gameloopInterval.value = setInterval(async () => {
        gameloop();
    }, 1000 / gameTicks);
}

export function stop() {
    if (!gameloopInterval) return
    actionsPlayer.value["time"] = ticksToSeconds(gameloopTicks.value)
    getScore()
    getXp()
    for (let e of ["power", "time"] as const) { getCrystal(e) }
    getPoints()
    getCurrency()
    actionsPlayer.value = {}
    clearInterval(gameloopInterval.value)
    gameloopInterval.value = 0
}

function gameloop() {
    if (worldPoints.value > worldPointsNeed.value) {
        savedPlayer.value.world.lvl++
        updateInfo("lvl", `finish world ${savedPlayer.value.world.lvl}`)
        stop()
    }
    movePlayer(pressedKeys)
    move(enemies.value)
    move(plasmas.value)
    move(enemiePlasmas.value)
    checkPositionEnemies()
    checkPositionPlasma()
    collisions()
    abilitiesPlayer(pressedKeys)
    reduceCooldowns()
    decreaseEffectDuration()
    decreaseLifeDuration()
    decreasePointsLifeDuration()
    doEnemieSpecial()
    gameloopTicks.value++
    executeActionEverySec(5 * getMultiplier("itemSpawn"), spawnItem)
    executeActionEverySec(1, () => worldPoints.value++)
}

export function executeActionEverySec(sec: number, action: Function) {
    if (gameloopTicks.value % secondsToTicks(sec) == 0) action()
}

function getCurrency() {
    if (actionsPlayer.value["currency"]) {
        let currency = Math.round(actionsPlayer.value["currency"] * getMultiplier("currency"))
        updateInfo("currency", `you got ${currency} scrap`)
        savedPlayer.value.currency = Math.round((savedPlayer.value.currency || 0) + currency)
    }
}
