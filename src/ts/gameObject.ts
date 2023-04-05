import { Enemie, Plasma } from "../types";
import { getRandomInt } from "./helpers";
import { generalSize } from "./config";

export function move(array: Enemie[] | Plasma[], multiplier = 1) {
    for (const e of array) {
        e.move(e, multiplier)
        e.direction = Math.atan2(e.moveVector.x, e.moveVector.y * -1) * 180 / Math.PI;
    }
}

export function defaultGameObject() {
    return {
        cords: {
            x: 0,
            y: 0
        },
        moveVector: {
            x: -0,
            y: -0
        },
        size: 50 * generalSize,
        speed: 0,
        direction: 0,
        id: getRandomInt(100000)
    }
}