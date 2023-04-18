import { gameTicks } from "./config";

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function secondsToTicks(sec: number) {
    return Math.round(gameTicks * sec)
}
export function percent(number: number, change: "in" | "de" | "const") {
    if (change == "in") return (number + 100) / 100;
    if (change == "de") return Math.exp(-0.015 * number);
    return 1;
}
export function createId() {
    return +Math.random().toString().substring(2)
}