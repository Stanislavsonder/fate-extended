<template>
	<TextSection
		:title="$t('origin-and-appearance')"
		:model-value="characters[current].description"
		@update:model-value="updateDescription" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextSection from '@/components/common/TextSection.vue'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
	name: 'Description',
	components: {
		TextSection,
	},
	setup() {
		const store = useCharactersStore()

		const { characters, current } = storeToRefs(store)

		const { updateDescription } = store

		return {
			characters,
			current,
			updateDescription,
		}
	},
})
</script>
