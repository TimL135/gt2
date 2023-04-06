<template>
    <div class="text-center">
        <div class="mb-2">
            <button v-for="skillTree of skillTrees" @click="tree = skillTree.id" class="me-1 btn btn-secondary">{{
                skillTree.name }}</button>
        </div>
        <template v-for="skillTree of skillTrees">
            <SkillTree v-if="tree == skillTree.id" :treeId="skillTree.id"></SkillTree>
        </template>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import SkillTree from '../components/SkillTree.vue';
import { skillTrees } from '../ts/skills';
const tree = ref(0)
</script>
<style scoped></style>