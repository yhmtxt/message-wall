import { ref } from "vue"

function usePopup() {
    const isDisplayed = ref(false)

    function show() {
        isDisplayed.value = true
    }

    function hide() {
        isDisplayed.value = false
    }
    return { isDisplayed, show, hide }
}

export default usePopup
