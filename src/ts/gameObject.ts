import { Enemie, Plasma } from "../types";
import { createId } from "./generel/helpers";
import { directionVectorToAngle } from "./generel/vector";

export function move(array: Enemie[] | Plasma[]) {
    for (const e of array) {
        e.move(e as Enemie & Plasma);
        e.direction = directionVectorToAngle(e.moveVector);
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