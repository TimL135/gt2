<template>
    <button v-for="weapon of Weapons" class="me-1 btn btn-primary" :title="weapon[1].description" @click="buy(+weapon[0])">
        <p>{{ weapon[1].name }}</p>
        <p class="m-0">cost: 500</p>
    </button>
</template>
<script setup lang='ts'>
import { computed } from '@vue/reactivity';
import { details as detailsWeapon } from '../../ts/weapon';
import { savedPlayer } from '../../ts/player';

const Weapons = computed(() =>
    Object.entries(detailsWeapon.value).filter((e) => !savedPlayer.value.weapons.owned.includes(+e[0]))
)
function buy(id: number) {
    if (savedPlayer.value.currency >= 500) {
        savedPlayer.value.currency -= 500
        savedPlayer.value.weapons.owned.push(id)
    }
}
</script>
<style scoped></style>