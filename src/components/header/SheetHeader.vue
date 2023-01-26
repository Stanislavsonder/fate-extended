<template>
<header>
	<SaveLoadFeature/>
	<RollDiceFeature/>
	<LanguageChangerFeature/>
</header>
</template>

<script lang="ts">
import SaveLoadFeature from "@/components/header/SaveLoadFeature/SaveLoadFeature.vue";
import { defineComponent } from "vue";
import LanguageChangerFeature from "@/components/header/LanguageChangerFeature/LanguageChangerFeature.vue";
import RollDiceFeature from "@/components/header/RollDiceFeature/RollDiceFeature.vue";

export default defineComponent({
	name: "SheetHeader",
	emits: ['character-loaded', 'clear'],
	components: {RollDiceFeature, LanguageChangerFeature, SaveLoadFeature},
})
</script>

<style lang="scss" scoped>
header {
	height: 50px;
	padding: 0 16px;
	background-color: #181818;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
