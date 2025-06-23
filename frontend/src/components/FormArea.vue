<template>
    <div class="form-area">
        <slot></slot>
    </div>
</template>

<style>
    .form-area {
        display: flex;
        flex-direction: column;
        gap: 30px;
        background-color: white;
        width: 600px;
        max-width: 70%;
        padding: 30px 50px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
