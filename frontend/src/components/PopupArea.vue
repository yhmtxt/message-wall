<script setup>
    import { onMounted, onUnmounted } from "vue"

    import useMaskStore from "@/stores/mask"

    const mask = useMaskStore()

    onMounted(() => {
        mask.use()
    })
    onUnmounted(() => {
        mask.free()
    })
</script>
<template>
    <div class="popup-area">
        <slot></slot>
    </div>
</template>
<style>
    .popup-area {
        position: fixed;
        top: 0px;
        width: 100%;
        z-index: 900;
    }
</style>
