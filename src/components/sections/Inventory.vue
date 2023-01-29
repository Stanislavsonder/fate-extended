<template>
	<TextSection
		:title="$t('equipment-and-inventory')"
		:model-value="$store.state.characters[$store.state.current].inventory"
		@update:model-value="update" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextSection from '@/components/common/TextSection.vue'

export default defineComponent({
	name: 'Inventory',
	components: {
		TextSection,
	},
	methods: {
		update(value: string) {
			this.$store.commit('updateInventory', value)
		},
	},
})
</script>
