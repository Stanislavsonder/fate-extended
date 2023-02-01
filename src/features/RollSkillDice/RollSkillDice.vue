<script setup lang="ts">
import ConfigButton from '@/components/ui/ConfigButton.vue'
import { computed, defineProps, PropType, ref } from 'vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import { RollType, SkillProgress } from '@/types'
import { useI18n } from 'vue-i18n'
import Button from '@/components/ui/Button.vue'
import { calculateExperienceForTheRoll, DiceResult, diceRoll, getResultWord } from '@/shared/helpers/roll'
import { useCharactersStore } from '@/app/store/CharacterStore'
import RollResult from '@/shared/ui/RollResult/RollResult.vue'
import rules from '@/shared/constants/rules'
import { useElementHover } from '@vueuse/core'
import Caret from '@/components/ui/icons/Caret.vue'

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
const isRollIsCounts = ref(true)

const rollType = ref<RollType>(RollType.Overcome)
const rollTypes = [RollType.Overcome, RollType.Advantage, RollType.Attack, RollType.Defence]
const isDifficultyHovered = useElementHover(difficultyBlock)

const roll = () => {
	result.value = diceRoll(4, luck)
	resultValue.value = calculateResult()
	experienceGained.value = calculateExperienceForTheRoll(resultValue.value, difficulty.value, rollType.value)
	if (isRollIsCounts.value) {
		store.addSkillExperience(props.skill.name, experienceGained.value)
	}
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
				<nav>
					<ul class="skill-dice-roll__roll-type-list">
						<li
							v-for="type in rollTypes"
							:key="type">
							<Button
								:secondary="rollType !== type"
								@click="rollType = type">
								{{ $t(`roll-type__${type}`) }}
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
						class="skill-dice-roll__difficulty-button skill-dice-roll__difficulty-button--down"
						@click="difficulty--">
						<Caret />
					</button>
					<button
						v-if="isDifficultyHovered"
						class="skill-dice-roll__difficulty-button skill-dice-roll__difficulty-button--up"
						@click="difficulty++">
						<Caret />
					</button>
					<span class="skill-dice-roll__difficulty-value"> {{ difficulty }} </span>
					<span class="skill-dice-roll__difficulty-text"> {{ $t('difficulty') }} </span>
				</div>
				<div class="skill-dice-roll-skill">
					<div class="skill-dice-roll-skill__circle">
						<span
							v-show="result.length"
							class="skill-dice-roll-skill__exp-gained">
							{{ signed(experienceGained) }} {{ $t('exp') }}
						</span>
						<span class="skill-dice-roll-skill__bonus">
							{{ signed(bonus) }}
							<button
								class="skill-dice-roll-skill__bonus-button skill-dice-roll-skill__bonus-button--up"
								@click="bonus++">
								<Caret />
							</button>
							<button
								class="skill-dice-roll-skill__bonus-button skill-dice-roll-skill__bonus-button--down"
								@click="bonus--">
								<Caret />
							</button>
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
				<div
					v-show="result.length"
					class="skill-dice-roll-result"
					:class="`skill-dice-roll-result--${getResultWord(resultValue)}`">
					<p class="skill-dice-roll-result__word">
						{{ $t(`roll-result__${getResultWord(resultValue)}`) }}
					</p>
					<p class="skill-dice-roll-result__value">
						{{ signed(resultValue, true) }}
					</p>
				</div>
				<label class="skill-dice-roll__is-count">
					<input
						v-model="isRollIsCounts"
						class="skill-dice-roll__is-count-input"
						type="checkbox" />
					<span>{{ $t('auto-increase-xp') }}</span>
				</label>
			</div>
			<div>
				<Button @click="roll"> {{ $t('roll-the-dice') }}</Button>
			</div>
		</div>
	</ModalWindow>
</template>


<style scoped lang="scss">
.skill-dice-roll {
	padding: 16px;

	&__is-count {
		position: absolute;
		left: 10px;
		bottom: 10px;
		cursor: pointer;
	}

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

	&__title {
		font-weight: bold;
		font-size: 24px;
		margin-bottom: 16px;
	}

	&__roll-type-list {
		display: flex;
		justify-content: center;
		margin-bottom: 24px;
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
		display: grid;
		place-content: center;
		width: 36px;
		height: 36px;
		border: none;
		border-radius: 0px;
		background: var(--primary);
		color: var(--white);
		left: 2px;

		svg {
			width: 100%;
			fill: white;
		}

		&:hover {
			filter: brightness(0.8);
		}

		&--up {
			top: 0;
			transform: translateX(-100%) rotate(180deg);
		}

		&--down {
			transform: translateX(-100%);
		}
	}
}

.skill-dice-roll-skill {
	display: flex;
	flex-direction: column;
	align-items: center;

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
		margin-bottom: 16px;
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

.skill-dice-roll-result {
	&__value {
		font-size: 24px;
		font-weight: bold;
	}

	&__word {
		font-size: 24px;
		font-weight: bold;
	}

	&--success {
		color: green;
	}

	&--success-with-style {
		color: gold;
	}

	&--fail {
		color: orange;
	}

	&--critical-fail {
		color: darkred;
	}
}
</style>
