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
import { ref } from "vue";
import { clear as clearPlasma, plasmas, checkPosition as checkPositionPlasma } from "./plasma";
import { secondsToTicks } from "./generel/helpers";
import { decreaseLifeDuration, spawn as spawnItem, clear as clearItems, itemMultiplier } from "./items";
import { getPoints, resetInfo as resetInfoSkill } from "./skills";
import { getMultiplier, multiplier } from "./multiplier";
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

export function start() {
    if (gameloopInterval.value) return

    multiplier.value.enemieSpeed.speed = 1
    multiplier.value.enemieHp.hpMax = 1
    multiplier.value.enemieSpecial.special = 1
    multiplier.value.enemieDamage.damage = 1

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
    itemMultiplier()
    gameloopTicks.value++
    executeActionEverySec(10 * getMultiplier("enemySpeedTime"), increaseEnemySpeed)
    executeActionEverySec(10 * getMultiplier("enemyHpTime"), increaceEnemyHpMax)
    executeActionEverySec(10 * getMultiplier("enemyDamageTime"), increaceEnemyDamage)
    executeActionEverySec(10 * getMultiplier("enemySpecialTime"), increaceEnemySpecial)
    executeActionEverySec(15 * getMultiplier("enemySpawnTime"), spawnEnemie)
    executeActionEverySec(5 * getMultiplier("itemSpawn"), spawnItem)
}

export function executeActionEverySec(sec: number, action: Function) {
    if (gameloopTicks.value % secondsToTicks(sec) == 0) action()
}
export function increaseEnemySpeed() {
    multiplier.value.enemieSpeed.speed += 0.2
}
export function increaceEnemyHpMax() {
    multiplier.value.enemieHp.hpMax += 0.2
}
export function increaceEnemySpecial() {
    multiplier.value.enemieSpecial.special += 0.2
}
export function increaceEnemyDamage() {
    multiplier.value.enemieDamage.damage += 0.2
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
