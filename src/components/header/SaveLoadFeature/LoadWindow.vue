<template>
	<div class="load-window">
		<label class="load-window__label">
			<span>{{ $t('please-select-character-file') }}: </span>
			<UploadIcon class="load-window__upload" />
			<input
				accept=".fate"
				class="load-window__input"
				multiple
				type="file"
				@change="load" />
		</label>
		<div v-if="isValidCharacters">
			<h3
				v-for="(character, index) in loadedCharacters"
				:key="character.name + index">
				<strong> {{ character.name }}, </strong>
				{{ character.race }}
				{{ ` (${character.level} ${$t('level').toLocaleLowerCase()})` }}
			</h3>
		</div>
		<Button
			class="load-window__button"
			:title="$t('ui-confirm')"
			:disabled="errors.length || (errors.length && loadedCharacters.length)"
			@click="confirmLoading">
			{{ $t('ui-confirm') }}
		</Button>
		<p
			v-for="error in errors"
			:key="error">
			{{ error }}
		</p>
	</div>
</template>

<script lang="ts" setup>
// TODO: Add file drop support
import { defineEmits, ref } from 'vue'
import { validateCharacter } from '@/shared/helpers/validators'
import Button from '@/components/ui/Button.vue'
import UploadIcon from '@/components/ui/icons/UploadIcon.vue'
import { Character } from '@/types'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['close'])

const store = useCharactersStore()

const { characters } = storeToRefs(store)
const { changeCharacter, setCharacter } = store
const loadedCharacters = ref<Character[]>([])
const errors = ref<string[]>([])
const isValidCharacters = ref(true)

const load = (e: any) => {
	if (!e.target.files.length) {
		loadedCharacters.value = []
		return
	}
	isValidCharacters.value = true

	const files = [...e.target.files] as File[]

	files.forEach((file, index) => {
		const reader = new FileReader()
		reader.readAsText(file, 'UTF-8')
		reader.onload = event => {
			if (typeof event?.target?.result === 'string') {
				const character = JSON.parse(event.target.result)
				if (validateCharacter(character)) {
					loadedCharacters.value.push(character as Character)
				} else {
					isValidCharacters.value = false
					errors.value.push(`Unable to load '${character.name || index + 'nd'}' character.`)
				}
			}
		}
		reader.onerror = () => (isValidCharacters.value = false)
	})
}

const confirmLoading = () => {
	loadedCharacters.value.forEach(character => {
		setCharacter(character)
	})
	errors.value = []
	loadedCharacters.value = []
	changeCharacter(characters.value.length - 1)
	emit('close')
}
</script>

<style scoped lang="scss">
strong {
	font-weight: bolder;
}

.load-window {
	padding: 24px;

	&__label {
		padding: 50px;
		font-weight: bolder;
		font-size: 18px;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 2px dashed #181818;
		border-radius: 10px;
		height: 100px;
		margin: 20px 0;
		cursor: pointer;
		transition: background-color 0.15s ease-out;

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}

	&__upload {
		position: absolute;
		top: 50%;
		margin: 10px 0;
		transform: scale(2.5);
		opacity: 0.5;
	}

	&__input {
		visibility: hidden;
	}

	&__modules {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin: 10px;
	}

	&__module {
		width: 30px;
		height: 30px;
		svg {
			width: 30px;
			height: 30px;
		}
	}
}
</style>
