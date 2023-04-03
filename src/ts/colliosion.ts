import { Player, Enemie, Item, Plasma } from "../types";
import { lenVecSqrt, subVec, addVec } from "./vector"
import { enemies, hitPlasma as hitPlasmaEnemie } from "./enemies";
import { player, enemieHit as enemieHitPlayer } from "./player";
import { collectItem, items } from "./items";
import { plasmas } from "./plasma";

export function collisions() {
    collisionPlayerEnemies()
    colliosionPlasmaEnemies()
    colliosionPlayerItems()
}

export function collisionsCheck(
    object1: Player | Enemie | Item | Plasma,
    object2: Player | Enemie | Item | Plasma,
) {
    return (
        lenVecSqrt(subVec(addVec(object1.cords, object1.size / 2), addVec(object2.cords, object2.size / 2))) <
        (object1.size / 2 + object2.size / 2) ** 2
    );
}
function collisionPlayerEnemies() {
    for (const enemie of enemies.value) {
        if (collisionsCheck(player.value, enemie)) enemieHitPlayer(enemie)
    }
}
function colliosionPlasmaEnemies() {
    for (const enemie of enemies.value) {
        for (const plasma of plasmas.value) {
            if (collisionsCheck(plasma, enemie)) {
                hitPlasmaEnemie(enemie)
                break
            }
        }
    }
}

function colliosionPlayerItems() {
    for (const item of items.value) {
        if (collisionsCheck(player.value, item)) collectItem(item)
    }
} 