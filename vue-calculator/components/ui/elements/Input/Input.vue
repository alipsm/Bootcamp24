<script setup>
defineProps(["inputId","prevInputId","markId","uiType","value","click"])
</script>
<template>
        <p :id="[prevInputId]" :class="[$style.prev_num]"></p>
        <div :class="[$style.result_input_container]">
            <span :id="[markId]"></span>
            <input type="text" name=""  :id="[inputId]" :class="[$style.input_base]" dir="rtl" readonly>
        </div>
</template>
<style module lang="scss">
@import url("./styles/index.module.scss");
</style>