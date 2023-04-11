<template>
    <div>
        <button class="btn btn-primary" @click="buy()">
            <p> buy</p>
            <p class="m-0">cost: {{ spaceShipCost }}</p>
        </button>
    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../../ts/player';
import { imgs, details } from '../../ts/spaceShip';
import { getRandomInt } from '../../ts/helpers';
import { spaceShipCost } from '../../ts/config';

function buy() {
    if (Object.keys(savedPlayer.value.spaceShip.owned).length < 5 && savedPlayer.value.currency >= spaceShipCost) {
        savedPlayer.value.currency -= spaceShipCost
        savedPlayer.value.spaceShip.owned[getRandomInt(100000)] = {
            stats: +Object.keys(details.value)[getRandomInt(Object.keys(details.value).length)],
            img: imgs[getRandomInt(imgs.length)]
        }
    }
}
</script>
<style scoped></style>