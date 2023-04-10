<template>
    <div>
        <button class="btn btn-primary" @click="buy()">
            <p> buy</p>
            <p class="m-0">cost: {{ cost }}</p>
        </button>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import { savedPlayer } from '../../ts/player';
import { imgs, details } from '../../ts/spaceShip';
import { getRandomInt } from '../../ts/helpers';
const cost = ref(250)
function buy() {
    if (Object.keys(savedPlayer.value.spaceShip.owned).length < 5 && savedPlayer.value.currency >= cost.value) {
        savedPlayer.value.currency -= cost.value
        savedPlayer.value.spaceShip.owned[getRandomInt(100000)] = {
            stats: +Object.keys(details.value)[getRandomInt(Object.keys(details.value).length)],
            img: imgs[getRandomInt(imgs.length)]
        }
    }
}
</script>
<style scoped></style>