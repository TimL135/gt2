import { Player, Enemie, Item, Plasma } from "../types";
import { lenVecSqrt, subVec, addVec } from "./generel/vector"
import { enemies, hitPlasma as hitPlasmaEnemie } from "./enemies";
import { player, enemieHit as enemieHitPlayer, enemiePlasmaHit as enemiePlasmaHitPlayer, savedPlayer } from "./player";
import { collectItem, items } from "./items";
import { enemiePlasmas, plasmas } from "./plasma";
import { details as detailsPassiv } from "./passivs";

export function collisions() {
    collisionPlayerEnemies()
    colliosionPlasmaEnemies()
    colliosionPlayerItems()
    collisionPlasmaItem()
    colliosionPlayerPlasmaEnemies()
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
        for (const plasma of [...plasmas.value]) {
            if (collisionsCheck(plasma, enemie)) {
                hitPlasmaEnemie(enemie, plasma)
                plasmas.value.splice(plasmas.value.indexOf(plasma), 1)
                break
            }
        }
    }
}
function collisionPlasmaItem() {
    if (savedPlayer.value.passivs.selected == 1)
        detailsPassiv.value[1].effect()
}
function colliosionPlayerItems() {
    for (const item of items.value) {
        if (collisionsCheck(player.value, item)) collectItem(item)
    }
}
function colliosionPlayerPlasmaEnemies() {
    for (const plasma of enemiePlasmas.value) {
        if (collisionsCheck(player.value, plasma)) enemiePlasmaHitPlayer(plasma)
    }
}