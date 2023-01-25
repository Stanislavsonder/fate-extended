<template>
<button
    class="config-button"
    :class="{'config-button--transparent': transparent}">
    <component :is="type"/>
</button>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Buttons from './icons'

export default defineComponent({
    name: "ConfigButton",
    components: { ...Buttons },
    props: {
        type: {
            type: String,
            required: true
        },
        transparent: {
            type: Boolean,
            default: false
        }
    }

})
</script>

<style lang="scss">
.config-button {
    display: grid;
    place-content: center;
    box-sizing: border-box;
    border: none;
    height: 24px;
    width: 24px;
    border-radius: 100%;
    background-color: white;
    cursor: pointer;
    transition: background-color 0.15s ease-out;

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    &--transparent {
        background-color: transparent;
    }

    &--transparent & {

    }

    & > svg {
        width: 14px;
        height: 14px;
    }
}
</style>
