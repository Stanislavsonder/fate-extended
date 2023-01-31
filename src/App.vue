<template>
	<SheetHeader />
	<CharacterSheet />
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'

import CharacterSheet from '@/pages/CharacterSheet/CharacterSheet.vue'
import SheetHeader from '@/components/header/SheetHeader.vue'

import { validateCharacter } from '@/shared/helpers/validators'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

// TODO: Apply Feature-Sliced Design to the project

const store = useCharactersStore()
const i18 = useI18n()

const { characters } = storeToRefs(store)

watch(i18.locale, language => {
	window.localStorage.language = language
})

watch(
	characters,
	characters => {
		window.localStorage.characters = JSON.stringify(characters)
	},
	{
		deep: true,
	}
)
onMounted(() => {
	i18.locale.value = window.localStorage.language || 'en'

	if (window.localStorage.characters) {
		const parsedCharacters = JSON.parse(window.localStorage.characters)
		if (Array.isArray(parsedCharacters) && parsedCharacters.every(validateCharacter)) {
			store.loadCharacters(parsedCharacters)
		}
	}
})
</script>

<style lang="scss">
button {
	cursor: pointer;
}
body {
	font-family: var(--inter);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: var(--text);
	background-color: var(--background);

	&::-webkit-scrollbar {
		display: none;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
}
/* width */
::-webkit-scrollbar {
	width: 16px;
}

/* Track */
::-webkit-scrollbar-track {
	background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #181818;
	border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>
