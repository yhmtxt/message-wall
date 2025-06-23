<script setup>
    import { ref } from "vue"
    import { useRouter } from "vue-router"

    import axiosIns from "@/axios"
    import useToastsStore from "@/stores/toasts"
    import useUserStore from "@/stores/user"
    import FormArea from "@/components/FormArea.vue"
    import InputBox from "@/components/InputBox.vue"
    import Button from "@/components/Button.vue"

    const router = useRouter()

    const toasts = useToastsStore()
    const user = useUserStore()

    const name = ref("")
    const password = ref("")
    async function signIn() {
        let formData = new FormData()
        formData.append("grant_type", "password")
        formData.append("username", name.value)
        formData.append("password", password.value)
        try {
            let response = await axiosIns.post("/sign_in", formData)
            user.setToken(response.data.access_token)
            toasts.add("登录成功")
            router.push({ name: "home" })
        } catch (error) {
            if (error.status === 401) {
                toasts.add("用户名或密码不正确", toasts.Level.ERROR)
            } else {
                toasts.add("登录失败，请稍后再试", toasts.Level.ERROR)
            }
        }
    }
</script>

<template>
    <FormArea id="sign-in-area">
        <div class="item">
            <h1>登录</h1>
        </div>
        <div class="item">
            <h2>用户名</h2>
            <InputBox v-model="name" placeholder="请输入用户名" />
        </div>
        <div class="item">
            <h2>密码</h2>
            <InputBox type="password" v-model="password" placeholder="请输入密码" />
        </div>
        <div class="item">
            <Button value="登录" @click="signIn" />
        </div>
    </FormArea>
</template>

<style>
    #sign-in-area .item h1 {
        margin: 0;
        text-align: center;
    }
    #sign-in-area .item h2 {
        margin: 10px 0px;
    }
</style>
