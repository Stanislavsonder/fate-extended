<template>
	<TextSection
		:title="$t('equipment-and-inventory')"
		:model-value="characters[current].inventory"
		@update:model-value="updateInventory" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextSection from '@/components/common/TextSection.vue'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
	name: 'Inventory',
	components: {
		TextSection,
	},
	setup() {
		const store = useCharactersStore()

		const { characters, current } = storeToRefs(store)

		const { updateInventory } = store

		return {
			characters,
			current,
			updateInventory,
		}
	},
})
</script>
