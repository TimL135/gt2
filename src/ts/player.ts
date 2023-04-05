import { ref } from "vue";
import { Enemie, Player } from "../types";
import { field, stop as stopGame } from "./game";
import { norVec } from "./vector";
import { speedConstant } from "./config";
import { remove as removeEnemie } from "./enemies";
import { spawn as spawnPlasma } from "./plasma";
import { makeSec } from "./helpers";
import { defaultGameObject } from "./gameObject";
import { details as detailsItem } from "./items";

export const player = ref<Player>({
    ...defaultGameObject(),
    img: 'public/img/player/player.png',
    speed: 4,
    hp: 5,
    hpMax: 5,
    magazine: 5,
    magazineMax: 5,
    cooldowns: {},
    cooldownsMax: { shot: 30 },
    effects: {},

})

export function reset() {
    player.value.cords = {
        x: field.size.x / 2 - player.value.size / 2,
        y: field.size.y / 2 - player.value.size / 2
    }
    player.value.hp = player.value.hpMax
}

export function move(pressedKeys: Record<string, boolean>) {
    player.value.moveVector = { x: 0, y: 0 }
    if (pressedKeys["ArrowLeft"]) player.value.moveVector.x = -1;
    if (pressedKeys["ArrowRight"]) player.value.moveVector.x = 1;
    if (pressedKeys["ArrowUp"]) player.value.moveVector.y = -1;
    if (pressedKeys["ArrowDown"]) player.value.moveVector.y = 1;
    player.value.moveVector = norVec(player.value.moveVector)
    for (const e of ["x", "y"] as const) {
        player.value.cords[e] += player.value.moveVector[e] * player.value.speed * speedConstant * detailsItem.value[1].multiplier()
        if (player.value.cords[e] < 0) player.value.cords[e] = 0
        if (player.value.cords[e] > field.size[e] - player.value.size) player.value.cords[e] = field.size[e] - player.value.size
    }
    if (player.value.moveVector.x != 0 || player.value.moveVector.y != 0)
        player.value.direction = Math.atan2(player.value.moveVector.x, player.value.moveVector.y * -1) * 180 / Math.PI;
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
    if (player.value.magazine < 1 || player.value.cooldowns["shot"] || isReloading.value) return
    player.value.magazine--
    player.value.cooldowns["shot"] = player.value.cooldownsMax["shot"]
    spawnPlasma()
    if (player.value.magazine < 1) reload()
}

export function reduceCooldowns() {
    for (const e of Object.entries(player.value.cooldowns)) {
        if (player.value.cooldowns[e[0]] > 0)
            player.value.cooldowns[e[0]]--
        if (player.value.cooldowns[e[0]] < 0) player.value.cooldowns[e[0]] = 0
    }
}
export const isReloading = ref(false)
let reloadInterval = 0
export function reload() {
    isReloading.value = true
    reloadInterval = setInterval(() => {
        player.value.magazine++
        if (player.value.magazine == player.value.magazineMax) {
            isReloading.value = false
            clearInterval(reloadInterval)
        }
    }, 5000 / player.value.magazineMax);

}

export function increaseEffectDuration(effect: number, sec: number) {
    if (player.value.effects[effect]) player.value.effects[effect] += makeSec(sec)
    else player.value.effects[effect] = makeSec(sec)
}

export function decreaseEffectDuration() {
    Object.keys(player.value.effects).forEach(e => player.value.effects[e] -= +!!player.value.effects[e])
}

export function checkHp() {
    if (player.value.hp <= 0) stopGame()
}