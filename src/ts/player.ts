import { ref, watch } from "vue";
import { Enemie, Plasma, Player, SavedPlayer, Vector } from "../types";
import { field, stop as stopGame } from "./game";
import { norVec } from "./generel/vector";
import { remove as removeEnemie } from "./enemies";
import { secondsToTicks } from "./generel/helpers";
import { defaultGameObject } from "./gameObject";
import { skillMultiplier } from "./skills";
import { setSavedPlayer } from "./generel/api";
import { getSavedPlayer } from "./generel/api";
import { details as detailsWeapon } from "./weapon";
import { details as detailsAbilitys } from "./abilitys";
import { getStats } from "./spaceShip";
import { getAddition, getMultiplier } from "./multiplier";
import { generalSize } from "./generel/config";
import { details as detailsPassiv } from "./passivs";
import { lvlMultiplier } from "./lvl";
import { itemMultiplier } from "./items";
import { buildingMultiplier } from "./building";
import { getCrystalMultiplier } from "./crystals";
import { getScoreMultiplier } from "./score";
import { playSound } from "./generel/sounds";
import { addPoint } from "./points";
import { removeEnemiePlamsa } from "./plasma";

export const savedPlayer = ref<SavedPlayer>(getSavedPlayer())
export const player = ref<Player>({
    ...defaultGameObject(),
    ...getStats(savedPlayer.value.spaceShip.owned[savedPlayer.value.spaceShip.selected]),
    img: savedPlayer.value.spaceShip.owned[savedPlayer.value.spaceShip.selected].img,
    hp: 0,
    energy: 0,
    cooldowns: {},
    effects: {},
    invincible: false,
    big: false
})

watch(
    () => savedPlayer.value,
    () => setSavedPlayer(savedPlayer.value),
    { deep: true }
);
export function getAllMultiplier() {
    getScoreMultiplier()
    getCrystalMultiplier()
    lvlMultiplier()
    buildingMultiplier()
    skillMultiplier()
    itemMultiplier()
}
setTimeout(() => getAllMultiplier(), 0)
export const actions = ref({} as { [key: string]: number })
export function reset() {
    const stats = getStats(savedPlayer.value.spaceShip.owned[savedPlayer.value.spaceShip.selected])
    player.value.size = stats.size * getMultiplier("playerSize")
    player.value.cords = {
        x: field.value.size.x / 2 - player.value.size / 2,
        y: field.value.size.y / 2 - player.value.size / 2
    }
    player.value.cooldowns = {}
    player.value.hpMax = stats.hpMax + getAddition("playerHpMax")
    player.value.hp = player.value.hpMax
    player.value.energyMax = stats.energyMax + getAddition("playerEnergyMax")
    player.value.energy = player.value.energyMax
}
let charge = 0
let lastDirection = -1
export function move(pressedKeys: Record<string, boolean>) {
    const keys = savedPlayer.value.settings.keys
    player.value.moveVector = { x: 0, y: 0 }
    if (pressedKeys[keys.moveUp]) player.value.moveVector.y -= 1;
    if (pressedKeys[keys.moveDown]) player.value.moveVector.y += 1;
    if (pressedKeys[keys.moveLeft]) player.value.moveVector.x -= 1;
    if (pressedKeys[keys.moveRight]) player.value.moveVector.x += 1;
    player.value.moveVector = norVec(player.value.moveVector)
    for (const e of ["x", "y"] as const) {
        player.value.cords[e] += player.value.moveVector[e] * player.value.speed * getMultiplier("playerSpeed")
        if (player.value.cords[e] < 0) player.value.cords[e] = 0
        if (player.value.cords[e] > field.value.size[e] - player.value.size) player.value.cords[e] = field.value.size[e] - player.value.size
    }
    if (player.value.moveVector.x != 0 || player.value.moveVector.y != 0) {
        actions.value["move"] = (actions.value["move"] || 0) + player.value.speed * (getMultiplier("playerSpeed") / generalSize.value)
        if (savedPlayer.value.passivs.selected == 1) charge = detailsPassiv.value[1].effect(charge)
        player.value.direction = Math.atan2(player.value.moveVector.x, player.value.moveVector.y * -1) * 180 / Math.PI;
        if (player.value.direction != lastDirection) playSound("move")
        lastDirection = player.value.direction
    } else {
        lastDirection = -1
    }
}
export function enemieHit(enemie: Enemie) {
    removeEnemie(enemie)
    getDamage(enemie.damage, enemie.cords)
}

