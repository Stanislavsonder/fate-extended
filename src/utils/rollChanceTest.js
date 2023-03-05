function rollDices(count) {
	const dices = Array(count).fill(undefined)
	return dices.map((dice, index) => {
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

function isDiceLucky(index) {
	return Math.random() <= (luck * 0.1) / Math.pow(2, index)
}

function luckyDiceResult() {
	return Math.random() <= 2 / 3 ? 1 : 0
}

function diceResult() {
	const value = Math.random()
	return value < 1 / 3 ? -1 : value < 2 / 3 ? 0 : 1
}

const results = []

let luck = 4

for (let i = 0; i < 100000; i++) {
	results.push(rollDices(4))
}

const rolls = results.map(howMuchRollsWithLuckyDice)

function howMuchRollsWithLuckyDice(data) {
	let sum = 0
	data.forEach(e => {
		sum += e.result
	})
	return sum
}

require('child_process').spawn('clip').stdin.end(rolls.join())

// eslint-disable-next-line no-console
console.log(
	rolls.length,
	'из них:',
	(rolls.filter(e => e >= 1).length / (rolls.length / 100)).toFixed(2) + '%',
	'как минимум 1,',
	(rolls.filter(e => e >= 2).length / (rolls.length / 100)).toFixed(2) + '%',
	'как минимум 2',
	(rolls.filter(e => e >= 3).length / (rolls.length / 100)).toFixed(2) + '%',
	'как минимум 3.',
	(rolls.filter(e => e === 4).length / (rolls.length / 100)).toFixed(2) + '%',
	'все 4.'
)
