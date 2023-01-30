<template>
	<header class="header">
		<div class="header__top">
			<SaveLoadFeature />
			<span />
			<RollDiceFeature />
			<LanguageChangerFeature />
		</div>
		<CharactersTabsFeature />
	</header>
</template>

<script lang="ts">
import SaveLoadFeature from '@/components/header/SaveLoadFeature/SaveLoadFeature.vue'
import { defineComponent } from 'vue'
import LanguageChangerFeature from '@/components/header/LanguageChangerFeature/LanguageChangerFeature.vue'
import RollDiceFeature from '@/components/header/RollDiceFeature/RollDiceFeature.vue'
import CharactersTabsFeature from '@/components/header/CharactersTabsFeature/CharactersTabsFeature.vue'

export default defineComponent({
	name: 'SheetHeader',
	components: { CharactersTabsFeature, RollDiceFeature, LanguageChangerFeature, SaveLoadFeature },
	emits: ['character-loaded', 'clear'],
})
</script>

<style lang="scss" scoped>
.header {
	&__top {
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
}
</style>
