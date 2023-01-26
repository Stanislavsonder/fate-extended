<template>
<nav>
	<ConfigButton
		variant="transparent"
		type="Save"
		@click="save"
		title="Save character into the file"/>
	<ConfigButton
		variant="transparent"
		type="Load"
		@click="openLoadModal"
		title="Load character from the file"/>
	<ConfigButton
		:variant="['transparent', 'danger']"
		type="Restore"
		@click="clear"
		title="Restore character sheet"/>
</nav>
	<ModalWindow v-model="modal">
		<LoadWindow
			@close="modal = false"
			@loaded="load"/>
	</ModalWindow>
</template>

<script lang="ts">
import {defineComponent,} from "vue";
import ModalWindow from "@/components/common/ModalWindow.vue";
import LoadWindow from "@/components/header/LoadWindow.vue";
import {Character} from "@/types";
import ConfigButton from "@/components/ui/ConfigButton.vue";

export default defineComponent({
	name: "SaveLoadFeature",
	components: {
		ConfigButton,
		LoadWindow,
		ModalWindow,
	},
	data() {
		return {
			modal: false
		}
	},
	methods: {
		save() {
			const file = new Blob([JSON.stringify(this.$store.state.character)], {
				type: 'text/plain'
			});
			const link = document.createElement("a");
			link.href = URL.createObjectURL(file);
			link.download = (this.$store.state.character.name || 'Unnamed Character') + '.fate'
			link.click();
			URL.revokeObjectURL(link.href);
		},
		openLoadModal() {
			this.modal = true
		},
		load(character: Character) {
			this.$store.state.
			this.$emit('load', character)
		},
		clear() {
			this.$store.commit('clearCharacter')
		}
	}
})
</script>

<style scoped lang="scss">

</style>
