<script setup>
import styles from './styles/index.module.scss'
defineProps(["text","uiType","value","click"])

function btnType(type) {
    switch (type) {
        case 'outline':
            return styles.btn_outline_primary
            break;
        case 'primary':
            return styles.btn_primary
            break;
    
        default:
            break;
    }
}
</script>
<template>
    <button :class="[$style.btn_base, btnType(uiType)]">
        {{ text }}
    </button>
    <!-- <input type="button" value="" :> -->
</template>
<style module lang="scss">
@import url("./styles/index.module.scss");
</style>