<template>
	<MainBar
		:max="maxMental"
		:current="characters[current].mental.current">
		<template #icon>
			<MindIcon />
		</template>
	</MainBar>
</template>

<script lang="ts" setup>
import MainBar from '@/components/sheet-elements/bars/MainBar.vue'
import MindIcon from '@/components/ui/icons/MindIcon.vue'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

const store = useCharactersStore()

const { characters, current, maxMental } = storeToRefs(store)
</script>
