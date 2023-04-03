import { Player, Enemie } from "../types";
import { lenVecSqrt, subVec, addVec } from "./vector"
import { enemies, hitPlasma as hitPlasmaEnemie } from "./enemies";
import { player, enemieHit as enemieHitPlayer } from "./player";
import { plasmas } from "./plasma";

export function collisions() {
    collisionPlayerEnemies()
    colliosionPlasmaEnemies()
}

export function collisionsCheck(
    object1: Player | Enemie,
    object2: Player | Enemie,
) {
    return (
        lenVecSqrt(subVec(addVec(object1.cords, object1.size / 2), addVec(object2.cords, object2.size / 2))) <
        (object1.size / 2 + object2.size / 2) ** 2
    );
}
export function collisionPlayerEnemies() {
    for (const enemie of enemies.value) {
        if (collisionsCheck(player.value, enemie)) enemieHitPlayer(enemie)
    }
}
export function colliosionPlasmaEnemies() {
    for (const enemie of enemies.value) {
        for (const plasma of plasmas.value) {
            if (collisionsCheck(plasma, enemie)) {
                hitPlasmaEnemie(enemie)
                break
            }
        }
    }
}