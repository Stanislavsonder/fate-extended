<template>
	<div class="skill-dice-roll__wrapper">
		<RollDifficulty
			v-if="isHitPreRolled && !isHitRolled"
			v-model="difficulty" />
		<SkillBubble
			v-model:bonus="bonus"
			:is-experience-displayed="result.length && isHitRolled"
			:experience-gained="experienceGained"
			:skill="skill" />
		<div
			v-show="result.length"
			class="skill-dice-roll__roll-result">
			<RollResult
				:result="result"
				:size="40" />
			<span class="skill-dice-roll__roll-result-value">
				{{ signed(resultValue, true) }}
			</span>
		</div>
		<div
			v-show="result.length && !(isHitPreRolled && !isHitRolled)"
			class="skill-dice-roll-result"
			:class="`skill-dice-roll-result--${getResultWord(resultValue, !isHitPreRolled && !isHitRolled)}`">
			<p class="skill-dice-roll-result__word">
				{{
					$t(
						`${isHitPreRolled || isHitRolled ? 'roll-hit' : 'roll-result'}__${getResultWord(
							resultValue,
							isHitPreRolled || isHitRolled
						)}`
					)
				}}
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
		<Button
			@click="!isHitPreRolled ? preRollForHit() : isHitPreRolled && !isHitRolled ? rollForHit() : rollForDamage()">
			{{ $t(!isHitPreRolled ? 'roll__hit--pre' : isHitPreRolled && !isHitRolled ? 'roll__hit' : 'roll__damage') }}
		</Button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import useRoll from './useRoll'
import { RollType, SkillProgress } from '@/types'
import { Button } from '@/shared/ui'
import RollResult from '@/shared/ui/RollResult/RollResult.vue'
import RollDifficulty from '@/features/RollSkillDice/part/RollDifficulty.vue'
import SkillBubble from '@/features/RollSkillDice/part/SkillBubble.vue'

export default defineComponent({
	name: 'RollAttack',
	components: {
		SkillBubble,
		RollDifficulty,
		RollResult,
		Button
	},
	props: {
		skill: {
			type: Object as PropType<SkillProgress>,
			required: true
		},
		rollType: {
			type: String as PropType<RollType>,
			required: true
		}
	},
	setup(props) {
		return useRoll(props.skill, props.rollType)
	},
	data() {
		return {
			isHitPreRolled: false,
			isHitRolled: false
		}
	},
	methods: {
		preRollForHit() {
			this.roll(false)
			this.isHitPreRolled = true
		},
		rollForHit() {
			this.resultValue = this.calculateResult()
			this.addExperience()
			if (this.resultValue <= 0) {
				this.isHitPreRolled = false
				return
			}
			this.isHitRolled = true
		},
		rollForDamage() {
			this.difficulty = 0
			this.roll(false)
			this.isHitPreRolled = false
			this.isHitRolled = false
		}
	}
})
</script>
