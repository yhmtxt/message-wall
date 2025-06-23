<script setup>
    const model = defineModel({ required: true })
</script>

<template>
    <textarea v-model="model" class="multi-line-input-box"></textarea>
</template>

<style>
    .multi-line-input-box {
        width: 100%;
        padding: 10px 10px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 15px;
    }
    .multi-line-input-box:focus {
        outline: 2px solid #353535;
    }
</style>
