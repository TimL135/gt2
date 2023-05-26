<template>
    <div style=" position: fixed; bottom: 10%;left:5%; z-index: 1;">
        <Joystick :size="150" base-color="rgba(211, 211, 211, 0.5)" stick-color="rgba(128, 128, 128, 0.5)" :throttle="100"
            @stop="stop" @move="move" />
    </div>
    <button class="space" style="position: fixed; bottom: 10%;left:35vw; z-index: 1;"
        @touchstart="pressButton('shot', true)" @touchend="pressButton('shot', false)">
    </button>
    <div>
        <div style=" position: fixed; bottom: 10%;right:5%; z-index: 1;" class="abilityButtons">
            <button v-for="(key, index) of (['ability0', 'ability1', 'ability2', 'ability3'] as const)"
                :style="`grid-area: ${key}`" class="button"
                :class="isCharging || player.cooldowns[index] ? 'bg-danger' : key" @touchstart="pressButton(key, true)"
                @touchend="pressButton(key, false)">
            </button>
        </div>
    </div>
</template >
<script setup lang = 'ts' >
import { pressedKeys } from '../ts/game';

import Joystick, { JoystickComponent } from 'vue-joystick-component'
import { savedPlayer, player, isCharging } from '../ts/player';
import { Key } from "../types"

const stop = () => (['moveUp', 'moveDown', 'moveLeft', 'moveRight'] as const).forEach(e => pressedKeys[savedPlayer.value.settings.keys[e]] = false)
const move = ({ x, y }: JoystickComponent.UpdateEvent) => {
    const keys = savedPlayer.value.settings.keys
    pressedKeys[keys.moveUp] = false
    pressedKeys[keys.moveDown] = false
    pressedKeys[keys.moveLeft] = false
    pressedKeys[keys.moveRight] = false
    if (y && y > 0.5) pressedKeys[keys.moveUp] = true
    else if (y && y < -0.5) pressedKeys[keys.moveDown] = true
    if (x && x < -0.5) pressedKeys[keys.moveLeft] = true
    else if (x && x > 0.5) pressedKeys[keys.moveRight] = true
}

function pressButton(button: Key, touch: boolean) {
    pressedKeys[savedPlayer.value.settings.keys[button]] = touch
}
</script>
<style scoped>
.abilityButtons {
    display: grid;
    gap: 2px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        '. ability0 .'
        'ability1 . ability2 '
        '. ability3 .'
    ;
}

.button {
    opacity: 0.3;
    height: 15vh;
    width: 7.5vw;
}

.space {
    opacity: 0.5;
    height: 15vh;
    width: 30vw;
}
</style>
