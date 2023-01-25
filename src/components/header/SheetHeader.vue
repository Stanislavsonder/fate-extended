<template>
<header>
	<SaveLoadFeature :character="character"/>
</header>
</template>

<script lang="ts">
import SaveLoadFeature from "@/components/header/SaveLoadFeature/SaveLoadFeature.vue";
import {defineComponent, PropType} from "vue";
import {Character} from "@/types";

export default defineComponent({
	name: "SheetHeader",
	components: {SaveLoadFeature},
	props: {
		character: {
			type: Object as PropType<Character>,
			required: true
		}
	}
})
</script>
