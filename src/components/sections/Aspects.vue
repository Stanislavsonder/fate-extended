<template>
	<Card
		:title="$t('aspects')"
		class="aspects">
		<template #buttons>
			<ConfigButton
				:hint="$t('add-new-aspect')"
				type="PlusIcon"
				variant="transparent"
				@click="modal = true" />
		</template>
		<template #content>
			<ul class="aspects__content">
				<li v-if="!characters[current].aspects.length">
					{{ $t('click-plus-to-add-aspect') }}
				</li>
				<li
					v-for="(aspect, index) in characters[current].aspects"
					:key="characters[current].name + index + aspect.title">
					<AspectComponent
						:aspect="aspect"
						@remove="remove(index)"
						@update="newAspect => update(newAspect, index)" />
				</li>
			</ul>
		</template>
	</Card>
	<ModalWindow
		v-model="modal"
		:title="$t('create-new-aspect')">
		<AspectEdit
			mode="new"
			:aspect="{ title: '', description: '', type: AspectType.Neutral }"
			@update="newAspect => add(newAspect)"
			@close="modal = false" />
	</ModalWindow>
</template>

<script lang="ts">
import Card from '@/components/common/Card.vue'
import AspectComponent from '@/components/sheet-elements/Aspect.vue'
import { defineComponent } from 'vue'
import { Aspect, AspectType } from '@/types'
import ModalWindow from '@/components/common/ModalWindow.vue'
import ConfigButton from '@/components/ui/ConfigButton.vue'
import AspectEdit from '@/components/edit/AspectEdit.vue'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
	name: 'Aspects',
	components: { AspectEdit, ConfigButton, ModalWindow, AspectComponent, Card },
	setup() {
		const store = useCharactersStore()

		const { characters, current } = storeToRefs(store)
		const { updateAspects } = store

		return {
			characters,
			current,
			updateAspects,
		}
	},
	data() {
		return {
			modal: false,
		}
	},
	computed: {
		AspectType() {
			return AspectType
		},
	},
	methods: {
		update(aspect: Aspect, id: number) {
			const newAspects = [...this.characters[this.current].aspects]
			newAspects.splice(id, 1, aspect)
			this.updateAspects(newAspects)
		},
		remove(id: number) {
			this.updateAspects(this.characters[this.current].aspects.filter((e: Aspect, i: number) => i !== id))
		},
		add(aspect: Aspect) {
			this.updateAspects([...this.characters[this.current].aspects, aspect])
		},
	},
})
</script>

<style scoped lang="scss">
.aspects {
	&__content {
		display: flex;
		gap: 26px;
		padding: 20px;
		min-height: 260px;
		overflow-x: auto;
	}
}
</style>
