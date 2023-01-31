<template>
	<Card
		:title="$t('skills')"
		class="skills">
		<template #buttons>
			<ConfigButton
				:hint="$t('add-new-skill')"
				variant="transparent"
				type="PlusIcon"
				@click="add" />
		</template>
		<template #content>
			<ul class="skills__list">
				<li
					v-for="(skill, index) in characters[current].skills"
					:key="characters[current].name + index + skill.name">
					<Skill
						:skill="skill"
						@remove="remove(index)"
						@update="newSkill => update(newSkill, index)" />
				</li>
			</ul>
		</template>
	</Card>
	<ModalWindow
		v-model="addModal"
		:title="$t('add-new-skill')">
		<AddSkill
			:existed-skills="characters[current].skills"
			@close="addModal = false"
			@add="addSkill" />
	</ModalWindow>
</template>

<script lang="ts">
import Card from '@/components/common/Card.vue'
import Skill from '@/components/sheet-elements/Skill.vue'
import { SkillProgress as SkillType } from '@/types'
import { defineComponent } from 'vue'
import ConfigButton from '@/components/ui/ConfigButton.vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import AddSkill from '@/components/edit/AddSkill.vue'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
	name: 'Skills',
	components: {
		AddSkill,
		ModalWindow,
		ConfigButton,
		Skill,
		Card,
	},
	setup() {
		const store = useCharactersStore()

		const { characters, current } = storeToRefs(store)

		const { updateSkills } = store

		return {
			characters,
			current,
			updateSkills,
		}
	},
	data() {
		return {
			addModal: false,
		}
	},
	methods: {
		add() {
			this.addModal = true
		},
		addSkill(skill: SkillType) {
			this.updateSkills([...this.characters[this.current].skills, skill])
		},
		update(skill: SkillType, index: number) {
			const newSkills = [...this.characters[this.current].skills]
			newSkills.splice(index, 1, skill)
			newSkills.sort((a, b) => {
				return b.level - a.level ? b.level - a.level : b.experience - a.experience
			})
			this.updateSkills(newSkills)
		},
		remove(index: number) {
			this.updateSkills(this.characters[this.current].skills.filter((e: SkillType, i: number) => i !== index))
		},
	},
})
</script>

<style scoped lang="scss">
.skills {
	max-height: 600px;

	&__list {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 10px;
		overflow-y: auto;
		max-height: 500px;
	}
}
</style>
