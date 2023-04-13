<template>
    <div>
        <div style="position: fixed; bottom: 0 ;left:0; z-index: 1;" class="moveButtons">
            <button
                v-for="key of ['moveUp', 'moveUp&&moveLeft', 'moveUp&&moveRight', 'moveDown', 'moveDown&&moveLeft', 'moveDown&&moveRight', 'moveLeft', 'moveRight']"
                :style="`grid-area: ${key}`" class="button" @touchstart="pressButton(key, true)"
                @touchend="pressedKeys[keys[key]] = false">
            </button>
        </div>
    </div>
    <button class="space" style="position: fixed; bottom: 0;left:40vw; z-index: 1;" @touchstart="pressButton('shot', true)"
        @touchend="pressButton('shot', false)">
    </button>
    <div>
        <div style=" position: fixed; bottom: 0;right:0; z-index: 1;" class="abilityButtons">
            <button v-for="key of ['ability', 'ability1', 'ability2', 'ability3']" :style="`grid-area: ${key}`"
                class="button" @touchstart="pressButton(key, true)" @touchend="pressButton(key, false)">
            </button>
        </div>
    </div>
</template >
<script setup lang = 'ts' >
import { keys } from '../ts/config';
import { pressedKeys } from '../ts/game';
function pressButton(buttons: string, touch: boolean) {
    buttons.split("&&").forEach(e => pressedKeys[keys[e]] = touch)
}
</script>
<style scoped>
.moveButtons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        'moveUp&&moveLeft moveUp moveUp&&moveRight'
        'moveLeft . moveRight '
        'moveDown&&moveLeft moveDown moveDown&&moveRight'
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
    opacity: 0.25;
    height: 25vh;
    width: 12.5vw;
}

.space {
    opacity: 0.5;
    height: 15vh;
    width: 30vw;
}
</style>
