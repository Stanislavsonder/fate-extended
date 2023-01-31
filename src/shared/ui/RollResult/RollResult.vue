<template>
	<ul :class="{ column: column }">
		<li
			v-for="(die, index) in result"
			:key="index">
			<component :is="getDiceComponent(die)" />
		</li>
	</ul>
</template>

<script lang="ts" setup>
import DiceNeutral from '@/components/ui/icons/DiceNeutral.vue'
import DiceNegative from '@/components/ui/icons/DiceNegative.vue'
import DicePositive from '@/components/ui/icons/DicePositive.vue'
import LuckyDicePositive from '@/components/ui/icons/LuckyDicePositive.vue'
import LuckyDiceNeutral from '@/components/ui/icons/LuckyDiceNeutral.vue'
import { DiceResult } from '@/shared/helpers/roll'
import { defineProps, PropType } from 'vue'

defineProps({
	result: {
		type: Array as PropType<DiceResult[]>,
		default: () => [],
	},
	column: {
		type: Boolean,
		default: false,
	},
	size: {
		type: Number,
		default: 60,
	},
})

const getDiceComponent = (result: DiceResult) => {
	const dices = {
		DiceNeutral,
		DiceNegative,
		DicePositive,
		LuckyDicePositive,
		LuckyDiceNeutral,
	}
	if (result.dice === 'lucky') {
		if (result.result) {
			return dices['LuckyDicePositive']
		}
		return dices['LuckyDiceNeutral']
	}
	if (result.result === -1) {
		return dices['DiceNegative']
	}
	if (result.result) {
		return dices['DicePositive']
	}
	return dices['DiceNeutral']
}
</script>

<style scoped lang="scss">
ul {
	--size: v-bind(size);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: calc(var(--size) / 8 * 1px);

	&.column {
		flex-wrap: wrap;
		width: calc(var(--size) * 2 * 1px + var(--size) / 8 * 1px);
	}

	svg {
		width: calc(var(--size) * 1px);
		height: calc(var(--size) * 1px);
	}
}
</style>
