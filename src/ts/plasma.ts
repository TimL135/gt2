import { ref } from "vue";
import { Plasma } from "../types";
import { speedConstant, generalSize } from "./config";
import { getRandomInt } from "./helpers";
import { player } from "./player";
import { angleToDirectionVector } from "./vector";

export const plasmas = ref<Plasma[]>([])
export function spawn() {
    const plasma = {
        cords: { ...player.value.cords },
        moveVector: angleToDirectionVector(player.value.direction),
        img: 'plasma',
        size: 50 * generalSize,
        speed: 6,
        direction: 0,
        damage: 1,
        move: (plasma: Plasma) => {
            for (const e of ["x", "y"] as const) {
                plasma.cords[e] += plasma.moveVector[e] * plasma.speed * speedConstant;
            }

        },
        id: getRandomInt(100000)
    } as Plasma
    plasmas.value.push(plasma)
}

