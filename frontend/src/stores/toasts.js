import { ref } from "vue"
import { defineStore } from "pinia"

const useToastsStore = defineStore("toasts", () => {
    const Level = Object.freeze({
        INFO: "info",
        WARNING: "warning",
        ERROR: "error",
    })

    const toastQueue = ref([])

    var lastId = 0

    function add(content, level = Level.INFO) {
        let id = ++lastId
        toastQueue.value.push({ id: id, content: content, level: level })
        setTimeout(() => {
            remove(id)
        }, 1000)
    }

    function remove(id) {
        toastQueue.value = toastQueue.value.filter(toast => toast.id !== id)
    }

    function clear() {
        toastQueue.value = []
    }

    return { Level, toastQueue, add, remove, clear }
})

export default useToastsStore
