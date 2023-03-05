<template>
	<div class="skill-dice-roll">
		<nav>
			<ul class="skill-dice-roll__roll-type-list">
				<li
					v-for="type in Object.keys(rollTypes)"
					:key="type">
					<Button
						:secondary="rollType !== type"
						@click="changeRollType(type)">
						{{ $t(`roll-type__${type}`) }}
					</Button>
				</li>
			</ul>
		</nav>
		<component
			:is="component"
			:key="rollType"
			:roll-type="rollType"
			:skill="skill" />
	</div>
</template>

<script lang="ts">
import { defineComponent, markRaw, PropType } from 'vue'
import RollBase from '@/features/RollSkillDice/rollTypes/RollBase.vue'
import { RollType, SkillProgress } from '@/types'
import { Button } from '@/shared/ui'
import RollAttack from '@/features/RollSkillDice/rollTypes/RollAttack.vue'
import RollDefence from '@/features/RollSkillDice/rollTypes/RollDefence.vue'

export default defineComponent({
	name: 'RollWindow',
	props: {
		skill: {
			type: Object as PropType<SkillProgress>,
			required: true
		}
	},
	components: {
		RollBase,
		RollAttack,
		RollDefence,
		Button
	},
	data() {
		return {
			rollType: RollType.Overcome,
			rollTypes: markRaw(
				Object.fromEntries([
					[RollType.Overcome, RollBase],
					[RollType.Advantage, RollBase],
					[RollType.Attack, RollAttack],
					[RollType.Defence, RollDefence]
				])
			)
		}
	},
	computed: {
		component() {
			return this.rollTypes[this.rollType]
		}
	},
	methods: {
		changeRollType(type: string) {
			this.rollType = type as RollType
		}
	}
})
</script>


<style lang="scss">
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
		gap: 12px;
		border: 2px solid var(--primary);
		min-height: 325px;
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
		position: relative;
		padding: 16px;
	}

	&__roll-result-value {
		position: absolute;
		right: -20px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 26px;
		font-weight: bold;
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

	&--mortal-strike {
		color: blueviolet;
	}

	&--success-with-style,
	&--critical-hit {
		color: gold;
	}

	&--success,
	&--hit {
		color: green;
	}

	&--fail,
	&--miss {
		color: gray;
	}

	&--critical-fail,
	&--critical-miss {
		color: darkred;
	}
}
</style>
