<template>
	<Card :title="$t('stunts')">
		<template #buttons>
			<ConfigButton
				:hint="$t('add-new-stunt')"
				type="PlusIcon"
				variant="transparent"
				@click="modal = true" />
		</template>
		<template #content>
			<ul>
				<li
					v-for="(stunt, index) in characters[current].stunts"
					:key="stunt.name">
					<Stunt
						:stunt="stunt"
						@remove="() => remove(index)"
						@update="newStunt => update(newStunt, index)" />
				</li>
			</ul>
		</template>
	</Card>
	<ModalWindow
		v-model="modal"
		:title="$t('add-new-stunt')">
		<StuntAddAndEdit
			:stunt="{ name: '', description: '', skill: undefined }"
			mode="new"
			@update="add"
			@close="modal = false" />
	</ModalWindow>
</template>

<script lang="ts">
import Card from '@/components/common/Card.vue'
import { defineComponent } from 'vue'
import { Stunt as StuntType } from '@/types'
import Stunt from '@/components/sheet-elements/Stunt.vue'
import ConfigButton from '@/components/ui/ConfigButton.vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import StuntAddAndEdit from '@/components/edit/StuntAddAndEdit.vue'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
	name: 'Stunts',
	components: { StuntAddAndEdit, ModalWindow, ConfigButton, Stunt, Card },
	setup() {
		const store = useCharactersStore()

		const { characters, current } = storeToRefs(store)

		const { updateStunts } = store

		return {
			characters,
			current,
			updateStunts,
		}
	},
	data() {
		return {
			modal: false,
		}
	},
	methods: {
		add(stunt: StuntType) {
			this.updateStunts([...this.characters[this.current].stunts, stunt])
		},
		update(stunt: StuntType, id: number) {
			const newStunts = [...this.characters[this.current].stunts]
			newStunts.splice(id, 1, stunt)
			this.updateStunts(newStunts)
		},
		remove(id: number) {
			this.updateStunts(this.characters[this.current].stunts.filter((e: StuntType, i: number) => i !== id))
		},
	},
})
</script>

<style scoped lang="scss">
ul,
li {
	margin: 0;
	padding: 0;
	list-style: none;
}
ul {
	display: flex;
	flex-direction: column;
	gap: 16px;
}
</style>
