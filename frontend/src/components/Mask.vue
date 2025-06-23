<script setup>
    import { storeToRefs } from "pinia"

    import useMaskStore from "@/stores/mask"

    const { isDisplayed } = storeToRefs(useMaskStore())
</script>
<template>
    <div id="mask" v-show="isDisplayed"></div>
</template>
<style>
    #mask {
        position: fixed;
        top: 0px;
        background-color: black;
        opacity: 0.5;
        width: 100%;
        height: 100%;
        z-index: 800;
    }
</style>
