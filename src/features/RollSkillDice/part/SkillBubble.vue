<template>
	<div class="bubble-skill">
		<div class="bubble">
			<span
				v-show="isExperienceDisplayed"
				class="bubble__exp-gained">
				{{ signed(experienceGained) }} {{ $t('exp') }}
			</span>
			<span class="bubble__bonus">
				{{ signed(bonus) }}
				<button
					class="bubble__bonus-button bubble__bonus-button--up"
					@click="setBonus(bonus + 1)">
					<Icon name="Caret" />
				</button>
				<button
					class="bubble__bonus-button bubble__bonus-button--down"
					@click="setBonus(bonus - 1)">
					<Icon name="Caret" />
				</button>
			</span>
			<div
				class="bubble__bg"
				:style="{ backgroundImage: gradient }" />
			<p class="bubble__level">
				{{ skill.level }}
			</p>
			<p class="bubble__experience">
				{{ experience }}
			</p>
		</div>
		<p class="skill-name">
			{{ $t(`skill__${skill.name}`) }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import { SkillProgress } from '@/types'
import rules from '@/shared/constants/rules'

export default defineComponent({
	name: 'SkillBubble',
	components: { Icon },
	emits: ['update:bonus'],
	props: {
		skill: {
			type: Object as PropType<SkillProgress>,
			required: true
		},
		experienceGained: {
			type: Number,
			required: true
		},
		bonus: {
			type: Number,
			required: true
		},
		isExperienceDisplayed: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		gradient() {
			const p = (this.skill.experience / rules.LEVEL_CUPS[this.skill.level - 1]) * 100
			return `linear-gradient(to top, #181818 0%, #181818 ${p}%, transparent ${p}%)`
		},
		experience() {
			return this.skill.experience + ' / ' + rules.LEVEL_CUPS[this.skill.level - 1]
		}
	},
	methods: {
		setBonus(value: number) {
			this.$emit('update:bonus', value)
		},
		signed(number: number, isZero = false): string {
			return new Intl.NumberFormat('en-US', {
				signDisplay: isZero ? 'exceptZero' : 'always'
			}).format(number)
		}
	}
})
</script>

<style scoped lang="scss">
.bubble-skill {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.skill-name {
	font-weight: bold;
	font-size: 24px;
}

.bubble {
	position: relative;
	z-index: 2;
	height: 100px;
	width: 100px;
	border: 1px solid var(--primary);
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 8px;
	margin-bottom: 16px;

	&__bg {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border-radius: 100%;

		&:after {
			position: absolute;
			content: '';
			left: 0;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			background-color: var(--white);
			border-radius: 100%;
			transform: scale(0.9);
		}
	}

	&__level {
		font-size: 36px;
		font-weight: bolder;
	}

	&__experience {
		font-size: 12px;
	}

	&__name {
		font-weight: bold;
		font-size: 24px;
	}

	&__exp-gained {
		position: absolute;
		left: -100%;
	}

	&__bonus {
		position: absolute;
		display: grid;
		width: 75px;
		height: 36px;
		font-size: 26px;
		font-weight: bold;
		right: -75%;
	}

	&__bonus-button {
		position: absolute;
		display: grid;
		place-content: center;
		background: transparent;
		border-radius: 100%;
		border: none;
		width: 36px;
		height: 36px;
		right: 10px;

		&:hover {
			background: rgba(0, 0, 0, 0.1);
		}

		svg {
			width: 100%;
		}

		&--up {
			top: 0;
			transform: translateY(-100%) rotate(180deg);
		}
		&--down {
			transform: translateY(75%);
		}
	}
}
</style>
