<template>
    <button v-for="standard of savedPlayer[standardProp].owned" class="btn mb-1 me-1"
        :class="savedPlayer[standardProp].selected == standard ? 'btn-success' : 'btn-primary'"
        :title="details[`details${standardProp}`][standard]?.description" @click="savedPlayer.weapons.selected = standard">
        {{ details[`details${standardProp}`][standard].name }}
    </button>
</template>
<script setup lang='ts'>
import { ref, toRefs } from 'vue';
import { savedPlayer } from '../../../ts/player';
import { details as detailsweapons } from '../../../ts/weapon';
import { details as detailspassivs } from '../../../ts/passivs';
const details = ref({
    detailspassivs,
    detailsweapons
})

const props = withDefaults(
    defineProps<{
        standardProp: "weapons" | "passivs"
    }>(), {}
);
const { standardProp } = toRefs(props)

</script>
<style scoped></style>