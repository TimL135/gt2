<template>
    <button v-for="ability of abilitys" class="me-1 btn btn-primary" :title="ability[1].description"
        @click="buy(+ability[0])">
        <p>{{ ability[1].name }}</p>
        <p class="m-0">cost: {{ abilityCost * getMultiplier("discount") }}</p>
    </button>
</template>
<script setup lang='ts'>
import { computed } from 'vue';
import { details } from '../../ts/abilitys';
import { savedPlayer } from '../../ts/player';
import { abilityCost } from '../../ts/config';
import { getMultiplier } from '../../ts/multiplier';
const abilitys = computed(() =>
    Object.entries(details.value).filter((e) => !savedPlayer.value.abilitys.owned.includes(+e[0]))
)

function buy(id: number) {
    if (savedPlayer.value.currency >= abilityCost * getMultiplier("discount")) {
        savedPlayer.value.currency -= abilityCost * getMultiplier("discount")
        savedPlayer.value.abilitys.owned.push(id)
    }
}
</script>
<style scoped></style>