<template>
	<Card :title="$t('stunts')">
		<template #buttons>
			<IconButton
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
		<AddNewAndEditStunt
			:stunt="{ name: '', description: '', skill: undefined }"
			mode="new"
			@update="add"
			@close="modal = false" />
	</ModalWindow>
</template>

<script lang="ts">
import { Card, IconButton, ModalWindow } from '@/shared/ui'
import { defineComponent } from 'vue'
import { Stunt as StuntType } from '@/types'
import { Stunt } from '@/entities'
import { AddNewAndEditStunt } from '@/features'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
	name: 'StuntsSection',
	components: { AddNewAndEditStunt, ModalWindow, IconButton, Stunt, Card },
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
