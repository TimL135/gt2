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
import { secondsToTicks } from "./generel/helpers";
import { decreaseLifeDuration, spawn as spawnItem, clear as clearItems } from "./items";
import { getPoints, resetInfo as resetInfoSkill } from "./skills";
import { getMultiplier, multiplier, updateMultiplier } from "./multiplier";
import { getXp } from "./lvl";
import { resetInfo as resetInfoLvl } from "./lvl"
import { getArtefact, resetArtefactInfo } from "./artefact";


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
    console.log("resize")
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

let enemieSpeedTime = ref(1)
let enemieHpTime = ref(1)
let enemieDamageTime = ref(1)
let enemieSpecialTime = ref(1)

export function start() {
    if (gameloopInterval.value) return
    updateMultiplier("enemieSpeed", "enemieSpeedTime", computed(() => enemieSpeedTime.value * 0.2 + 1))
    updateMultiplier("enemieHp", "enemieHpTime", computed(() => enemieHpTime.value * 0.2 + 1))
    updateMultiplier("enemieDamage", "enemieDamageTime", computed(() => enemieDamageTime.value * 0.2 + 1))
    updateMultiplier("enemieSpecial", "enemieSpecialTime", computed(() => enemieSpecialTime.value * 0.2 + 1))

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
    getArtefact()
    getXp()
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
    gameloopTicks.value++
    executeActionEverySec(10 * getMultiplier("enemieSpeedTime"), increaseEnemySpeed)
    executeActionEverySec(10 * getMultiplier("enemieHpTime"), increaceEnemyHpMax)
    executeActionEverySec(10 * getMultiplier("enemieDamageTime"), increaceEnemyDamage)
    executeActionEverySec(10 * getMultiplier("enemieSpecialTime"), increaceEnemySpecial)
    executeActionEverySec(15 * getMultiplier("enemieSpawnTime"), spawnEnemie)
    executeActionEverySec(5 * getMultiplier("itemSpawn"), spawnItem)
}

export function executeActionEverySec(sec: number, action: Function) {
    if (gameloopTicks.value % secondsToTicks(sec) == 0) action()
}

export function increaseEnemySpeed() {
    enemieSpeedTime.value++
}
export function increaceEnemyHpMax() {
    enemieHpTime.value++
}
export function increaceEnemySpecial() {
    enemieSpecialTime.value++
}
export function increaceEnemyDamage() {
    enemieDamageTime.value++
}

export function resetInfoDisplay() {
    resetArtefactInfo()
    resetInfoSkill()
    resetInfoLvl()
    currencyInfo.value = ""
}
export const currencyInfo = ref("")
function getCurrency() {
    if (actionsPlayer.value["currency"]) {
        currencyInfo.value = `you got ${actionsPlayer.value["currency"]} scrap`
        savedPlayer.value.currency = Math.round((savedPlayer.value.currency || 0) + actionsPlayer.value["currency"])
    }
}
