export type DiceResult = {
	dice: 'lucky' | 'default'
	result: -1 | 0 | 1
}

const isDiceLucky = (diceOrder: number, luck: number) => {
	return Math.random() <= (luck * 0.1) / Math.pow(2, diceOrder)
}

const luckyDiceResult = () => {
	return Math.random() <= 2 / 3 ? 1 : 0
}

const diceResult = () => {
	const randomValue = Math.random()
	return randomValue < 1 / 3 ? -1 : randomValue < 2 / 3 ? 0 : 1
}

export const diceRoll = (amount: number, luck: number): DiceResult[] => {
	const dices = Array(amount).fill(undefined)

	return dices.map((dice, index) => {
		if (isDiceLucky(index, luck)) {
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

export function getResultWord(result: number): string {
	if (result <= -4) {
		return 'critical-fail'
	}
	if (result <= -2) {
		return 'fail'
	}
	if (result <= 1) {
		return 'stalemate'
	}
	if (result <= 3) {
		return 'success'
	}
	return 'success-with-style'
}
