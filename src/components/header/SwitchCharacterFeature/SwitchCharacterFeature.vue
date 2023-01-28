<template>
	<nav>
		<ConfigButton
			type="Characters"
			@click="modal = true"
			variant="transparent"/>
	</nav>
	<ModalWindow
		title="Switch character"
		v-model="modal">
		<div class="switch-character">
			<ul class="switch-character__list">
				<li
					class="switch-character__list-item"
					v-for="(character, index) in $store.state.characters"
					:key="character.name">
					<button
						class="switch-character__button"
						@click="() => setCharacter(index)">
						{{ character.name || 'unnamed character' }},
						({{ character.level }})
					</button>
					<button
						class="switch-character__remove"
						@click="() => removeCharacter(index)"/>
				</li>
			</ul>
		</div>

	</ModalWindow>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ConfigButton from "@/components/ui/ConfigButton.vue";
import ModalWindow from "@/components/common/ModalWindow.vue";

export default defineComponent({
	name: "SwitchCharacterFeature",
	components: {ModalWindow, ConfigButton},
	data() {
		return {
			modal: false
		}
	},
	methods: {
		setCharacter(index: number) {
			this.$store.commit('changeCharacter', index)
			this.modal = false
		},
		removeCharacter(index: number) {
			this.$store.commit('removeCharacter', index)
		}
	}
})
</script>

<style scoped lang="scss">
.switch-character {
	padding: 16px;

	&__list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	&__list-item {
		position: relative;
		width: 100%;
		height: 50px;
	}

	&__button {
		width: 100%;
		height: 100%;
		background-color: #181818;
		color: white;
		border-radius: 50px;
		border: none;
		font-weight: bold;
		font-size: 20px;
		transition: background-color 0.15s ease-out;

		&:hover {
			background-color: #2f2f2f;
		}
	}

	&__remove {
		position: absolute;
		right: 16px;
		top: 50%;
		width: 36px;
		height: 36px;
		transform: translateY(-50%);
		background-color: #f87070;
		border: none;
		border-radius: 100%;
		color: white;
		transition: background-color 0.15s ease-out;

		&:hover {
			background-color: #d25050;
		}

		&:after,
		&:before {
			content: '';
			position: absolute;
			width: 3px;
			border-radius: 5px;
			height: 60%;
			background-color: white;
			left: 50%;
			top: 50%;
		}
		&:after {
			transform: translate3d(-50%, -50%, 0) rotate(45deg);
		}

		&:before {
			transform: translate3d(-50%, -50%, 0) rotate(-45deg);
		}
	}
}

</style>
