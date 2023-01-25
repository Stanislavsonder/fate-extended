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
	emits: ['clear', 'load'],
	components: {
		LoadWindow,
		ModalWindow,
		Button
	},
	props: {
		character: {
			type: Object as PropType<Character>,
			required: true
		}
	},
	data() {
		return {
			modal: false
		}
	},
	methods: {
		save() {
			const file = new Blob([atob(JSON.stringify(this.character))], {
				type: 'text/plain'
			});
		},
		openLoadModal() {
			this.modal = true
		},
		load(character: Character) {
			this.$emit('load', character)
		},
		clear() {
			this.$emit('clear')
		}
	}
})
</script>

<style scoped lang="scss">

</style>
