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
            <button v-for="key of ['ability0', 'ability1', 'ability2', 'ability3']" :style="`grid-area: ${key}`"
                class="button" @touchstart="pressButton(key, true)" @touchend="pressButton(key, false)">
            </button>
        </div>
    </div>
</template >
<script setup lang = 'ts' >
import { pressedKeys } from '../ts/game';

import Joystick from 'vue-joystick-component'
import { savedPlayer } from '../ts/player';

const stop = () => ['moveUp', 'moveDown', 'moveLeft', 'moveRight'].forEach(e => pressedKeys[savedPlayer.value.settings.keys[e]] = false)
const move = ({ x, y }) => {
    const keys = savedPlayer.value.settings.keys
    pressedKeys[keys.moveUp] = false
    pressedKeys[keys.moveDown] = false
    pressedKeys[keys.moveLeft] = false
    pressedKeys[keys.moveRight] = false
    if (y > 0.5) {
        pressedKeys[keys.moveUp] = true
    } else if (y < -0.5) {
        pressedKeys[keys.moveDown] = true
    }
    if (x < -0.5) {
        pressedKeys[keys.moveLeft] = true
    } else if (x > 0.5) {
        pressedKeys[keys.moveRight] = true
    }
}

function pressButton(button: string, touch: boolean) {
    pressedKeys[keys[button]] = touch
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
