<script setup lang="ts">
import ConfigButton from '@/components/ui/ConfigButton.vue'
import { computed, defineProps, PropType, ref } from 'vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import { RollType, SkillProgress } from '@/types'
import { useI18n } from 'vue-i18n'
import Button from '@/components/ui/Button.vue'
import { DiceResult, diceRoll } from '@/shared/helpers/roll'
import { useCharactersStore } from '@/app/store/CharacterStore'
import RollResult from '@/shared/ui/RollResult/RollResult.vue'
import rules from '@/shared/constants/rules'
import { useElementHover } from '@vueuse/core'

const i18 = useI18n()
const props = defineProps({
	skill: {
		type: Object as PropType<SkillProgress>,
		required: true,
	},
})
const store = useCharactersStore()
const luck = store.characters[store.current].luck

const difficultyBlock = ref()
const title = `${i18.t('roll')}: ${i18.t(`skill__${props.skill.name}`)}`
const modal = ref(false)
const result = ref<DiceResult[]>([])
const difficulty = ref(0)
const resultValue = ref(0)
const experienceGained = ref(0)
const bonus = ref(0)

const rollType = ref<RollType>(RollType.Overcome)
const rollTypes = [RollType.Overcome, RollType.Advantage, RollType.Attack, RollType.Defence]
const isDifficultyHovered = useElementHover(difficultyBlock)

const roll = () => {
	result.value = diceRoll(4, luck)
	resultValue.value = calculateResult()
}

const signed = (number: number, isZero = false): string => {
	return new Intl.NumberFormat('en-US', {
		signDisplay: isZero ? 'exceptZero' : 'always',
	}).format(number)
}

const isDifficultCounted = computed(() => {
	return rollType.value !== RollType.Attack && rollType.value !== RollType.Defence
})

const experience = computed(() => {
	return props.skill.experience + ' / ' + rules.LEVEL_CUPS[props.skill.level - 1]
})

const gradient = computed(() => {
	const p = (props.skill?.experience / rules.LEVEL_CUPS[props.skill.level - 1]) * 100
	return `linear-gradient(to top, #181818 0%, #181818 ${p}%, transparent ${p}%)`
})

const calculateResult = () => {
	const diceResult = result.value.reduce((acc, cur) => acc + cur.result, 0)
	const difficult = isDifficultCounted.value ? difficulty.value : 0

	return diceResult - difficult + bonus.value + props.skill.level
}
</script>


<template>
	<ConfigButton
		:hint="$t('dice-roll')"
		type="Dices"
		variant=""
		@click.stop="modal = true" />
	<ModalWindow
		v-model="modal"
		:title="title">
		<div class="skill-dice-roll">
			<div>
				<h6>Тип броска:</h6>
				<nav>
					<ul class="skill-dice-roll__roll-type-list">
						<li
							v-for="type in rollTypes"
							:key="type">
							<Button
								:secondary="rollType !== type"
								@click="rollType = type">
								{{ type }}
							</Button>
						</li>
					</ul>
				</nav>
			</div>
			<div class="skill-dice-roll__wrapper">
				<div
					v-show="isDifficultCounted"
					ref="difficultyBlock"
					class="skill-dice-roll__difficulty">
					<button
						v-if="isDifficultyHovered"
						class="skill-dice-roll__difficulty-button skill-dice-roll__difficulty-button--left"
						@click="difficulty--">
						{{ '<' }}
					</button>
					<button
						v-if="isDifficultyHovered"
						class="skill-dice-roll__difficulty-button skill-dice-roll__difficulty-button--right"
						@click="difficulty++">
						{{ '>' }}
					</button>
					<span class="skill-dice-roll__difficulty-value"> {{ difficulty }} </span>
					<span class="skill-dice-roll__difficulty-text"> Difficulty </span>
				</div>
				<div class="skill-dice-roll-skill">
					<div class="skill-dice-roll-skill__circle">
						<span class="skill-dice-roll-skill__exp-gained"> {{ signed(experienceGained) }} опыта </span>
						<span class="skill-dice-roll-skill__bonus">
							{{ signed(bonus) }}
						</span>
						<div
							class="skill-dice-roll-skill__circle-bg"
							:style="{ backgroundImage: gradient }" />
						<p class="skill-dice-roll-skill__level">{{ skill.level }}</p>
						<p class="skill-dice-roll-skill__experience">{{ experience }}</p>
					</div>
					<p class="skill-dice-roll-skill__name">{{ $t(`skill__${skill.name}`) }}</p>
				</div>
				<div class="skill-dice-roll__roll-result">
					<RollResult
						:result="result"
						:size="40" />
				</div>
				<div class="skill-dice-roll-result">
					<p class="skill-dice-roll-result__word">Success!</p>
					<p class="skill-dice-roll-result__value">{{ signed(resultValue, true) }}</p>
				</div>
			</div>
			<div>
				<Button @click="roll"> Roll </Button>
			</div>
		</div>
	</ModalWindow>
</template>


<style scoped lang="scss">
.skill-dice-roll {
	padding: 16px;

	&__wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		border: 2px solid var(--primary);
		border-radius: 16px;
		padding: 16px;
		box-sizing: border-box;
	}

	&__roll-type-list {
		display: flex;
		justify-content: center;
	}

	&__roll-result {
		padding: 16px;
	}

	&__difficulty {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
		width: 100px;
		height: 100px;
		background: var(--primary);
		border-radius: 0 13px 0 16px;
		color: var(--white);
		right: 0;
		top: 0;
		font-weight: bold;
	}

	&__difficulty-value {
		font-size: 36px;
	}

	&__difficulty-button {
		position: absolute;
		width: 24px;
		height: 24px;
		border: none;
		border-radius: 100%;
		background: var(--white);

		&:hover {
			filter: brightness(0.8);
		}

		&--right {
			right: 2px;
		}

		&--left {
			left: 2px;
		}
	}
}

.skill-dice-roll-skill {
	&__circle {
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
		margin-bottom: 8px;
	}
	&__circle-bg {
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
		font-size: 14px;
	}
	&__name {
		font-weight: bold;
	}

	&__exp-gained {
		position: absolute;
		left: -100%;
	}

	&__bonus {
		position: absolute;
		font-size: 26px;
		font-weight: bold;
		right: -50%;
	}
}

.skill-dice-roll-result {
	&__value {
		font-size: 24px;
		font-weight: bold;
	}

	&__word {
		font-size: 24px;
		font-weight: bold;

		&--success {
			color: green;
		}
		&--succes-with-style {
			color: gold;
		}
		&--fail {
			color: orange;
		}
		&--critical-fail {
			color: darkred;
		}
	}
}
</style>
