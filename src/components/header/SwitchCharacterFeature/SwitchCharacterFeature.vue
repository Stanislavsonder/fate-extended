<template>
	<nav class="characters-tabs">
		<ul class="characters-tabs__list">
			<li
				v-for="(character, index) in $store.state.characters"
				:key="character.name"
				class="characters-tabs__tab"
				:class="{ 'characters-tabs__tab--current': index === $store.state.current }">
				<button
					class="characters-tabs__button"
					@click="() => setCharacter(index)">
					<span>
						{{ shortenName(character.name) || 'New Character' }}
					</span>

					<button
						class="characters-tabs__remove"
						@click="() => removeCharacter(index)">
						x
					</button>
				</button>
			</li>
			<li class="characters-tabs__tab">
				<button
					class="characters-tabs__button characters-tabs__button--new"
					@click="newCharacter">
					+
				</button>
			</li>
		</ul>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'SwitchCharacterFeature',
	data() {
		return {
			modal: false,
		}
	},
	methods: {
		setCharacter(index: number) {
			this.$store.commit('changeCharacter', index)
			this.modal = false
		},
		removeCharacter(index: number) {
			this.$store.commit('removeCharacter', index)
		},
		newCharacter() {
			this.$store.commit('addNewCharacter')
		},
		shortenName(name: string) {
			return name
		},
	},
})
</script>

<style scoped lang="scss">
.characters-tabs {
	height: 30px;
	margin-bottom: 26px;

	&__list {
		display: flex;
		flex: 1 1;
		color: white;
		border-radius: 0 0 10px 10px;
	}

	&__tab {
		position: relative;
		flex: 1 1;
		background-color: #2d2d2d;
		height: 30px;
		max-width: 30ch;
		box-sizing: border-box;

		&:not(:first-child) {
			border-left: 2px solid #181818;
		}
		&:not(:last-child) {
			border-right: 2px solid #181818;
		}

		&:first-child {
			border-radius: 0 0 0 5px;
		}

		&:last-child {
			border-radius: 0 0 5px 0;
		}
		transition: background-color 0.15s ease-out;

		&--current {
			background-color: #181818;

			button:first-child {
				cursor: auto;
				font-weight: bold;
			}
		}

		&:hover {
			background-color: #181818;
		}
	}

	&__button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2px;
		width: 100%;
		height: 100%;
		background-color: transparent;
		border: none;
		color: white;
		padding: 5px 10px;

		span {
			width: calc(100% - 16px);
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&--new {
			justify-content: center;
		}
	}

	&__remove {
		position: absolute;
		display: grid;
		place-content: center;
		right: 4px;
		border: none;
		background-color: white;
		border-radius: 100%;
		transition: background-color 0.15s ease-out;

		width: 16px;
		height: 16px;

		&:hover {
			background-color: #cecece;
		}
	}
}
</style>
