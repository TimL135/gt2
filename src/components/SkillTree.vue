<template>
    <div v-for="tier of tiers">
        <button v-for="skill of tier" class="m-1 btn btn-primary" :title="getTitle(skill)">
            {{ skill.name }}
        </button>
    </div>
</template>
<script setup lang='ts'>
import { computed, toRefs } from 'vue';
import { details as detailsSkill } from '../ts/skills';
import { skillDetail } from '../types';

const props = withDefaults(
    defineProps<{
        treeId: number,
    }>(), {}
);
const { treeId } = toRefs(props)
const tiers = computed(() => {
    const obj = {} as { [key: number]: [string, skillDetail][] }
    const tree = Object.entries(detailsSkill.value).filter(e => e[1].skillTreeId === treeId.value)
    tree.forEach(e => (obj[e[1].usedPointsNeed] = obj[e[1].usedPointsNeed] || []).push(e))
    const arr = Object.keys(obj)
    arr.forEach((key, index) => {
        obj[+key].sort((a, b) => +a[0] - +b[0]);
        obj[+key].forEach((e, i) => {
            if (e[1].required && index > 0) {
                obj[+key].unshift(...obj[+key].splice(i, 1))
                obj[+arr[index - 1]].unshift(...obj[index - 1].splice(obj[index - 1].findIndex(s => +s[0] == e[1].required?.skillId), 1))
            }
        })
    })
    return Object.values(obj).map(arr => arr.map(e => e[1]))
})
function getTitle(skill: skillDetail) {
    return skill.description
}
</script>
<style scoped></style>