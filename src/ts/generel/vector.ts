import { Vector } from "../../types";

export function addVec(vec1: Vector, vec2: Vector | number) {
    if (typeof vec2 == "number")
        return { x: vec1.x + vec2, y: vec1.y + vec2 } as Vector;
    else
        return { x: vec1.x + vec2.x, y: vec1.y + vec2.y } as Vector;
}

export function subVec(vec1: Vector, vec2: Vector | number) {
    if (typeof vec2 == "number")
        return { x: vec1.x - vec2, y: vec1.y - vec2 } as Vector;
    else
        return { x: vec1.x - vec2.x, y: vec1.y - vec2.y } as Vector;
}

export function dirVec(vec1: Vector, vec2: Vector) {
    let deltaArray = subVec(vec1, vec2) as Vector;
    deltaArray = norVec(deltaArray);
    return deltaArray;
}

export function mulVec(vec1: Vector, vec2: Vector | number) {
    if (typeof vec2 == "number")
        return { x: vec1.x * vec2, y: vec1.y * vec2 } as Vector;
    else
        return { x: vec1.x * vec2.x, y: vec1.y * vec2.y } as Vector;
}

export function divVec(vec1: Vector, vec2: Vector | number) {
    if (typeof vec2 == "number")
        return { x: vec1.x / vec2, y: vec1.y / vec2 } as Vector;
    else
        return { x: vec1.x / vec2.x, y: vec1.y / vec2.y } as Vector;
}

export function norVec(vec: Vector) {
    if (lenVec(vec) != 0)
        return divVec(vec, lenVec(vec)) as Vector;
    else
        return { x: 0, y: 0 } as Vector;
}

export function lenVec(vec: Vector) {
    return Math.sqrt(vec.x ** 2 + vec.y ** 2);
}

export function lenVecSqrt(vec: Vector) {
    return vec.x ** 2 + vec.y ** 2;
}

export function rotVec(vec: Vector, angle: number) {
    const helpVec = { ...vec };
    angle /= 180 / Math.PI;
    helpVec.x = vec.x * Math.cos(angle) - vec.y * Math.sin(angle);
    helpVec.y = vec.x * Math.sin(angle) + vec.y * Math.cos(angle);
    console.log(helpVec)
    return helpVec as Vector;
}

export function angleToDirectionVector(angle: number): Vector {
    const radians = angle * Math.PI / 180;
    return { x: Math.sin(radians), y: Math.cos(radians) * -1 };
}