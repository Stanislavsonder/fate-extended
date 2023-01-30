<template>
	<ConfigButton
		type="EditIcon"
		:hint="$t('edit')"
		variant="transparent"
		@click="modal = true" />
	<ModalWindow
		v-model="modal"
		:title="$t('edit-character-info')">
		<article class="character-info-edit">
			<div class="character-info-edit__name-section">
				<label>
					<input
						v-model="name"
						:placeholder="$t('character__name')" />
				</label>
				<label>
					<input
						v-model="race"
						:placeholder="$t('race')" />
				</label>
			</div>
			<div class="character-info-edit__luck-section">
				<label>
					<span> {{ $t('luck') }}: </span>
					<input
						v-model="luck"
						class=""
						type="number"
						inputmode="number"
						:min="0"
						:max="4" />
				</label>
			</div>
			<nav>
				<Button
					:title="$t('ui-discard')"
					secondary
					@click="close">
					{{ $t('ui-discard') }}
				</Button>
				<Button
					:title="$t('ui-save')"
					:disabled="!isValidData"
					@click="save">
					{{ $t('ui-save') }}
				</Button>
			</nav>
		</article>
	</ModalWindow>
</template>

<script lang="ts">
import ConfigButton from '@/components/ui/ConfigButton.vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import { defineComponent } from 'vue'
import Button from '@/components/ui/Button.vue'

export default defineComponent({
	name: 'EditCharacterInfo',
	components: { Button, ModalWindow, ConfigButton },
	data() {
		return {
			modal: false,
			name: '',
			race: '',
			luck: 0,
		}
	},
	computed: {
		isValidData(): boolean {
			return !!(this.name && this.race)
		},
	},
	watch: {
		modal(value) {
			if (!value) {
				return
			}
			this.luck = this.$store.state.characters[this.$store.state.current].luck
			this.name = this.$store.state.characters[this.$store.state.current].name
			this.race = this.$store.state.characters[this.$store.state.current].race
		},
	},
	methods: {
		close() {
			this.modal = false
			this.name = ''
			this.race = ''
			this.luck = 0
		},
		save() {
			this.$store.commit('updateName', this.name)
			this.$store.commit('updateRace', this.race)
			this.$store.commit('updateLuck', this.luck)
			this.modal = false
		},
	},
})
</script>

<style scoped lang="scss">
.character-info-edit {
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 16px;

	&__name-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;

		label {
			display: flex;
			flex-direction: column;
			width: 80%;
			gap: 6px;
			font-weight: bold;
			margin-bottom: 16px;
		}

		input {
			height: 50px;
			border-radius: 10px;
			border: 1px solid #181818;
			padding: 0 15px;
			text-align: center;
			font-size: 20px;
			font-weight: bolder;
			font-family: var(--inter);
		}
	}
	&__luck-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;

		label {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 50%;
			gap: 6px;
		}

		input {
			display: grid;
			place-content: center;
			text-align: center;
			width: 48px;
			height: 48px;
			border-radius: 100%;
			border: 2px solid #181818;
			font-size: 20px;
			font-weight: bolder;
			font-family: var(--inter);

			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
			-moz-appearance: textfield;
		}
	}
}
</style>
