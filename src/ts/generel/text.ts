import { getDamage } from "../player"

export function showText(text: string) {
    return text.split(" ").map(word => map[word] ? map[word] : word).join(" ")
}

const map = {
    increase: '<i class="bi bi-graph-up-arrow text-success"></i>',
    reduces: '<i class="bi bi-graph-down-arrow text-danger"></i>',
    star: '<i class="bi bi-star-fill text-warning"></i>',
    time: '<i class="bi bi-clock"></i>'
}