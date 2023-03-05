<template>
	<div class="skill-dice-roll__wrapper">
		<div class="skill-dice-roll__difficulty">
			<button
				class="skill-dice-roll__difficulty-button skill-dice-roll__difficulty-button--down"
				@click="difficulty--">
				<Icon name="Caret" />
			</button>
			<button
				class="skill-dice-roll__difficulty-button skill-dice-roll__difficulty-button--up"
				@click="difficulty++">
				<Icon name="Caret" />
			</button>
			<span class="skill-dice-roll__difficulty-value">
				{{ difficulty }}
			</span>
			<span class="skill-dice-roll__difficulty-text">
				{{ $t('difficulty') }}
			</span>
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
						<Icon name="Caret" />
					</button>
					<button
						class="skill-dice-roll-skill__bonus-button skill-dice-roll-skill__bonus-button--down"
						@click="bonus--">
						<Icon name="Caret" />
					</button>
				</span>
				<div
					class="skill-dice-roll-skill__circle-bg"
					:style="{ backgroundImage: gradient }" />
				<p class="skill-dice-roll-skill__level">
					{{ skill.level }}
				</p>
				<p class="skill-dice-roll-skill__experience">
					{{ experience }}
				</p>
			</div>
			<p class="skill-dice-roll-skill__name">
				{{ $t(`skill__${skill.name}`) }}
			</p>
		</div>
		<div class="skill-dice-roll__roll-result">
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
			:class="`skill-dice-roll-result--${getResultWord(resultValue)}`">
			<p class="skill-dice-roll-result__word">
				{{ $t(`roll-result__${getResultWord(resultValue, true)}${isHitRolled ? '--hit' : ''}`) }}
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
import Icon from '@/shared/ui/Icon/Icon.vue'
import RollResult from '@/shared/ui/RollResult/RollResult.vue'

export default defineComponent({
	name: 'RollAttack',
	components: {
		RollResult,
		Icon,
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
			if (this.resultValue <= 0) {
				this.isHitPreRolled = false
				return
			}
			this.isHitRolled = true
		},
		rollForDamage() {
			this.difficulty = 0
			this.roll(true)
			this.isHitPreRolled = false
			this.isHitRolled = false
		}
	}
})
</script>
