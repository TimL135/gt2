import { ref } from "vue";

export const info = ref<{ [key: string]: string }>({})

export function updateInfo(key: string, value: string) {
    info.value[key] = value
}
export function resetInfo() {
    info.value = {}
}