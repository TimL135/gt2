<template>
    <button v-for="passiv of passivs" class="me-1 btn btn-primary" :title="passiv[1].description" @click="buy(+passiv[0])">
        <p>{{ passiv[1].name }}</p>
        <p class="m-0">cost: {{ Math.round(passivsCost * getMultiplier("discount")) }}</p>
    </button>
</template>
<script setup lang='ts'>
import { computed } from 'vue';
import { details } from '../../ts/passivs';
import { savedPlayer } from '../../ts/player';
import { passivsCost } from '../../ts/config';
import { getMultiplier } from '../../ts/multiplier';
const passivs = computed(() =>
    Object.entries(details.value).filter((e) => !savedPlayer.value.passivs.owned.includes(+e[0]))
)

function buy(id: number) {
    if (savedPlayer.value.currency >= Math.round(passivsCost * getMultiplier("discount"))) {
        savedPlayer.value.currency -= Math.round(passivsCost * getMultiplier("discount"))
        savedPlayer.value.abilitys.owned.push(id)
    }
}
</script>
<style scoped></style>