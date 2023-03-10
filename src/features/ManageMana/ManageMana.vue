<template>
	<IconButton
		type="ManaIcon"
		:hint="$t('manage-mana')"
		variant="transparent"
		@click="modal = true"
	/>
	<ModalWindow v-model="modal" :title="$t('manage-mana')">
		<article class="character-health-manage">
			<section class="character-health-manage__section">
				<h3>{{ $t("restore-or-spend-mana") }}:</h3>
				<label>
					<input v-model="value" type="number" min="0" max="999" />
				</label>
				<nav class="character-health-manage__hp-buttons">
					<button
						:title="$t('restore')"
						class="character-health-manage__hp-button"
						@click="heal"
					>
						<Icon name="Heal" />
					</button>
					<button
						:title="$t('spend')"
						class="character-health-manage__hp-button"
						@click="damage"
					>
						<Icon name="Damage" />
					</button>
				</nav>
			</section>
			<section class="character-health-manage__section">
				<h3>{{ $t("change-max-mana-modifier") }}:</h3>
				<label>
					<input
						v-model="modifier"
						type="number"
						min="-999"
						max="999"
					/>
				</label>
				<nav class="character-health-manage__hp-buttons">
					<Button :title="$t('ui-apply')" @click="changeModifier">
						{{ $t("ui-apply") }}
					</Button>
				</nav>
			</section>
		</article>
	</ModalWindow>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button, Icon, IconButton, ModalWindow } from "@/shared/ui";
import { useCharactersStore } from "@/app/store/CharacterStore";
import { storeToRefs } from "pinia";

export default defineComponent({
	name: "ManageMana",
	components: {
		Button,
		IconButton,
		Icon,
		ModalWindow,
	},
	setup() {
		const store = useCharactersStore();

		const { characters, current, maxMana } = storeToRefs(store);
		const { updateName, updateRace, updateLuck } = store;

		return {
			characters,
			current,
			maxMana,
			updateName,
			updateRace,
			updateLuck,
		};
	},
	data() {
		return {
			modal: false,
			value: 0,
			modifier: 0,
		};
	},
	watch: {
		modal() {
			this.value = 0;
			this.modifier = this.characters[this.current].mana.modifier;
		},
	},
	mounted() {
		this.modifier = this.characters[this.current].mana.modifier;
	},
	methods: {
		heal() {
			this.characters[this.current].mana.current = Math.min(
				this.characters[this.current].mana.current + this.value,
				this.maxMana
			);
			this.close();
		},
		damage() {
			this.characters[this.current].mana.current = Math.max(
				this.characters[this.current].mana.current - this.value,
				0
			);
			this.close();
		},
		changeModifier() {
			this.characters[this.current].mana.modifier = this.modifier;
			this.close();
		},
		close() {
			this.value = 0;
			this.modal = false;
		},
	},
});
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
		border: 2px solid var(--primary);
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
