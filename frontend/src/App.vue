<script setup>
    import { ref } from "vue"
    import { RouterView, RouterLink } from "vue-router"

    import axiosIns from "@/axios"
    import useToastsStore from "@/stores/toasts"
    import useUserStore from "@/stores/user"
    import usePopup from "./popup"
    import Toasts from "@/components/Toasts.vue"
    import Mask from "@/components/Mask.vue"
    import PopupArea from "@/components/PopupArea.vue"
    import FormArea from "@/components/FormArea.vue"
    import MultiLineInputBox from "@/components/MultiLineInputBox.vue"
    import Button from "@/components/Button.vue"

    const toasts = useToastsStore()
    const user = useUserStore()

    user.loadToken()

    const {
        isDisplayed: isLeavingMessagePopupDisplayed,
        show: showLeavingMessagePopup,
        hide: hideLeavingMessagePopup,
    } = usePopup()

    const content = ref("")

    async function leaveMessage() {
        try {
            await axiosIns.post("/messages", { content: content.value })
            content.value = ""
            hideLeavingMessagePopup()
            toasts.add("发送成功")
        } catch (error) {
            if (error.status === 401) {
                hideLeavingMessagePopup()
                toasts.add("登录失效，请重新登录", toasts.Level.ERROR)
                user.clearToken()
                router.push({ name: "signIn" })
            } else {
                toasts.add("发送失败，请稍后再试", toasts.Level.ERROR)
            }
        }
    }
</script>

<template>
    <Toasts />
    <Mask />
    <PopupArea id="leave-message-popup" v-if="isLeavingMessagePopupDisplayed">
        <FormArea>
            <div class="item">
                <h1>留言</h1>
            </div>
            <div class="item">
                <MultiLineInputBox v-model="content" style="height: 200px" />
            </div>
            <div class="item button-area">
                <Button value="发送" @click="leaveMessage()" />
                <Button value="取消" @click="hideLeavingMessagePopup()" />
            </div>
        </FormArea>
    </PopupArea>
    <div id="navbar">
        <RouterLink :to="{ name: 'home' }">
            <h1>留言墙</h1>
        </RouterLink>
        <div class="button-area">
            <template v-if="!user.token">
                <RouterLink :to="{ name: 'signIn' }">
                    <Button value="登录" />
                </RouterLink>
                <RouterLink :to="{ name: 'signUp' }">
                    <Button value="注册" />
                </RouterLink>
            </template>
            <template v-else>
                <RouterLink :to="{ name: 'user', params: { id: user.info.id } }">
                    <Button :value="user.info.name" class="user-name" />
                </RouterLink>
                <Button value="留言" @click="showLeavingMessagePopup()" />
            </template>
        </div>
    </div>
    <div id="main">
        <RouterView />
    </div>
</template>

<style scoped>
    #leave-message-popup {
        margin-top: 20px;
    }
    #leave-message-popup h1 {
        margin: 0;
        text-align: center;
    }
    #leave-message-popup .button-area {
        display: flex;
        gap: 10px;
    }
    #navbar {
        position: fixed;
        top: 0px;
        background-color: #2196f3;
        color: white;
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        box-shadow: 0px 0px 10px #003366;
        z-index: 100;
    }
    #navbar h1 {
        font-size: 30px;
        margin: 0;
    }
    #navbar .button-area {
        display: flex;
        gap: 15px;
        align-items: center;
        position: absolute;
        top: 0px;
        right: 15px;
        height: 100%;
    }
    #navbar .button-area .user-name {
        background-color: inherit;
        color: inherit;
        border: 2px solid white;
        box-sizing: border-box;
    }
    #navbar .button-area .user-name:hover {
        background-color: white;
        color: #2196f3;
    }
    #main {
        margin-top: 80px;
    }
</style>
