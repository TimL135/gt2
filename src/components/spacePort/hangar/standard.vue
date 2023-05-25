<template>
    <button v-for="standard of savedPlayer[standardProp].owned" class="btn mb-1 me-1"
        :class="savedPlayer[standardProp].selected == standard ? 'btn-success' : 'btn-primary'"
        :title="details[standardProp][standard]?.description" @click="savedPlayer[standardProp].selected = standard">
        {{ details[standardProp][standard].name }}
    </button>
</template>
<script setup lang='ts'>
import { ref, toRefs } from 'vue';
import { savedPlayer } from '../../../ts/player';
import { details as weapons } from '../../../ts/weapon';
import { details as passivs } from '../../../ts/passivs';
const details = ref({
    passivs,
    weapons
})

const props = withDefaults(
    defineProps<{
        standardProp: "weapons" | "passivs"
    }>(), {}
);
const { standardProp } = toRefs(props)

</script>
<style scoped></style>