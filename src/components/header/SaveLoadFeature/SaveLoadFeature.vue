<template>
	<nav>
		<ConfigButton
			:hint="$t('save-characters-file')"
			type="Save"
			variant="transparent"
			@click="save" />
		<ConfigButton
			:hint="$t('load-characters-file')"
			type="Load"
			variant="transparent"
			@click="openLoadModal" />
		<ConfigButton
			:hint="$t('restore-character-sheet')"
			type="Restore"
			:variant="['transparent', 'danger']"
			@click="clear" />
	</nav>
	<ModalWindow
		v-model="modal"
		:title="$t('load-characters-file')">
		<LoadWindow
			@close="modal = false"
			@loaded="load" />
	</ModalWindow>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import LoadWindow from '@/components/header/SaveLoadFeature/LoadWindow.vue'
import { Character } from '@/types'
import ConfigButton from '@/components/ui/ConfigButton.vue'

export default defineComponent({
	name: 'SaveLoadFeature',
	components: {
		ConfigButton,
		LoadWindow,
		ModalWindow,
	},
	data() {
		return {
			modal: false,
		}
	},
	methods: {
		save() {
			const file = new Blob([JSON.stringify(this.$store.state.characters[this.$store.state.current])], {
				type: 'text/plain',
			})
			const link = document.createElement('a')
			link.href = URL.createObjectURL(file)
			link.download =
				(this.$store.state.characters[this.$store.state.current].name || this.$t('unnamed-character')) + '.fate'
			link.click()
			URL.revokeObjectURL(link.href)
		},
		openLoadModal() {
			this.modal = true
		},
		load(character: Character) {
			this.$store.state.this.$emit('load', character)
		},
		clear() {
			this.$store.commit('clearCharacter')
		},
	},
})
</script>

<style scoped lang="scss">

</style>
