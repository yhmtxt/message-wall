import axios from "axios"

import pinia from "./stores"
import useUserStore from "./stores/user"

const user = useUserStore(pinia)

const axiosIns = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
})

axiosIns.interceptors.request.use(config => {
    let token = user.token
    if (token !== null) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
})

export default axiosIns
