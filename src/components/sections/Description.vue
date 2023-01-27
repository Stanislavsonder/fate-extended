<template>
    <TextSection
        :title="$t('origin-and-appearance')"
        :model-value="$store.state.characters[$store.state.current].description"
        @update:model-value="update"/>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import TextSection from "@/components/common/TextSection.vue";

export default defineComponent({
    name: "Description",
    components: {
        TextSection
    },
    methods: {
        update(value: string) {
			this.$store.commit('updateDescription', value);
        }
    }


})
</script>
