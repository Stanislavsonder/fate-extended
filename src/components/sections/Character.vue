<template>
	<Card
		:title="$t('character')"
		class="character">
		<template #buttons>
			<ManageMana />
			<ManageMental />
			<ManageHealth />
			<EditCharacterInfo />
		</template>

		<template #content>
			<div class="character__content">
				<div class="character__person">
					<img
						class="character__image"
						src="../../assets/CharacterPlaceholder.png"
						alt="Character Placeholder" />
					<span class="character__level">
						{{ $store.state.characters[$store.state.current].level }}
					</span>
				</div>
				<div class="character__bars">
					<div class="character__info">
						<h2>
							{{ $store.state.characters[$store.state.current].name || 'New Character' }}
						</h2>
						<h3>
							{{
								$store.state.characters[$store.state.current].race ||
								"Click 'Edit' button above to change race and name"
							}}
						</h3>
					</div>
					<div class="character__core-bars">
						<HealthBar />
						<MentalBar />
					</div>
					<div class="character__additional-bars">
						<ManaBar :mana="$store.state.characters[$store.state.current].mana" />
						<IntoxicationBar
							v-if="false"
							:intoxication="$store.state.characters[$store.state.current].intoxication" />
					</div>
				</div>
				<div class="character__luck">
					<span class="character__luck-value">
						{{ $store.state.characters[$store.state.current].luck }}
					</span>
					<Luck class="character__luck-icon" />
				</div>
			</div>
		</template>
	</Card>
</template>

<script lang="ts">
import Card from '@/components/common/Card.vue'
import HealthBar from '@/components/sheet-elements/bars/HealthBar.vue'
import MentalBar from '@/components/sheet-elements/bars/MentalBar.vue'
import ManaBar from '@/components/sheet-elements/bars/ManaBar.vue'
import IntoxicationBar from '@/components/sheet-elements/bars/IntoxicationBar.vue'
import { defineComponent } from 'vue'
import EditCharacterInfo from '@/components/edit/EditCharacterInfo.vue'
import ManageHealth from '@/components/edit/ManageHealth.vue'
import ManageMental from '@/components/edit/ManageMental.vue'
import ManageMana from '@/components/edit/ManageMana.vue'
import Luck from '@/components/ui/icons/Luck.vue'

export default defineComponent({
	name: 'Character',
	components: {
		Luck,
		ManageMana,
		ManageMental,
		ManageHealth,
		EditCharacterInfo,
		IntoxicationBar,
		ManaBar,
		MentalBar,
		HealthBar,
		Card,
	},
})
</script>

<style scoped lang="scss">
.character {
	position: relative;
	width: 100%;

	@include media-down(tablet) {
		width: auto;
	}

	&__content {
		display: flex;
		width: 100%;
		gap: 50px;

		@include media-only(mobile) {
			flex-direction: column;
			gap: 16px;
			padding-bottom: 60px;
		}
	}

	&__person {
		position: relative;
		height: 183px;
	}

	&__info {
		display: flex;
		justify-content: space-between;

		@include media-only(mobile) {
			flex-direction: column;
			gap: 6px;
		}

		h2,
		h3 {
			display: flex;
			align-items: center;

			@include media-only(mobile) {
				justify-content: center;
			}
		}

		h2 {
			font-size: 24px;
			font-weight: bold;
		}

		h3 {
			font-weight: 500;
		}
	}

	&__image {
		height: 100%;
		aspect-ratio: 1/1;
		object-fit: cover;
		border: 1px solid #181818;
		box-sizing: border-box;
		border-radius: 5px;
	}

	&__level {
		position: absolute;
		display: grid;
		place-content: center;
		font-weight: bold;
		font-size: 24px;
		width: 48px;
		height: 48px;
		border-radius: 14px 0 4px 0;
		background-color: white;
		right: 0;
		bottom: 0;
		border: 1px solid #181818;
		box-sizing: border-box;

		@include media-only(mobile) {
			right: 50%;
			transform: translateX(50%);
			border-radius: 14px 14px 0 0;
		}
	}

	&__bars {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
	}

	&__core-bars,
	&__additional-bars {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
	}

	&__additional-bars {
		width: 50%;
	}

	&__luck {
		position: absolute;
		display: grid;
		place-content: center;
		right: 15px;
		bottom: 15px;
		width: 48px;
		height: 48px;

		@include media-only(mobile) {
			right: 50%;
			transform: translateX(50%);
		}
	}
	&__luck-value {
		position: absolute;
		display: grid;
		width: 26px;
		height: 26px;
		border-radius: 100%;
		place-content: center;
		font-size: 26px;
		font-weight: bolder;
		color: white;
		background-color: black;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	&__luck-icon {
		width: 48px;
		height: 48px;
	}
}
</style>
