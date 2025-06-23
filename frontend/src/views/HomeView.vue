<script setup>
    import { onMounted, onUnmounted, ref } from "vue"

    import useToastsStore from "@/stores/toasts"
    import axiosIns from "@/axios"
    import Message from "@/components/Message.vue"

    const toasts = useToastsStore

    const isLoading = ref(false)
    const messages = ref([])
    const page = ref(1)
    const haveNextPage = ref(false)

    async function loadMessages() {
        isLoading.value = true
        try {
            let result = await axiosIns.get("/messages", { params: { page: page.value } })
            messages.value.push(...result.data.messages)
            haveNextPage.value = result.data.have_next_page
            page.value++
        } catch (error) {
            toasts.add("加载失败，请稍后再试", toasts.Level.ERROR)
        } finally {
            isLoading.value = false
        }
    }

    function infiniteScroll() {
        const scrollTop = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

        if (
            scrollTop + windowHeight > documentHeight - 100 &&
            haveNextPage.value &&
            !isLoading.value
        ) {
            loadMessages()
        }
    }

    onMounted(() => {
        loadMessages()
        window.addEventListener("scroll", infiniteScroll)
    })

    onUnmounted(() => {
        window.removeEventListener("scroll", infiniteScroll)
    })
</script>

<template>
    <div id="messages">
        <Message
            v-for="message in messages"
            :user-id="message.user_id"
            :user-name="message.user_name"
            :time-stamp="message.time_stamp"
            :content="message.content"
        />
    </div>
</template>

<style>
    #messages {
        display: grid;
        width: 95%;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-auto-rows: minmax(125px, auto);
        grid-auto-flow: dense;
        gap: 25px;
        margin: 20px auto;
    }
</style>
