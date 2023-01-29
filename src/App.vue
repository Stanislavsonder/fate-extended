<template>
	<SheetHeader />
	<CharList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CharList from '@/components/CharList.vue'
import SheetHeader from '@/components/header/SheetHeader.vue'
import { validateCharacter } from '@/consts/validators'

export default defineComponent({
	name: 'App',
	components: {
		SheetHeader,
		CharList,
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

<style src="./styles/reset.css"/>
<style lang="scss">
@import 'src/styles/breakpoints';

:root {
	--inter: Inter, Avenir, Helvetica, Arial, sans-serif;
}
button {
	cursor: pointer;
}
body {
	font-family: var(--inter);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: #fdfcfc;

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
