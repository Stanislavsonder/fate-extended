<template>
	<nav>
		<IconButton
			:hint="$t('save-characters-file')"
			type="Save"
			variant="transparent"
			@click="save" />
		<IconButton
			:hint="$t('load-characters-file')"
			type="Load"
			variant="transparent"
			@click="openLoadModal" />
		<IconButton
			:hint="$t('restore-character-sheet')"
			type="Restore"
			:variant="['transparent', 'danger']"
			@click="clear" />
	</nav>
	<ModalWindow
		v-model="modal"
		:title="$t('load-characters-file')">
		<LoadWindow @close="modal = false" />
	</ModalWindow>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IconButton, ModalWindow } from '@/shared/ui'
import LoadWindow from '@/features/SaveLoad/LoadWindow.vue'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
	name: 'SaveLoad',
	components: {
		IconButton,
		LoadWindow,
		ModalWindow,
	},
	setup() {
		const store = useCharactersStore()

		const { characters, current } = storeToRefs(store)
		const { clearCharacter } = store

		return {
			characters,
			current,
			clearCharacter,
		}
	},
	data() {
		return {
			modal: false,
		}
	},
	methods: {
		save() {
			const file = new Blob([JSON.stringify(this.characters[this.current])], {
				type: 'text/plain',
			})
			const link = document.createElement('a')
			link.href = URL.createObjectURL(file)
			link.download = (this.characters[this.current].name || this.$t('unnamed-character')) + '.fate'
			link.click()
			URL.revokeObjectURL(link.href)
		},
		openLoadModal() {
			this.modal = true
		},
		clear() {
			this.clearCharacter()
		},
	},
})
</script>

<style scoped lang="scss">

</style>
