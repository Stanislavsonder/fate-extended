<template>
<nav class="language">
	<button class="language__current" @click="modal = !modal">
		<LanguageFlag :lang="$i18n.locale"/>
		<span>
			{{ languages.find(e => e.lang === $i18n.locale)?.name || ''}}
		</span>
	</button>

	<ul
		class="language__list"
		v-if="modal">
		<li
			:key="language.lang"
			v-for="language in languages">
			<button
				class="language__button"
				@click="() => changeLanguage(language)"
				:title="language.name"
				>
				<LanguageFlag :lang="language.lang"/>
				<span>
					{{language.name}}
				</span>
			</button>
		</li>
	</ul>
</nav>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import LanguageFlag from "@/components/ui/icons/flags/LanguageFlag.vue";

export default defineComponent({
	name: "LanguageChangerFeature",
	components: {LanguageFlag},
	data() {
		return {
			modal: false,
			languages: [
				{
					lang: 'en',
					name: 'English'
				},
				{
					lang: 'ru',
					name: 'Русский'
				},
				{
					lang: 'bel',
					name: 'Беларуская'
				},
				{
					lang: 'ua',
					name: 'Українська'
				}
			]
		}
	},
	methods: {
		changeLanguage(language: {lang: string, name: string}) {
			this.$i18n.locale = language.lang
			this.modal = false
		}
	}
})
</script>

<style scoped lang="scss">
.language {
	width: 200px;
	box-sizing: border-box;
	padding-left: 6px;

	&__current,
	&__button {
		display: flex;
		align-items: center;
		height: 40px;
		width: 100%;
		background-color: transparent;
		border: none;
		color: white;
		padding: 2px 8px;
		gap: 8px;
		border-radius: 5px;

		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}

		svg {
			height: 20px;
			width: auto;
		}

		span {
			font-weight: bolder;

		}
	}

	&__button {
		height: 50px;
	}
	&__list {
		position: absolute;
		right: 0;
		top: 50px;
		background-color: #181818;
		padding: 10px;
		border-radius: 0 0 8px 8px;
		width: 200px;
	}
}
</style>
