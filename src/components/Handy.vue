<template>
    <div>
        <div style="position: fixed; bottom: 0 ;left:0; z-index: 1;" class="moveButtons">
            <button v-for="key of ['moveUp', 'moveDown', 'moveLeft', 'moveRight']" :style="`grid-area: ${key}`"
                class="button" @touchstart="pressedKeys[keys[key]] = true" @touchcancel="pressedKeys[keys[key]] = false"
                @touchend="pressedKeys[keys[key]] = false">
            </button>
        </div>
    </div>
    <button class="space" style="position: fixed; bottom: 0;left:40vw; z-index: 1;" @touchstart="pressedKeys[' '] = true"
        @touchcancel="pressedKeys[' '] = false" @touchend="pressedKeys[' '] = false"></button>
    <div>
        <div style="position: fixed; bottom: 0;right:0; z-index: 1;" class="abilityButtons">
            <button v-for="key of ['ability', 'ability1', 'ability2', 'ability3']" :style="`grid-area: ${key}`"
                class="button" @touchstart="pressedKeys[keys[key]] = true" @touchcancel="pressedKeys[keys[key]] = false"
                @touchend="pressedKeys[keys[key]] = false">
            </button>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { keys } from '../ts/config';
import { pressedKeys } from '../ts/game';
</script>
<style scoped>
.moveButtons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        '. moveUp .'
        'moveLeft . moveRight '
        '. moveDown.'
    ;
}

.abilityButtons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        '. ability .'
        'ability1 . ability2 '
        '. ability3 .'
    ;
}

.button {
    opacity: 0.5;
    height: 20vh;
    width: 10vw;
}

.space {
    opacity: 0.5;
    height: 10vh;
    width: 20vw;
}
</style>