<template>
	<SheetHeader/>
	<CharList/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CharList from "@/components/CharList.vue";
import SheetHeader from "@/components/header/SheetHeader.vue";
import {Character} from "@/types";
import {validateCharacter} from "@/consts/validators";

interface Data {
	char: Character
}

export default defineComponent({
	name: 'App',
	components: {
		SheetHeader,
		CharList
	},
	watch: {
		'$store.state.character': {
			handler(value){
				window.localStorage.character = JSON.stringify(value);
			},
			deep: true
		},
		'$i18n.locale'(value) {
			window.localStorage.lang = value;
		}
	},
	mounted() {
		if (window.localStorage.lang) {
			this.$i18n.locale = window.localStorage.lang
		}
		if (!window.localStorage.character) {
			return
		}

		const character = JSON.parse(window.localStorage.character)
		if (validateCharacter(character)) {
			this.$store.commit('setCharacter', character)
		}

	}

});
</script>

<style src="./reset.css"/>
<style lang="scss">
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
}
</style>
