<template>
    <div class="d-flex justify-content-center">
        <div v-for="crystal of Object.entries(savedPlayer[crystalProp].owned) as [string, Type.TimeCrystal | Type.PowerCrystal][]"
            class="border mb-1 p-1 me-1" :class="+crystal[0] == savedPlayer[crystalProp].selected ? 'border-dark' : ''"
            @click="selectedCrystal(+crystal[0])">
            <div v-for="stat of Object.keys(crystal[1]) as (keyof (Type.TimeCrystal | Type.PowerCrystal))[]" class="mb-1"
            v-html="showText(showStatCrystal(+crystal[0], stat, crystalProp))"
            >
            </div>
            <button class="btn btn-danger" @click.stop="sellCrystal(+crystal[0])">sell</button>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { toRefs } from 'vue';
import { savedPlayer } from '../../../ts/player';
import { showStatCrystal } from "../../../ts/crystals"
import * as Type from '../../../types';
import { showText } from '@/ts/generel/text';

const props = withDefaults(
    defineProps<{
        crystalProp: "timeCrystal" | "powerCrystal"
    }>(), {}
);
const { crystalProp } = toRefs(props)
function selectedCrystal(id: number) {
    savedPlayer.value[crystalProp.value].selected = id
}

function sellCrystal(id: number) {
    if (id == savedPlayer.value[crystalProp.value].selected) return
    savedPlayer.value.currency += 20 * Object.keys(savedPlayer.value[crystalProp.value].owned[id]).length
    delete savedPlayer.value[crystalProp.value].owned[id]
}
</script>
<style scoped></style>