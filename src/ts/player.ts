import { ref, watch } from "vue";
import { Enemie, Player, SavedPlayer } from "../types";
import { field, stop as stopGame } from "./game";
import { norVec } from "./vector";
import { remove as removeEnemie } from "./enemies";
import { secondsToTicks } from "./helpers";
import { defaultGameObject } from "./gameObject";
import { details as detailsSkill } from "./skills";
import { setSavedPlayer } from "./api";
import { getSavedPlayer } from "./api";
import { details as detailsWeapon } from "./weapon";
import { details as detailsSpaceShip } from "./spaceShip";
import { getMultiplier } from "./multiplier";

export const savedPlayer = ref<SavedPlayer>(getSavedPlayer())
export const player = ref<Player>({
    ...defaultGameObject(),
    ...detailsSpaceShip.value[savedPlayer.value.spaceShip.owned[savedPlayer.value.spaceShip.selected].stats],
    img: savedPlayer.value.spaceShip.owned[savedPlayer.value.spaceShip.selected].img,
    hp: 0,
    energy: 0,
    cooldowns: {},
    effects: {},
})


watch(
    () => savedPlayer.value,
    (newValue, oldValue) => {
        setSavedPlayer(savedPlayer.value);
    },
    { deep: true }
);

export const actions = ref({} as { [key: string]: number })
export function reset() {
    player.value.cords = {
        x: field.size.x / 2 - player.value.size / 2,
        y: field.size.y / 2 - player.value.size / 2
    }
    const stats = detailsSpaceShip.value[savedPlayer.value.spaceShip.owned[savedPlayer.value.spaceShip.selected].stats]
    player.value.size = stats.size * getMultiplier("playerSize")
    player.value.hpMax = stats.hpMax
    player.value.hp = player.value.hpMax
    player.value.energyMax = stats.energyMax + detailsSkill.value[0].multiplier(savedPlayer.value.skills[0])
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

        player.value.cords[e] += player.value.moveVector[e] * player.value.speed * getMultiplier("playerSpeed")
        if (player.value.cords[e] < 0) player.value.cords[e] = 0
        if (player.value.cords[e] > field.size[e] - player.value.size) player.value.cords[e] = field.size[e] - player.value.size
    }
    if (player.value.moveVector.x != 0 || player.value.moveVector.y != 0) {
        actions.value["move"] = (actions.value["move"] || 0) + player.value.speed
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
    player.value.cooldowns["shot"] = detailsWeapon.value[savedPlayer.value.weapons.selected].cooldown * getMultiplier("reloadSpeed")
    detailsWeapon.value[savedPlayer.value.weapons.selected].shot()
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
    }, (5000 / player.value.energyMax) * getMultiplier("chargeSpeed"));

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