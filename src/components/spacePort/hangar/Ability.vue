<template>
    <template v-if="!touchscreen">
        <div v-for="(ability, index) of savedPlayer.abilitys.selected" class="px-2 d-flex justify-content-center">
            <select class="form-select mb-1 w-50" v-model="savedPlayer.abilitys.selected[index]"
                :title="detailsAbilitys[ability]?.description">
                <option :value="ability" :title="detailsAbilitys[ability]?.description">{{
                    detailsAbilitys[ability]?.name || "none" }}</option>
                <option v-for="availableAbility of availableAbilitys" :value="availableAbility"
                    :title="detailsAbilitys[availableAbility]?.description">{{
                        detailsAbilitys[availableAbility]?.name }}</option>
                <option :value="-1" v-if="ability != -1">none</option>
            </select>
        </div>
    </template>
    <template v-else>
        <h5>
            available abilitys
        </h5>
        <button v-for="ability of availableAbilitys" class="me-1 mb-1 btn btn-primary border-0"
            :title="detailsAbilitys[ability]?.description" @click="selectedAbility = ability">
            {{ detailsAbilitys[ability].name }}
        </button>
        <div v-if="availableAbilitys.length == 0">
            you have no available abilitys
        </div>
        <h5>
            selected abilitys
        </h5>
        <div>
            <button v-for="(ability, index) of savedPlayer.abilitys.selected" class="btn me-1 mb-1"
                :class="`ability${index}`"
                @click=" selectAbility(index)"
                :title="detailsAbilitys[ability].description">
                {{ detailsAbilitys[ability].name }}
            </button>
        </div>
    </template>
</template>
<script setup lang='ts'>
import { touchscreen } from '@/ts/game';
import { details as detailsAbilitys } from '@/ts/abilitys';
import { savedPlayer } from '@/ts/player';
import { computed, ref } from 'vue';
const availableAbilitys = computed(() => {
    return savedPlayer.value.abilitys.owned.filter(e => !savedPlayer.value.abilitys.selected.includes(e))
})
const selectedAbility = ref(-1)
function selectAbility(index: number) {
    if (selectedAbility.value == -1) return
    savedPlayer.value.abilitys.selected[index] = selectedAbility.value
    selectedAbility.value = -1
}
</script>
<style scoped></style>