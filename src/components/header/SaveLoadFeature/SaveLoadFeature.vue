<template>
<nav>
	<Button @click="save">Save</Button>
	<Button @click="openLoadModal">Load</Button>
	<Button @click="clear" secondary>Clear</Button>
</nav>
	<ModalWindow v-model="modal">
		<LoadWindow
			@close="modal = false"
			@loaded="load"/>
	</ModalWindow>
</template>

<script lang="ts">
import Button from "@/components/ui/Button.vue";
import {defineComponent, PropType} from "vue";
import ModalWindow from "@/components/common/ModalWindow.vue";
import LoadWindow from "@/components/header/LoadWindow.vue";
import {Character} from "@/types";

export default defineComponent({
	name: "SaveLoadFeature",
	components: {
		LoadWindow,
		ModalWindow,
		Button
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
			link.download = this.$store.state.character.name + '.fate'
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
