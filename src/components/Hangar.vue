<template>
    <div class="d-flex justify-content-center px-2">
        <div v-for="spaceShip of Object.entries(savedPlayer.spaceShip.owned)" class="border p-1 me-1"
            :class="+spaceShip[0] == savedPlayer.spaceShip.selected ? 'border-dark' : ''" @click="selected(+spaceShip[0])">
            <div :class="spaceShip[1].img" class="img"></div>
            <div v-for="stat of Object.entries(details[spaceShip[1].stats]) ">
                {{ stat[0] }}: {{ stat[1] }}
            </div>
            <button class="btn btn-danger" @click="sell(+spaceShip[0])">sell</button>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../ts/player';
import { details } from '../ts/spaceShip';
function selected(id: number) {
    savedPlayer.value.spaceShip.selected = id
}
function sell(id: number) {
    if (id == savedPlayer.value.spaceShip.selected) return
    delete savedPlayer.value.spaceShip.owned[id]
}
</script>
<style scoped>
.img {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 50px;
}
</style>