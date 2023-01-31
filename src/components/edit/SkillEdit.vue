<template>
	<div class="skill-edit">
		<article class="skill">
			<aside class="skill__level">
				{{ tmpSkill.level }}
				<button
					class="skill-edit__level-up"
					@click="levelUp">
					<ArrowIcon />
				</button>
				<button
					class="skill-edit__level-down"
					@click="levelDown">
					<ArrowIcon />
				</button>
			</aside>
			<h6 class="skill__name">
				{{ $t(`skill__${tmpSkill.name}`) }}
			</h6>
			<span class="skill__experience">
				<input
					v-model="tmpSkill.experience"
					class="skill-edit__experience"
					min="0"
					:max="cup"
					inputmode="number"
					type="number" />
				/ {{ cup }}
			</span>
			<progress
				class="skill__progress"
				max="100"
				:value="experiencePercent"
				@click="experienceUpdate">
				{{ experiencePercent.toFixed() }}%
			</progress>
		</article>
		<nav>
			<Button
				secondary
				@click="remove">
				{{ $t('ui-remove') }}
			</Button>
			<Button
				secondary
				@click="close">
				{{ $t('ui-cancel') }}
			</Button>
			<Button @click="save">
				{{ $t('ui-save') }}
			</Button>
		</nav>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { SkillProgress } from '@/types'
import rules from '@/shared/constants/rules'
import Button from '@/components/ui/Button.vue'
import ArrowIcon from '@/components/ui/icons/ArrowIcon.vue'

export default defineComponent({
	name: 'SkillEdit',
	levelCups: rules.LEVEL_CUPS,
	components: {
		ArrowIcon,
		Button,
	},
	emits: ['update', 'remove', 'close'],
	props: {
		skill: {
			type: Object as PropType<SkillProgress>,
			required: true,
		},
	},
	data() {
		return {
			tmpSkill: JSON.parse(JSON.stringify(this.skill)),
		}
	},
	computed: {
		experiencePercent() {
			const percent = (this.tmpSkill.experience / this.cup) * 100
			return percent > 100 ? 100 : percent
		},
		cup() {
			return this.$options.levelCups[this.tmpSkill.level - 1]
		},
	},
	methods: {
		close() {
			this.$emit('close')
		},
		remove() {
			this.$emit('remove')
			this.close()
		},
		save() {
			this.$emit('update', this.tmpSkill)
			this.close()
		},
		experienceUpdate(event: MouseEvent) {
			const percent = event.offsetX / (event.target as HTMLElement).offsetWidth
			this.tmpSkill.experience = Math.min(this.cup, Math.max(0, Math.ceil(this.cup * percent)))
		},
		levelUp() {
			this.tmpSkill.level = Math.min(Number(this.tmpSkill.level) + 1, this.$options.levelCups.length)
			this.tmpSkill.experience = 0
		},
		levelDown() {
			this.tmpSkill.level = Math.max(Number(this.tmpSkill.level) - 1, 1)
			this.tmpSkill.experience = 0
		},
	},
})
</script>

<style scoped lang="scss">
.skill-edit {
	padding: 20px;

	&__experience {
		width: 60px;
		font-size: 16px;
		padding-right: 5px;
		border: none;
		text-decoration: underline;
		font-style: italic;
		text-align: right;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		-moz-appearance: textfield;
	}

	&__level-up,
	&__level-down {
		position: absolute;
		display: grid;
		place-content: center;
		width: 100%;
		height: 100%;
		background-color: transparent;
		border: none;
		border-radius: 100%;

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}

	&__level-up {
		transform: translateY(-110%) rotate(180deg);
	}

	&__level-down {
		transform: translateY(110%);
	}

	.skill {
		margin: 36px 20px;

		&__progress {
			height: 10px;
			cursor: pointer;
		}
	}
}
</style>
