<script setup>
    const model = defineModel({ required: true })

    const { type = "text" } = defineProps({
        type: {
            validator(value, props) {
                return ["text", "password"].includes(value)
            },
            default: "text",
        },
    })
</script>

<template>
    <input :type="type" class="input-box" v-model="model" />
</template>

<style>
    .input-box {
        width: 100%;
        height: 50px;
        padding: 5px 10px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 15px;
    }
    .input-box:focus {
        outline: 2px solid #353535;
    }
</style>
