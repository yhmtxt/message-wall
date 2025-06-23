<script setup>
    import axiosIns from "@/axios"
    import { ref } from "vue"
    import { useRouter } from "vue-router"

    import useToastsStore from "@/stores/toasts"
    import FormArea from "@/components/FormArea.vue"
    import InputBox from "@/components/InputBox.vue"
    import Button from "@/components/Button.vue"

    const router = useRouter()

    const toasts = useToastsStore()

    const name = ref("")
    const password = ref("")
    const confirmPassword = ref("")
    async function signUp() {
        if (password.value === confirmPassword.value) {
            try {
                await axiosIns.post("/sign_up", {
                    name: name.value,
                    password: password.value,
                })
                toasts.add("注册成功，请登录")
                router.push({ name: "signIn" })
            } catch (error) {
                if (error.status === 409) {
                    toasts.add("用户名已存在", toasts.Level.ERROR)
                } else {
                    toasts.add("注册失败，请稍后再试", toasts.Level.ERROR)
                }
            }
        } else {
            toasts.add("输入的密码不匹配", toasts.Level.ERROR)
        }
    }
</script>

<template>
    <FormArea id="sign-up-area">
        <div class="item">
            <h1>注册</h1>
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
            <h2>确认密码</h2>
            <InputBox type="password" v-model="confirmPassword" placeholder="请再次输入密码" />
        </div>
        <div class="item">
            <Button value="注册" @click="signUp()" />
        </div>
    </FormArea>
</template>

<style>
    #sign-up-area .item h1 {
        margin: 0;
        text-align: center;
    }
    #sign-up-area .item h2 {
        margin: 10px 0px;
    }
</style>