export function enemiePlasmaHit(plasma: Plasma) {
    removeEnemiePlamsa(plasma)
    getDamage(plasma.damage, plasma.cords)
}

export function abilities(pressedKeys: Record<string, boolean>) {
    if (isCharging.value) return
    const keys = savedPlayer.value.settings.keys
    if (pressedKeys[keys.shot]) shot()
    for (let i in savedPlayer.value.abilitys.selected) {
        let ability = savedPlayer.value.abilitys.selected[+i]
        if (pressedKeys[keys[`ability${i}` as 'ability0']] && ability != -1 && detailsAbilitys.value[ability]?.condition() && !player.value.cooldowns[+i] && player.value.energy >= detailsAbilitys.value[ability].energyCost) {
            player.value.cooldowns[+i] = detailsAbilitys.value[ability].cooldown * getMultiplier("abilityCooldown")
            player.value.energy -= detailsAbilitys.value[ability].energyCost
            detailsAbilitys.value[ability].effect()
            playSound("click")
        }
    }
    if (player.value.energy < 1) reload()
}

export function shot() {
    if (player.value.energy < 1 || player.value.cooldowns["shot"]) return
    player.value.energy--
    player.value.cooldowns["shot"] = Math.round(detailsWeapon.value[savedPlayer.value.weapons.selected].cooldown * getMultiplier("reloadSpeed"))
    detailsWeapon.value[savedPlayer.value.weapons.selected].shot()
}

export const isCharging = ref(false)
let reloadInterval = 0 as number | NodeJS.Timer
export function reload() {
    isCharging.value = true
    reloadInterval = setInterval(() => {
        player.value.energy++
        playSound("reload")
        if (player.value.energy >= player.value.energyMax) {
            player.value.energy = player.value.energyMax
            if (savedPlayer.value.passivs.selected == 3) detailsPassiv.value[3].effect()
            stopReload()
        }
    }, (4000 / player.value.energyMax) * getMultiplier("chargeSpeed"));
}

export function stopReload() {
    isCharging.value = false
    clearInterval(reloadInterval)
}

export function reduceCooldowns() {
    Object.keys(player.value.cooldowns).forEach(e => {
        player.value.cooldowns[e] -= +!!player.value.cooldowns[e]
        if (player.value.cooldowns[e] < 0) player.value.cooldowns[e] = 0
    })
}

export function increaseEffectDuration(effect: number, sec: number) {
    player.value.effects[effect] = (player.value.effects[effect] || 0) + secondsToTicks(sec)
}
export function decreaseEffectDuration() {
    Object.keys(player.value.effects).forEach(e => player.value.effects[e] -= +!!player.value.effects[e])
}
export function healPlayer(amount: number) {
    addPoint(Math.ceil(amount), "healPlayer", { ...player.value.cords })
    player.value.hp += amount
    if (player.value.hp > player.value.hpMax) player.value.hp = player.value.hpMax
}
export function getDamage(amount: number, cords: Vector) {
    if (player.value.invincible) return
    if (savedPlayer.value.passivs.selected == 4) detailsPassiv.value[4].effect()
    if (savedPlayer.value.passivs.selected == 5) detailsPassiv.value[5].effect()
    if (player.value.big) {
        player.value.big = false
    } else {
        if (savedPlayer.value.passivs.selected == 6) {
            player.value.hp -= amount * detailsPassiv.value[6].effect()
        } else {
            player.value.hp -= amount
        }
        addPoint(Math.ceil(amount), "damagePlayer", { ...cords })
        playSound("hitHurt")
        checkHp()
    }
}
export function checkHp() {
    if (player.value.hp <= 0) stopGame()
}

