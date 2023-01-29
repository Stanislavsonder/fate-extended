<template>
	<main class="char-sheet">
		<div class="char-sheet__main-section">
			<Character />
			<Modules />
		</div>
		<Aspects />
		<Description />
		<Inventory />
		<div class="char-sheet__half-section">
			<Skills />
			<Stunts />
		</div>
	</main>
</template>

<script lang="ts">
import Character from '@/components/sections/Character.vue'
import Aspects from '@/components/sections/Aspects.vue'
import Modules from '@/components/sections/Modules.vue'
import Description from '@/components/sections/Description.vue'
import Inventory from '@/components/sections/Inventory.vue'
import Skills from '@/components/sections/Skills.vue'
import Stunts from '@/components/sections/Stunts.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'CharacterSheet',
	components: {
		Stunts,
		Skills,
		Inventory,
		Description,
		Modules,
		Aspects,
		Character,
	},
	emits: ['char-updated'],
})
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
