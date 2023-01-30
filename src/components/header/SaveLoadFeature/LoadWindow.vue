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
		<div v-if="charValidator">
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
			:disabled="!charValidator"
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

<script lang="ts">
import { defineComponent } from 'vue'
import { validateCharacter } from '@/consts/validators'
import Button from '@/components/ui/Button.vue'
import UploadIcon from '@/components/ui/icons/UploadIcon.vue'
import { MODULES_LIST } from '@/consts/const'
import { Character } from '@/types'

// TODO: Add file drop support
interface Data {
	loadedCharacters: Character[]
	errors: string[]
}

export default defineComponent({
	MODULES_LIST: MODULES_LIST,
	name: 'LoadWindow',
	components: { UploadIcon, Button },
	emits: ['close'],
	data(): Data {
		return {
			loadedCharacters: [],
			errors: [],
		}
	},
	methods: {
		charValidator(char: unknown): boolean {
			return validateCharacter(char)
		},
		MODULES_LIST() {
			return MODULES_LIST
		},
		load(e: any) {
			if (!e.target.files.length) {
				this.loadedCharacters = []
				return
			}

			const files = [...e.target.files] as File[]

			files.forEach((file, index) => {
				const reader = new FileReader()
				reader.readAsText(file, 'UTF-8')
				reader.onload = event => {
					if (typeof event?.target?.result === 'string') {
						const char = JSON.parse(event.target.result)
						if (this.charValidator(char)) {
							this.loadedCharacters.push(char as Character)
						} else {
							this.errors.push(`Unable to load '${char.name || index + 'nd'}' character.`)
						}
					}
				}
			})
		},
		confirmLoading() {
			this.loadedCharacters.forEach(character => {
				this.$store.commit('setCharacter', character)
			})
			this.errors = []
			this.loadedCharacters = []
			this.$store.commit('changeCharacter', this.$store.state.characters.length - 1)
			this.$emit('close')
		},
	},
})
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
