import { ref } from "vue";
import { Point, Vector } from "../types";
import { secondsToTicks } from "./generel/helpers";

export const points = ref([] as Point[])

export function addPoint(amount: number, type: string, cords: Vector, lifeDuration = secondsToTicks(1)) {
    points.value.push({
        amount: Math.ceil(amount),
        type,
        cords,
        lifeDuration
    })
}

export function decreasePointsLifeDuration() {
    points.value.forEach(e => e.lifeDuration -= +!!e.lifeDuration)
    points.value = points.value.filter(e => e.lifeDuration > 0)
}

export function clearPoints() {
    points.value = []
}