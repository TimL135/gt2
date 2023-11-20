<template>
    <div :title="skillTrees[treeId].getPointsInfo">
        used points: {{ points[0] }}/{{ points[1] }}
    </div>
    <div class="d-flex align-items-center mb-2 flex-column">
        <select class="form-select w-50" aria-label="Default select example" v-model="buyAmount">
            <option v-for="amount of [1, 5, 10, 15, 20]" :value="amount">buy {{ amount }}</option>
        </select>
        <div class="w-50">
            <input class="form-check-input shadow-none" type="checkbox" v-model="savedPlayer.settings.showSkillDeatils"
                id="showDetails">
            <label class="form-check-label ms-2" for="showDetails">
                show details
            </label>
        </div>
    </div>
    <div v-for="tier of tiers">
        <button v-for="skill of tier" @click="buy(+skill[0])" class="shadow-none m-1 btn btn-primary"
            :title="getTitle(skill[1], +skill[0])">
            <p> {{ skill[1].name }}</p>
            <p class="m-0"> {{ savedPlayer.skills[+skill[0]] || 0 }} / {{ detailsSkill[+skill[0]].maxLvl }}</p>
        </button>
    </div>
    <div>
        <button class="btn btn-danger" @click="reset()">
            reset
        </button>
    </div>
</template>
<script setup lang='ts'>
import { computed, ref, toRefs } from 'vue';
import { details as detailsSkill, skillTrees } from '../ts/skills';
import { SkillDetail } from '../types';
import { savedPlayer } from '../ts/player';
import { pressedKeys } from '../ts/game';
import { percent } from '@/ts/generel/helpers';
import { getMultiplier } from '@/ts/multiplier';
percent
getMultiplier
const props = withDefaults(
    defineProps<{
        treeId: number,
    }>(), {}
);
const { treeId } = toRefs(props)
const tiers = computed(() => {
    const obj = {} as { [key: number]: [string, SkillDetail][] }
    const tree = Object.entries(detailsSkill.value).filter(e => e[1].skillTreeId === treeId.value)
    tree.forEach(e => (obj[e[1].usedPointsNeed] = obj[e[1].usedPointsNeed] || []).push(e))
    const arr = Object.keys(obj)
    arr.forEach((key, index) => {
        obj[+key].sort((a, b) => +a[0] - +b[0]);
        obj[+key].forEach((e, i) => {
            if (e[1].required && index > 0) {
                obj[+key].unshift(...obj[+key].splice(i, 1))
                obj[+arr[index - 1]].unshift(...obj[+arr[index - 1]].splice(obj[+arr[index - 1]].findIndex(s => +s[0] == e[1].required?.skillId), 1))
            }
        })
    })
    return obj
})
const points = computed(() => {
    let used = 0
    let keys = Object.keys(tiers.value)
    keys.forEach(k => used += tiers.value[+k].reduce((a, b) => a += (savedPlayer.value.skills[+b[0]] || 0), 0))
    return [used, (savedPlayer.value.points[treeId.value] || 0)]
})
function getTitle(skill: SkillDetail, skillId: number) {
    let text = ""
    if (skill.usedPointsNeed > points.value[0]) text += `you must use ${skill.usedPointsNeed} point${skill.usedPointsNeed > 1 ? 's' : ''}. \n`
    const required = skill.required
    if (required && (savedPlayer.value.skills[required.skillId] || 0) < required.skillLvl)
        text += `you need "${detailsSkill.value[required.skillId].name}" on level ${required.skillLvl}.\n`
    text += skill.description
    if (savedPlayer.value.settings.showSkillDeatils) {
        const s = skill.multiplier.toString().split("computed")[1].slice(0, -1)
        text += `\ndetails \n${(skill.deatils || "")}`
        text += `\ncurrent lvl: ${(eval(s)()).toFixed(2)}`
        if ((savedPlayer.value.skills[skillId] || 0) < skill.maxLvl)
            text += `\nnext lvl: ${(eval(s)(1)).toFixed(2)}`
    }
    return text
}
const buyAmount = ref(20)
function buy(skillId: number) {
    const keys = savedPlayer.value.settings.keys
    if (pressedKeys[keys.buy10]) buyAmount.value = 10
    if (pressedKeys[keys.buy20]) buyAmount.value = 20
    for (let i = 0; i < buyAmount.value; i++) {
        const lvl = savedPlayer.value.skills[skillId] || 0
        if (lvl < detailsSkill.value[skillId].maxLvl && points.value[0] < points.value[1] && points.value[0] >= detailsSkill.value[skillId].usedPointsNeed) {
            const required = detailsSkill.value[skillId].required
            if (required && savedPlayer.value.skills[required.skillId] < required.skillLvl) {
                break
            }
            savedPlayer.value.skills[skillId] = lvl + 1
        } else {
            break
        }
    }
}
function reset() {
    let keys = Object.keys(tiers.value)
    keys.forEach(k => tiers.value[+k].forEach(e => delete savedPlayer.value.skills[+e[0]]))
}
</script>
<style scoped></style>