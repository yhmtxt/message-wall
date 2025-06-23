import { ref, computed } from "vue"
import { defineStore } from "pinia"

const useMaskStore = defineStore("mask", () => {
    const referenceCount = ref(0)
    const isDisplayed = computed(() => Boolean(referenceCount.value))
    function use() {
        referenceCount.value++
    }
    function free() {
        if (referenceCount.value > 0) {
            referenceCount.value--
        }
    }
    return { referenceCount, isDisplayed, use, free }
})

export default useMaskStore
