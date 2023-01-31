<template>
	<article
		class="skill skill--clickable"
		@click="editMode = true">
		<aside class="skill__level">
			{{ skill.level }}
		</aside>
		<h6 class="skill__name">
			{{ $t(`skill__${skill.name}`) }}
		</h6>
		<span class="skill__experience">
			{{ skill.experience }} /
			{{ $options.rules.LEVEL_CUPS[skill.level - 1] }}
		</span>
		<progress
			class="skill__progress"
			max="100"
			:value="experiencePercent">
			{{ experiencePercent.toFixed() }}%
		</progress>
		<span class="skill__dice-roll">
			<RollSkillDice :skill="skill" />
		</span>
	</article>

	<ModalWindow
		v-model="editMode"
		:title="$t('edit-skill')">
		<SkillEdit
			:skill="skill"
			@remove="remove"
			@update="newSkill => update(newSkill)"
			@close="editMode = false" />
	</ModalWindow>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { SkillProgress } from '@/types'
import rules from '@/shared/constants/rules'
import ModalWindow from '@/components/common/ModalWindow.vue'
import SkillEdit from '@/components/edit/SkillEdit.vue'
import RollSkillDice from '@/features/RollSkillDice/RollSkillDice.vue'

export default defineComponent({
	name: 'Skill',
	components: { RollSkillDice, SkillEdit, ModalWindow },
	emits: ['update', 'remove'],
	rules: rules,
	props: {
		skill: {
			type: Object as PropType<SkillProgress>,
			required: true,
		},
	},
	data() {
		return {
			editMode: false,
		}
	},
	computed: {
		experiencePercent() {
			const percent = (this.skill.experience / this.$options.rules.LEVEL_CUPS[this.skill.level - 1]) * 100
			return percent > 100 ? 100 : percent
		},
	},
	methods: {
		update(skill: SkillProgress) {
			this.$emit('update', skill)
		},
		remove() {
			this.$emit('remove')
		},
	},
})
</script>

<style lang="scss">
.skill {
	position: relative;
	display: flex;
	align-items: center;
	height: 40px;
	border-radius: 10px;
	border: 1px solid rgba(0, 0, 0, 0.25);
	box-sizing: border-box;
	box-shadow: 0 1px 1px 0.5px rgba(0, 0, 0, 0.25);
	cursor: pointer;
	transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;

	&--clickable {
		&:hover {
			transform: scale(1.01);
			box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.25);
		}
	}
	&__dice-roll {
		display: grid;
		place-content: center;
		width: 36px;
		height: 36px;
	}

	&__level {
		position: relative;
		z-index: 2;
		display: grid;
		height: 100%;
		aspect-ratio: 1;
		place-content: center;
		border-radius: 10px;
		background-color: white;
		box-shadow: 0 1px 1px 0.5px rgba(0, 0, 0, 0.25);
		font-size: 28px;
		font-weight: bold;
	}

	&__name {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 0 0 0 20px;
		font-size: 16px;
		font-weight: bolder;
		text-transform: uppercase;
	}

	&__experience {
		margin-left: auto;
		padding-right: 20px;
		font-style: italic;
		color: rgba(24, 24, 24, 0.8);
	}

	&__progress {
		position: absolute;
		height: 5px;
		right: 0;
		bottom: 0;
		width: calc(100% - 30px);
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		background-color: transparent;
		border-radius: 10px;
		outline: none;
		border: none;
	}

	::-webkit-progress-bar {
		border-radius: 10px;
		background-color: transparent;
	}

	::-webkit-progress-value {
		border-radius: 10px;
		background-color: #181818;
	}

	::-moz-progress-bar {
		border-radius: 10px;
		background-color: #181818;
	}
}
</style>
