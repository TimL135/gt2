<template>
    <button v-for="element of elements" class="me-1 btn btn-primary mb-1" :title="element[1].description"
        @click="buy(+element[0])">
        <p>{{ element[1].name }}</p>
        <p class="m-0">cost: {{ Math.round(cost[item] * getMultiplier("discount")) }}</p>
    </button>
</template>
<script setup lang='ts'>
import { computed, toRefs } from 'vue';
import { details as abilitys } from '../../ts/abilitys';
import { details as passivs } from '../../ts/passivs';
import { details as weapons } from '../../ts/weapon';
import { savedPlayer } from '../../ts/player';
import { cost } from '../../ts/generel/config';
import { getMultiplier } from '../../ts/multiplier';

const props = withDefaults(
    defineProps<{
        item: 'weapons' | 'passivs' | 'abilitys',
    }>(), {}
);
const { item } = toRefs(props)

const details = computed(() => {
    switch (item.value) {
        case 'weapons':
            return weapons.value
        case 'passivs':
            return passivs.value
        case 'abilitys':
            return abilitys.value
    }
})

const elements = computed(() =>
    Object.entries(details.value).filter((e) => !savedPlayer.value[item.value].owned.includes(+e[0]))
)

function buy(id: number) {
    if (savedPlayer.value.currency >= Math.round(cost[item.value] * getMultiplier("discount"))) {
        savedPlayer.value.currency -= Math.round(cost[item.value] * getMultiplier("discount"))
        savedPlayer.value[item.value].owned.push(id)
    }
}
</script>
<style scoped></style>