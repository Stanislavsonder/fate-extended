<template>
	<header class="header">
		<div class="header__top">
			<SaveLoad />
			<span />
			<RollDice />
			<LanguageChanger />
		</div>
		<CharactersTabs />
	</header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
	CharactersTabs,
	LanguageChanger,
	RollDice,
	SaveLoad,
} from "@/features";

export default defineComponent({
	name: "SheetHeader",
	components: { CharactersTabs, RollDice, LanguageChanger, SaveLoad },
	emits: ["character-loaded", "clear"],
});
</script>

<style lang="scss" scoped>
.header {
	&__top {
		height: 50px;
		padding: 0 16px;
		background-color: var(--primary);
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
