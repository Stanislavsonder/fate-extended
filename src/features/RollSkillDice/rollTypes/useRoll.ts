import { useCharactersStore } from '@/app/store/CharacterStore'
import { computed, ref } from 'vue'
import { calculateExperienceForTheRoll, DiceResult, diceRoll, getResultWord } from '@/shared/helpers/roll'
import { RollType, SkillProgress } from '@/types'
import rules from '@/shared/constants/rules'

function useRoll(s: SkillProgress, rollType: RollType) {
	const store = useCharactersStore()
	const luck = store.characters[store.current].luck
	const skill = s
	const result = ref<DiceResult[]>([])
	const difficulty = ref(0)
	const resultValue = ref(0)
	const experienceGained = ref(0)
	const bonus = ref(0)
	const isRollIsCounts = ref(true)

	const experience = computed(() => {
		return skill.experience + ' / ' + rules.LEVEL_CUPS[(skill.level || 0) - 1]
	})

	const gradient = computed(() => {
		const p = ((skill.experience || 0) / rules.LEVEL_CUPS[(skill.level || 0) - 1]) * 100
		return `linear-gradient(to top, #181818 0%, #181818 ${p}%, transparent ${p}%)`
	})

	function addExperience() {
		if (isRollIsCounts.value) {
			experienceGained.value = calculateExperienceForTheRoll(resultValue.value, difficulty.value, rollType)
			store.addSkillExperience(skill.name || '', experienceGained.value)
		}
	}

	function getResult() {
		return diceRoll(4, luck)
	}

	function roll(affectToExperience: boolean) {
		result.value = getResult()
		resultValue.value = calculateResult()
		if (affectToExperience && isRollIsCounts) {
			addExperience()
		}
	}

	function signed(number: number, isZero = false): string {
		return new Intl.NumberFormat('en-US', {
			signDisplay: isZero ? 'exceptZero' : 'always'
		}).format(number)
	}

	function calculateResult() {
		const diceResult = result.value.reduce((acc, cur) => acc + cur.result, 0)
		return diceResult - difficulty.value + bonus.value + (skill.level || 0)
	}

	function clear() {
		result.value = []
		difficulty.value = 0
		resultValue.value = 0
		bonus.value = 0
		experienceGained.value = 0
		isRollIsCounts.value = true
	}

	return {
		clear,
		signed,
		roll,
		calculateResult,
		addExperience,
		getResultWord,
		gradient,
		experience,
		result,
		difficulty,
		resultValue,
		experienceGained,
		bonus,
		isRollIsCounts
	}
}

export default useRoll
