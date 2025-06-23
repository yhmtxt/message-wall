import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { jwtDecode } from "jwt-decode"

const useUserStore = defineStore("user", () => {
    const token = ref(null)

    const info = computed(() => {
        try {
            let playload = jwtDecode(token.value)
            return {
                id: playload.sub || null,
                name: playload.name || null,
                exp: playload.exp || null,
            }
        } catch (error) {
            return {
                id: null,
                name: null,
                exp: null,
            }
        }
    })

    function $reset() {
        token.value = null
    }
    function loadToken() {
        let localToken = localStorage.getItem("token")
        if (localToken !== null) {
            token.value = localToken
        }
    }
    function setToken(newToken) {
        token.value = newToken
        localStorage.setItem("token", token.value)
    }
    function clearToken() {
        $reset()
        localStorage.removeItem("token")
    }

    return { token, info, $reset, loadToken, setToken, clearToken }
})

export default useUserStore
