import { ref } from "vue";
import { skillDetail } from "../types";

export const skillTrees = ref([
    {
        name: "tree0",
        id: 0
    },
    {
        name: "tree1",
        id: 1
    },
])
export const details = ref({
    [-1]: {
        name: "-1",
        description: "0",
        skillTreeId: 0,
        usedPointsNeed: 0,
        maxLvl: 0,
        multiplier: (lvl: number) => lvl
    } as skillDetail,
    0: {
        name: "0",
        description: "0",
        skillTreeId: 0,
        usedPointsNeed: 0,
        maxLvl: 0,
        multiplier: (lvl: number) => lvl
    } as skillDetail,
    1: {
        name: "1",
        description: "0",
        skillTreeId: 0,
        usedPointsNeed: 0,

        maxLvl: 0,
        multiplier: (lvl: number) => lvl
    } as skillDetail,
    2: {
        name: "2",
        description: "0",
        skillTreeId: 0,
        usedPointsNeed: 1,
        required: {
            skillId: 1,
            skillLvl: 0
        },
        maxLvl: 0,
        multiplier: (lvl: number) => lvl
    } as skillDetail,

    4: {
        name: "4",
        description: "0",
        skillTreeId: 0,
        usedPointsNeed: 1,
        maxLvl: 0,
        multiplier: (lvl: number) => lvl
    } as skillDetail,
    3: {
        name: "3",
        description: "0",
        skillTreeId: 0,
        usedPointsNeed: 1,
        required: {
            skillId: 0,
            skillLvl: 0
        },
        maxLvl: 0,
        multiplier: (lvl: number) => lvl
    } as skillDetail,
}) 
