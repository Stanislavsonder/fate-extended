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
		border-radius: 0;
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
