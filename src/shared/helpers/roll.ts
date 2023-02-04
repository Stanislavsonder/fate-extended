import { RollType } from '@/types'

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

enum RollResult {
	'CriticalFail' = 'critical-fail',
	'Fail' = 'fail',
	'Stalemate' = 'stalemate',
	'Success' = 'success',
	'SuccessWithStyle' = 'success-with-style',
}

export function getResultWord(result: number): RollResult {
	if (result <= -4) {
		return RollResult.CriticalFail
	}
	if (result <= -2) {
		return RollResult.Fail
	}
	if (result <= 1) {
		return RollResult.Stalemate
	}
	if (result <= 3) {
		return RollResult.Success
	}
	return RollResult.SuccessWithStyle
}

export function calculateExperienceForTheRoll(result: number, difficulty: number, rollType: RollType): number {
	if (rollType === RollType.Attack || rollType === RollType.Defence) {
		return result >= 4 ? result : result >= 2 ? 3 : result >= -1 ? 1 : result >= -3 ? 0 : -5
	}
	if (result <= -4) {
		return rollType === RollType.Overcome ? -20 : -5
	}
	if (result <= -2) {
		return 0
	}
	if (result <= 1) {
		return Math.max(0, difficulty + (rollType === RollType.Overcome ? 2 : 1))
	}
	if (result <= 3) {
		return Math.max(0, difficulty + (rollType === RollType.Overcome ? 6 : 4))
	}
	if (rollType === RollType.Advantage) {
		return Math.max(1, difficulty + 8) * 2
	}
	return Math.max(1, difficulty * 2 + 6) * 2
}
