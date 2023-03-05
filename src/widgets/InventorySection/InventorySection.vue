<template>
	<TextField
		:title="$t('equipment-and-inventory')"
		:model-value="characters[current].inventory"
		@update:model-value="updateInventory"
	/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCharactersStore } from "@/app/store/CharacterStore";
import { storeToRefs } from "pinia";
import { TextField } from "@/shared/ui";

export default defineComponent({
	name: "InventorySection",
	components: {
		TextField,
	},
	setup() {
		const store = useCharactersStore();

		const { characters, current } = storeToRefs(store);

		const { updateInventory } = store;

		return {
			characters,
			current,
			updateInventory,
		};
	},
});
</script>
