<template>
	<ConfigButton
		type="HealthIcon"
		:hint="$t('manage-health')"
		variant="transparent"
		@click="modal = true" />
	<ModalWindow
		v-model="modal"
		:title="$t('manage-health')">
		<article class="character-health-manage">
			<section class="character-health-manage__section">
				<h3>{{ $t('to-heal-or-to-hit') }}:</h3>
				<label>
					<input
						v-model="value"
						type="number"
						min="0"
						max="999" />
				</label>
				<nav class="character-health-manage__hp-buttons">
					<button
						:title="$t('to-heal')"
						class="character-health-manage__hp-button"
						@click="heal">
						<Heal />
					</button>
					<button
						:title="$t('to-hit')"
						class="character-health-manage__hp-button"
						@click="damage">
						<Damage />
					</button>
				</nav>
			</section>
			<section class="character-health-manage__section">
				<h3>{{ $t('change-max-health-modifier') }}:</h3>
				<label>
					<input
						v-model="modifier"
						type="number"
						min="-999"
						max="999" />
				</label>
				<nav class="character-health-manage__hp-buttons">
					<Button
						:title="$t('ui-apply')"
						@click="changeModifier">
						{{ $t('ui-apply') }}
					</Button>
				</nav>
			</section>
		</article>
	</ModalWindow>
</template>

<script>
import { defineComponent } from 'vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import ConfigButton from '@/components/ui/ConfigButton.vue'
import Heal from '@/components/ui/icons/Heal.vue'
import Damage from '@/components/ui/icons/Damage.vue'
import Button from '@/components/ui/Button.vue'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
	name: 'ManageHealth',
	components: {
		Button,
		Damage,
		Heal,
		ConfigButton,
		ModalWindow,
	},
	setup() {
		const store = useCharactersStore()

		const { characters, current, maxHealth } = storeToRefs(store)
		const { updateName, updateRace, updateLuck } = store

		return {
			characters,
			current,
			maxHealth,
			updateName,
			updateRace,
			updateLuck,
		}
	},
	data() {
		return {
			modal: false,
			value: 0,
			modifier: 0,
		}
	},
	watch: {
		modal() {
			this.value = 0
			this.modifier = this.characters[this.current].health.modifier
		},
	},
	mounted() {
		this.modifier = this.characters[this.current].health.modifier
	},
	methods: {
		heal() {
			this.characters[this.current].health.current = Math.min(
				this.characters[this.current].health.current + this.value,
				this.maxHealth
			)
			this.close()
		},
		damage() {
			this.characters[this.current].health.current = Math.max(
				this.characters[this.current].health.current - this.value,
				0
			)
			this.close()
		},
		changeModifier() {
			this.characters[this.current].health.modifier = this.modifier
			this.close()
		},
		close() {
			this.value = 0
			this.modal = false
		},
	},
})
</script>

<style scoped lang="scss">
.character-health-manage {
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	padding: 24px;

	h3 {
		font-weight: bold;
		margin-bottom: 16px;
	}

	input {
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

	&__hp-buttons {
		display: flex;
		gap: 16px;
		justify-content: center;
		margin: 16px 0;
	}
	&__hp-button {
		width: 36px;
		height: 36px;
		display: grid;
		place-content: center;
		border: none;
		border-radius: 100%;
		background-color: white;

		transition: background-color 0.15s ease-out, transform 0.15s ease-out;

		&:hover {
			background-color: rgba(18, 18, 18, 0.1);
			transform: scale(1.5);
		}
	}
}
</style>
