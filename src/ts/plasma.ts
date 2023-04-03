import { ref } from "vue";
import { Plasma } from "../types";
import { speedConstant } from "./config";
import { getRandomInt } from "./helpers";
import { player } from "./player";
import { angleToDirectionVector } from "./vector";

export const plasmas = ref<Plasma[]>([])
export function spawn() {
    const plasma = {
        cords: { ...player.value.cords },
        moveVector: angleToDirectionVector(player.value.direction),
        img: 'public/img/player/plasma.png',
        size: 50,
        speed: 6,
        direction: 0,
        damage: 1,
        move: (plasma: Plasma) => {
            for (const e of ["x", "y"] as unknown as ["x" | "y"]) {
                plasma.cords[e] += plasma.moveVector[e] * plasma.speed * speedConstant;
            }

        },
        id: getRandomInt(100000)
    }
    plasmas.value.push(plasma)
}

