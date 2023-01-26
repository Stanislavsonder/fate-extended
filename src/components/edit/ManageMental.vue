<template>
	<ConfigButton
		@click="modal = true"
		type="MindIcon"
		hint="Manage Mental"
		variant="transparent"/>
	<ModalWindow
		v-model="modal"
		title="Manage Mental Points">
		<article class="character-health-manage">
			<section class="character-health-manage__section">
				<h3>
					Heal or Damage:
				</h3>
				<label>
					<input
						v-model="value"
						type="number"
						min="0"
						max="999">
				</label>
				<nav class="character-health-manage__hp-buttons">
					<button
						@click="heal"
						class="character-health-manage__hp-button">
						<Heal/>
					</button>
					<button
						@click="damage"
						class="character-health-manage__hp-button">
						<Damage/>
					</button>
				</nav>
			</section>
			<section class="character-health-manage__section">
				<h3>
					Change max Mental modifier:
				</h3>
				<label>
					<input
						v-model="modifier"
						type="number"
						min="-999"
						max="999">
				</label>
				<nav class="character-health-manage__hp-buttons">
					<Button @click="changeModifier">
						Apply
					</Button>
				</nav>
			</section>
		</article>
	</ModalWindow>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ModalWindow from "@/components/common/ModalWindow.vue";
import ConfigButton from "@/components/ui/ConfigButton.vue";
import Heal from "@/components/ui/icons/Heal.vue";
import Damage from "@/components/ui/icons/Damage.vue";
import Button from "@/components/ui/Button.vue";

export default defineComponent({
	name: "ManageMental",
	components: {
		Button,
		Damage,
		Heal,
		ConfigButton,
		ModalWindow,
	},
	data() {
		return {
			modal: false,
			value: 0,
			modifier: 0
		}
	},
	mounted() {
		this.modifier = this.$store.state.character.mental.modifier
	},
	methods: {
		heal() {
			this.$store.state.character.mental.current = Math.min(
				this.$store.state.character.mental.current + this.value, this.$store.getters.maxMental)
			this.close()
		},
		damage() {
			this.$store.state.character.mental.current = Math.max(
				this.$store.state.character.mental.current - this.value, 0)
			this.close()
		},
		changeModifier() {
			this.$store.state.character.mental.modifier = this.modifier
			this.close()
		},
		close() {
			this.value = 0
			this.modal = false
		}
	}
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
