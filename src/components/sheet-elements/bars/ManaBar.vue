<template>
    <div class="main-bar">
        <div class="main-bar__numbers">
            <span class="main-bar__icon">
               <ManaIcon/>
            </span>
            <h6>{{ mana.current }} / {{ mana.max }}</h6>
        </div>
        <div :style="{ background: bg }" class="main-bar__bar">
            <span class="main-bar__bubbles"/>
            <span
                v-if="percent > 10"
                class="main-bar__threshold main-bar__threshold--high"/>
            <span
                v-if="percent > 25"
                class="main-bar__threshold main-bar__threshold--medium"/>
            <span
                v-if="percent > 50"
                class="main-bar__threshold main-bar__threshold--light"/>
        </div>
    </div>
</template>

<script lang="ts">
import ManaIcon from "@/components/ui/icons/ManaIcon.vue";
import {defineComponent, PropType} from "vue";
import {Mana} from "@/types";

export default defineComponent({
    name: "ManaBar",
    components: {ManaIcon},
    props: {
        mana: {
            type: Object as PropType<Mana>,
            required: true
        }
    },
    computed: {
        percent() {
            return this.mana.current / this.mana.max * 100
        },
        bg() {
            return `linear-gradient(90deg, #181818 0%, #181818 ${this.percent}%, transparent ${this.percent}%)`
        }
    },
})
</script>

<style scoped lang="scss">
.main-bar {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 20px;
    width: 100%;

    &__numbers {
        position: relative;
        display: flex;
        justify-content: flex-end;
        padding: 0 10px;
        box-sizing: border-box;
        width: 150px;
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        border: 2px solid black;

        &:before {
            content: "";
            position: absolute;
            left: 0;
            width: 10px;
            height: 18px;
            background-color: white;
            top: -2px;
            z-index: 0;
            transform: translateX(-50%);
        }
    }

    &__icon {
        position: absolute;
        left: 0;
        top: 0;
        transform: translateX(-50%) scale(1.5);
    }

    &__bubbles {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        background-image: url("/public/img/bubbles.svg");
        background-size: 80%;
        background-repeat: repeat-x;
    }

    &__bar {
        position: relative;
        height: 100%;
        box-sizing: border-box;
        width: calc(100% - 150px);
        border: 2px solid black;
        border-radius: 0 5px 5px 0;
    }
}
</style>
