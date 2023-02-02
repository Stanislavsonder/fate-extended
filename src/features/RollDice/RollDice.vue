<template>
	<div>
		<IconButton
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
				@click="roll">
				{{ $t('roll-the-dice') }}
			</Button>
			<RollResult :result="result" />
		</article>
	</ModalWindow>
</template>

<script setup lang="ts">
// TODO: Optimize for tablet & mobile usage
import { Button, IconButton, ModalWindow } from '@/shared/ui'
import { ref } from 'vue'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { diceRoll } from '@/shared/helpers/roll'
import RollResult from '@/shared/ui/RollResult/RollResult.vue'

type DiceResult = {
	dice: 'lucky' | 'default'
	result: -1 | 0 | 1
}

const store = useCharactersStore()

const modal = ref(false)
const diceCount = ref(4)
const result = ref<DiceResult[]>([])

const roll = () => {
	result.value = diceRoll(diceCount.value, store.characters[store.current].luck)
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
		border: 2px solid var(--primary);
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
}
</style>
