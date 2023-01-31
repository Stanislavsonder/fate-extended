<template>
	<MainBar
		:max="maxHealth"
		:current="characters[current].health.current">
		<template #icon>
			<HealthIcon />
		</template>
	</MainBar>
</template>

<script lang="ts" setup>
import HealthIcon from '@/components/ui/icons/HealthIcon.vue'
import MainBar from '@/components/sheet-elements/bars/MainBar.vue'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

const store = useCharactersStore()
const { characters, current, maxHealth } = storeToRefs(store)
</script>
