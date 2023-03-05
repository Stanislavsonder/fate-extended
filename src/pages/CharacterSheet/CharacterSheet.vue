<template>
	<SheetHeader />
	<main class="char-sheet">
		<div class="char-sheet__main-section">
			<CharacterInfoSection />
			<MetaInfoSection />
		</div>
		<AspectSection />
		<DescriptionSection />
		<InventorySection />
		<div class="char-sheet__half-section">
			<SkillsSection />
			<StuntsSection />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
	AspectSection,
	CharacterInfoSection,
	DescriptionSection,
	InventorySection,
	MetaInfoSection,
	SheetHeader,
	SkillsSection,
	StuntsSection,
} from "@/widgets";

export default defineComponent({
	name: "CharacterSheet",
	components: {
		SheetHeader,
		CharacterInfoSection,
		MetaInfoSection,
		DescriptionSection,
		InventorySection,
		StuntsSection,
		SkillsSection,
		AspectSection,
	},
	emits: ["char-updated"],
});
</script>

<style lang="scss" scoped>
.char-sheet {
	&__main-section {
		display: flex;

		@include media-down(tablet) {
			flex-direction: column-reverse;
		}
	}

	&__half-section {
		display: grid;
		grid-template-columns: 1fr 1fr;

		@include media-down(tablet) {
			grid-template-columns: auto;
		}
	}
}
</style>
