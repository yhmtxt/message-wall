<script setup>
    import { storeToRefs } from "pinia"
    import useToastsStore from "@/stores/toasts"

    const { toastQueue } = storeToRefs(useToastsStore())
</script>
<template>
    <div id="toasts">
        <div class="toast" v-for="toast in toastQueue" :class="toast.level">
            {{ toast.content }}
        </div>
    </div>
</template>
<style>
    #toasts {
        position: fixed;
        top: 0px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        z-index: 1000;
    }
    #toasts .toast {
        width: 65%;
        height: 50px;
        line-height: 50px;
        padding: 10px 20px;
        border-radius: 8px;
        margin: 0 auto;
        box-shadow: 0px 0px 5px grey;
    }
    #toasts .info {
        background-color: white;
    }
    #toasts .warning {
        background-color: gold;
        color: white;
    }
    #toasts .error {
        background-color: red;
        color: white;
    }
</style>
