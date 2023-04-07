import { ref } from "vue";
import { Enemie, Player } from "../types";
import { field, stop as stopGame } from "./game";
import { norVec } from "./vector";
import { speedConstant } from "./config";
import { remove as removeEnemie } from "./enemies";
import { spawn as spawnPlasma } from "./plasma";
import { secondsToTicks } from "./helpers";
import { defaultGameObject } from "./gameObject";
import { details as detailsItem } from "./items";
import { details as detailsSkill } from "./skills";

export const player = ref<Player>({
    ...defaultGameObject(),
    img: 'player',
    speed: 4,
    hp: 5,
    hpMax: 5,
    energy: 5,
    energyMax: 5,
    cooldowns: {},
    cooldownsMax: { shot: secondsToTicks(1.5) },
    effects: {},

})
export const savedPlayer = ref({
    skills: {} as { [key: number]: number },
    points: {} as { [key: number]: number }
})
export const actions = ref({} as { [key: string]: number })
export function reset() {
    player.value.cords = {
        x: field.size.x / 2 - player.value.size / 2,
        y: field.size.y / 2 - player.value.size / 2
    }
    player.value.hp = player.value.hpMax
    player.value.energyMax += detailsSkill.value[0].multiplier(savedPlayer.value.skills[0])
    player.value.energy = player.value.energyMax
}

export function move(pressedKeys: Record<string, boolean>) {
    player.value.moveVector = { x: 0, y: 0 }
    if (pressedKeys["ArrowLeft"]) player.value.moveVector.x = -1;
    if (pressedKeys["ArrowRight"]) player.value.moveVector.x = 1;
    if (pressedKeys["ArrowUp"]) player.value.moveVector.y = -1;
    if (pressedKeys["ArrowDown"]) player.value.moveVector.y = 1;
    player.value.moveVector = norVec(player.value.moveVector)
    for (const e of ["x", "y"] as const) {
        player.value.cords[e] += player.value.moveVector[e] * player.value.speed * speedConstant * detailsItem.value[1].multiplier() * detailsSkill.value[100].multiplier(savedPlayer.value.skills[100])
        if (player.value.cords[e] < 0) player.value.cords[e] = 0
        if (player.value.cords[e] > field.size[e] - player.value.size) player.value.cords[e] = field.size[e] - player.value.size
    }
    if (player.value.moveVector.x != 0 || player.value.moveVector.y != 0) {
        actions.value["move"] = (actions.value["move"] || 0) + player.value.speed * detailsItem.value[1].multiplier()
        player.value.direction = Math.atan2(player.value.moveVector.x, player.value.moveVector.y * -1) * 180 / Math.PI;
    }
}

export function enemieHit(enemie: Enemie) {
    player.value.hp -= enemie.damage
    checkHp()
    removeEnemie(enemie)
}

export function abilities(pressedKeys: Record<string, boolean>) {
    if (pressedKeys[" "]) shot()
}

export function shot() {
    if (player.value.energy < 1 || player.value.cooldowns["shot"] || isCharging.value) return
    player.value.energy--
    player.value.cooldowns["shot"] = player.value.cooldownsMax["shot"] * detailsSkill.value[2].multiplier(savedPlayer.value.skills[2])
    spawnPlasma()
    if (player.value.energy < 1) reload()
}

export function reduceCooldowns() {
    for (const e of Object.entries(player.value.cooldowns)) {
        if (player.value.cooldowns[e[0]] > 0)
            player.value.cooldowns[e[0]]--
        if (player.value.cooldowns[e[0]] < 0) player.value.cooldowns[e[0]] = 0
    }
}
export const isCharging = ref(false)
let reloadInterval = 0
export function reload() {
    isCharging.value = true
    reloadInterval = setInterval(() => {
        player.value.energy++
        if (player.value.energy == player.value.energyMax) {
            isCharging.value = false
            clearInterval(reloadInterval)
        }
    }, (5000 / player.value.energyMax) * detailsSkill.value[1].multiplier(savedPlayer.value.skills[1]));

}

export function increaseEffectDuration(effect: number, sec: number) {
    if (player.value.effects[effect]) player.value.effects[effect] += secondsToTicks(sec)
    else player.value.effects[effect] = secondsToTicks(sec)
}

export function decreaseEffectDuration() {
    Object.keys(player.value.effects).forEach(e => player.value.effects[e] -= +!!player.value.effects[e])
}

export function checkHp() {
    if (player.value.hp <= 0) stopGame()
}