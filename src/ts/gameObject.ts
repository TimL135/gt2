import { Enemie, Plasma } from "../types";
import { createId } from "./generel/helpers";

export function move(array: Enemie[] | Plasma[]) {
    for (const e of array) {
        e.move(e as Enemie & Plasma);
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
        size: 50,
        speed: 0,
        direction: 0,
        id: createId()
    }
}