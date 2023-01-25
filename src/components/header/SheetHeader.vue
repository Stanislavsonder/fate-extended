<template>
<header>
	<SaveLoadFeature/>
</header>
</template>

<script lang="ts">
import SaveLoadFeature from "@/components/header/SaveLoadFeature/SaveLoadFeature.vue";
import { defineComponent } from "vue";

export default defineComponent({
	name: "SheetHeader",
	emits: ['character-loaded', 'clear'],
	components: {SaveLoadFeature},
})
</script>
