import { ref } from "vue";
import { Plasma, WeaponDetail, WeaponDetails } from "../types";
import { speedConstant } from "./generel/config";
import { angleToDirectionVector, rotVec } from "./generel/vector";
import { player } from "./player";
import { spawn } from "./plasma";
import { secondsToTicks } from "./generel/helpers";
import { getMultiplier } from "./multiplier";
function defaultMove(plasma: Plasma) {
    for (const e of ["x", "y"] as const) {
        plasma.cords[e] += plasma.moveVector[e] * ((player.value.speed * getMultiplier("playerSpeed")) + (plasma.speed * speedConstant.value));
    }
}
export const details = ref<WeaponDetails>({
    0: {
        name: 'standard',
        description: 'the standard gun.',
        damage: 1,
        size: 40,
        speed: 3,
        cooldown: secondsToTicks(1.5),
        getMoveVector: (plasma: Plasma) => plasma.moveVector = angleToDirectionVector(player.value.direction),
        shot: () => { spawn(details.value[0]) },
        move: (plasma: Plasma) => defaultMove(plasma)

    } as WeaponDetail,
    1: {
        name: 'mg',
        description: 'faster reload.',
        damage: 1,
        size: 40,
        speed: 3,
        cooldown: secondsToTicks(1),
        getMoveVector: (plasma: Plasma) => plasma.moveVector = angleToDirectionVector(player.value.direction),
        shot: () => { spawn(details.value[1]) },
        move: (plasma: Plasma) => defaultMove(plasma)
    } as WeaponDetail,
    2: {
        name: 'bazooka',
        description: 'fires a huge powerful plasma ball.',
        damage: 5,
        size: 60,
        speed: 1,
        cooldown: secondsToTicks(4),
        getMoveVector: (plasma: Plasma) => plasma.moveVector = angleToDirectionVector(player.value.direction),
        shot: () => { spawn(details.value[2]) },
        move: (plasma: Plasma) => defaultMove(plasma)
    } as WeaponDetail,
    3: {
        name: 'shotgun',
        description: 'shot 3 plasmas.',
        damage: 0.5,
        size: 20,
        speed: 2,
        cooldown: secondsToTicks(2),
        getMoveVector: (plasma: Plasma, index = 3) => plasma.moveVector = rotVec(angleToDirectionVector(player.value.direction), 15 * (index - 1)),
        shot: () => {
            for (let i = 0; i < 3; i++)
                spawn(details.value[3], i)
        },
        move: (plasma: Plasma) => defaultMove(plasma)
    } as WeaponDetail,
})