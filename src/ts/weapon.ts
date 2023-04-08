import { ref } from "vue";
import { Plasma, WeaponDetail, WeaponDetails } from "../types";
import { generalSize, speedConstant } from "./config";
import { angleToDirectionVector, rotVec } from "./vector";
import { player } from "./player";
import { spawn } from "./plasma";
import { secondsToTicks } from "./helpers";
function defaultMove(plasma: Plasma) {
    for (const e of ["x", "y"] as const) {
        plasma.cords[e] += plasma.moveVector[e] * plasma.speed * speedConstant;
    }
}
export const details = ref<WeaponDetails>({
    0: {
        name: 'standard',
        description: 'the standard gun.',
        damage: 1,
        size: 40 * generalSize,
        speed: 6,
        cooldown: secondsToTicks(1.5),
        getMoveVector: (plasma: Plasma) => plasma.moveVector = angleToDirectionVector(player.value.direction),
        shot: () => { spawn(details.value[0]) },
        move: (plasma: Plasma) => defaultMove(plasma)

    } as WeaponDetail,
    1: {
        name: 'mg',
        description: 'faster reload.',
        damage: 1,
        size: 40 * generalSize,
        speed: 6,
        cooldown: secondsToTicks(1),
        getMoveVector: (plasma: Plasma) => plasma.moveVector = angleToDirectionVector(player.value.direction),
        shot: () => { spawn(details.value[1]) },
        move: (plasma: Plasma) => defaultMove(plasma)
    } as WeaponDetail,
    2: {
        name: 'bazooka',
        description: 'fires a huge powerful plasma ball.',
        damage: 1,
        size: 60 * generalSize,
        speed: 4,
        cooldown: secondsToTicks(4),
        getMoveVector: (plasma: Plasma) => plasma.moveVector = angleToDirectionVector(player.value.direction),
        shot: () => { spawn(details.value[2]) },
        move: (plasma: Plasma) => defaultMove(plasma)
    } as WeaponDetail,
    3: {
        name: 'shotgun',
        description: 'shot 3 plasmas.',
        damage: 1,
        size: 20 * generalSize,
        speed: 6,
        cooldown: secondsToTicks(2),
        getMoveVector: (plasma: Plasma, index = 3) => plasma.moveVector = rotVec(angleToDirectionVector(player.value.direction), 15 * (index - 1)),
        shot: () => {
            for (let i = 0; i < 3; i++)
                spawn(details.value[3], i)
        },
        move: (plasma: Plasma) => defaultMove(plasma)
    } as WeaponDetail,
})