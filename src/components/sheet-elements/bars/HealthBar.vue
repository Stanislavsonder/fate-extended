<template>
    <MainBar :value="$store.state.character.hp">
        <template v-slot:icon>
            <HealthIcon/>
        </template>
    </MainBar>
</template>

<script lang="ts">
import HealthIcon from "@/components/ui/icons/HealthIcon.vue";
import MainBar from "@/components/sheet-elements/bars/MainBar.vue";
import {defineComponent, PropType} from "vue";
import {Health} from "@/types";

export default defineComponent({
    name: "HealthBar",
    components: {
        MainBar,
        HealthIcon
    }
})
</script>
