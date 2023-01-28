<template>
<header>
	<SwitchCharacterFeature/>
	<SaveLoadFeature/>
	<span/>
	<RollDiceFeature/>
	<LanguageChangerFeature/>
</header>
</template>

<script lang="ts">
import SaveLoadFeature from "@/components/header/SaveLoadFeature/SaveLoadFeature.vue";
import { defineComponent } from "vue";
import LanguageChangerFeature from "@/components/header/LanguageChangerFeature/LanguageChangerFeature.vue";
import RollDiceFeature from "@/components/header/RollDiceFeature/RollDiceFeature.vue";
import SwitchCharacterFeature from "@/components/header/SwitchCharacterFeature/SwitchCharacterFeature.vue";

export default defineComponent({
	name: "SheetHeader",
	emits: ['character-loaded', 'clear'],
	components: {SwitchCharacterFeature, RollDiceFeature, LanguageChangerFeature, SaveLoadFeature},
})
</script>

<style lang="scss" scoped>
header {
	height: 50px;
	padding: 0 16px;
	background-color: #181818;
	display: flex;
	gap: 16px;
	align-items: center;

	& > span {
		width: 1px;
		height: 50%;
		background-color: #a8a8a8;
	}
}
</style>
