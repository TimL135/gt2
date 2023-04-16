<template>
    <div>
        <button class="btn btn-primary" @click="buy()">
            <p> buy</p>
            <p class="m-0">cost: {{ Math.round(cost.spaceShip * getMultiplier("discount")) }}</p>
        </button>
    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../../ts/player';
import { imgs, details } from '../../ts/spaceShip';
import { getRandomInt } from '../../ts/generel/helpers';
import { cost } from '../../ts/generel/config';
import { getMultiplier } from '../../ts/multiplier';

function buy() {
    if (Object.keys(savedPlayer.value.spaceShip.owned).length < 5 && savedPlayer.value.currency >= Math.round(cost.spaceShip * getMultiplier("discount"))) {
        savedPlayer.value.currency -= Math.round(cost.spaceShip * getMultiplier("discount"))
        savedPlayer.value.spaceShip.owned[getRandomInt(100000)] = {
            stats: +Object.keys(details.value)[getRandomInt(Object.keys(details.value).length)],
            img: getRandomInt(imgs.length),
            statsMultiplier: savedPlayer.value.lvl.lvl + getRandomInt(savedPlayer.value.lvl.lvl)
        }
    }
}
</script>
<style scoped></style>