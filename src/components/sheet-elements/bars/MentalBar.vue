<template>
    <MainBar :value="mental">
        <template v-slot:icon>
            <MindIcon/>
        </template>
    </MainBar>
</template>

<script lang="ts">
import MainBar from "@/components/sheet-elements/bars/MainBar.vue";
import MindIcon from "@/components/ui/icons/MindIcon.vue";
import {defineComponent, PropType} from "vue";
import {Mental} from "@/types";

export default defineComponent({
    name: "MentalBar",
    components: {
        MindIcon, MainBar
    },
    props: {
        mental: {
            type: Object as PropType<Mental>,
            required: true
        }
    }
})
</script>
