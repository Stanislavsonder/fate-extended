<template>
	<nav class="language">
		<button class="language__current" @click="modal = !modal">
			<LanguageIcon :lang="$i18n.locale" />
			<span class="language__current-name">
				{{ languages.find((e) => e.lang === $i18n.locale)?.name || "" }}
			</span>
		</button>

		<ul v-if="modal" class="language__list">
			<li v-for="language in languages" :key="language.lang">
				<button
					class="language__button"
					:title="language.name"
					@click="() => changeLanguage(language)"
				>
					<LanguageIcon :lang="language.lang" />
					<span class="language__list-name">
						{{ language.name }}
					</span>
				</button>
			</li>
		</ul>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LanguageIcon } from "@/shared/ui";

export default defineComponent({
	name: "LanguageChanger",
	components: { LanguageIcon },
	data() {
		return {
			modal: false,
			languages: [
				{
					lang: "en",
					name: "English",
				},
				{
					lang: "ru",
					name: "Русский",
				},
				{
					lang: "be",
					name: "Беларуская",
				},
				{
					lang: "ua",
					name: "Українська",
				},
			],
		};
	},
	methods: {
		changeLanguage(language: { lang: string; name: string }) {
			this.$i18n.locale = language.lang;
			this.modal = false;
		},
	},
});
</script>

<style scoped lang="scss">
.language {
	width: 200px;
	box-sizing: border-box;
	padding-left: 6px;
	margin-left: auto;

	@include media-only(mobile) {
		width: auto;
	}

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

		@include media-only(mobile) {
			width: auto;
		}

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

	&__current-name {
		@include media-only(mobile) {
			display: none;
		}
	}

	&__list-name {
		@include media-only(mobile) {
			display: none;
		}
	}

	&__button {
		height: 50px;
	}
	&__list {
		position: absolute;
		z-index: 100;
		right: 0;
		top: 50px;
		background-color: var(--primary);
		padding: 10px;
		border-radius: 0 0 8px 8px;
		width: 200px;

		@include media-only(mobile) {
			width: auto;
			padding: 6px 18px;
		}
	}
}
</style>
