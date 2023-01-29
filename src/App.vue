<template>
	<SheetHeader />
	<CharacterSheet />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CharacterSheet from '@/pages/CharacterSheet/CharacterSheet.vue'
import SheetHeader from '@/components/header/SheetHeader.vue'
import { validateCharacter } from '@/consts/validators'
// TODO: Apply Feature-Sliced Design to the project
// TODO: Localize app
export default defineComponent({
	name: 'App',
	components: {
		SheetHeader,
		CharacterSheet,
	},
	watch: {
		'$store.state.characters': {
			handler(value) {
				window.localStorage.characters = JSON.stringify(value)
			},
			deep: true,
		},
		'$i18n.locale'(value) {
			window.localStorage.lang = value
		},
	},
	mounted() {
		if (window.localStorage.lang) {
			this.$i18n.locale = window.localStorage.lang
		}
		if (!window.localStorage.characters) {
			return
		}

		const characters = JSON.parse(window.localStorage.characters)
		if (characters.every(validateCharacter)) {
			this.$store.commit('loadCharacters', characters)
		}
	},
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
