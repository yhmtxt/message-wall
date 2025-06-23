<script setup>
    import { computed } from "vue"
    import { RouterLink } from "vue-router"

    const props = defineProps({
        userId: String,
        userName: String,
        timeStamp: Number,
        content: String,
    })

    const localTime = computed(() => {
        let time = new Date(props.timeStamp * 1000)

        let year = time.getFullYear()
        let month = (time.getMonth() + 1).toString().padStart(2, "0")
        let date = time.getDate().toString().padStart(2, "0")
        let hours = time.getHours().toString().padStart(2, "0")
        let minutes = time.getMinutes().toString().padStart(2, "0")

        return `${year}年${month}月${date}日 ${hours}:${minutes}`
    })
</script>

<template>
    <div class="message">
        <div class="user-name">
            <RouterLink :to="{ name: 'user', params: { id: userId } }">{{ userName }}</RouterLink>
        </div>
        <div class="content">
            {{ content }}
        </div>
        <div class="time">{{ localTime }}</div>
    </div>
</template>

<style>
    .message {
        display: flex;
        flex-direction: column;
        gap: 5px;
        justify-content: space-between;
        background-color: #e0f7fa;
        padding: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow-wrap: break-word;
        box-sizing: border-box;
    }
    .message .user-name {
        font-size: 20px;
        color: #2196f3;
    }
    .message .content {
        flex: 1;
    }
    .message .time {
        font-size: 12px;
        color: #666666;
    }
</style>
