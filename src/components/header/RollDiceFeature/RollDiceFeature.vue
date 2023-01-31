<template>
	<div>
		<ConfigButton
			:hint="$t('dice-roll')"
			type="Dices"
			variant="transparent"
			@click="modal = true" />
	</div>
	<ModalWindow
		v-model="modal"
		:title="$t('dice-roll')">
		<article class="roll-dices">
			<input
				v-model="diceCount"
				class="roll-dices__amount"
				type="number" />
			<Button
				:title="$t('roll-the-dice')"
				@click="rollDices">
				{{ $t('roll-the-dice') }}
			</Button>
			<div>
				<ul class="roll-dices__dices">
					<li
						v-for="(dice, index) in result"
						:key="index">
						<component
							:is="getDice(dice)"
							class="roll-dices__dice" />
					</li>
				</ul>
			</div>
		</article>
	</ModalWindow>
</template>

<script setup lang="ts">
// TODO: Optimize for tablet & mobile usage
import ConfigButton from '@/components/ui/ConfigButton.vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import Button from '@/components/ui/Button.vue'
import DiceNegative from '@/components/ui/icons/DiceNegative.vue'
import DicePositive from '@/components/ui/icons/DicePositive.vue'
import DiceNeutral from '@/components/ui/icons/DiceNeutral.vue'
import LuckyDiceNeutral from '@/components/ui/icons/LuckyDiceNeutral.vue'
import LuckyDicePositive from '@/components/ui/icons/LuckyDicePositive.vue'
import { ref } from 'vue'
import { useCharactersStore } from '@/app/store/CharacterStore'

type DiceResult = {
	dice: 'lucky' | 'default'
	result: -1 | 0 | 1
}

const store = useCharactersStore()

const dices = { DiceNeutral, DiceNegative, DicePositive, LuckyDicePositive, LuckyDiceNeutral }
const modal = ref(false)
const diceCount = ref(4)
const result = ref<DiceResult[]>([])

const rollDices = () => {
	const dices = Array(diceCount.value).fill(undefined)
	result.value = dices.map((dice, index) => {
		if (isDiceLucky(index)) {
			return {
				dice: 'lucky',
				result: luckyDiceResult(),
			}
		}
		return {
			dice: 'default',
			result: diceResult(),
		}
	})
}

const isDiceLucky = (index: number) => {
	return Math.random() <= (store.characters[store.current].luck * 0.1) / Math.pow(2, index)
}

const luckyDiceResult = () => {
	return Math.random() <= 2 / 3 ? 1 : 0
}

const diceResult = () => {
	const value = Math.random()
	return value < 1 / 3 ? -1 : value < 2 / 3 ? 0 : 1
}

const getDice = (result: DiceResult) => {
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
.roll-dices {
	padding: 16px;

	&__amount {
		place-content: center;
		text-align: center;
		width: 48px;
		height: 48px;
		border-radius: 100%;
		border: 2px solid #181818;
		font-size: 20px;
		font-weight: bolder;
		font-family: var(--inter);

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		-moz-appearance: textfield;
	}

	&__dices {
		display: flex;
		gap: 10px;
		justify-content: center;
		margin-top: 24px;
	}

	&__dice {
		width: 60px;
		height: 60px;
	}
}
</style>
