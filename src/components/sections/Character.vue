<template>
	<Card :title="$t('character')" class="character">
		<template v-slot:buttons>
			<ManageMana/>
			<ManageMental/>
			<ManageHealth/>
			<EditCharacterInfo/>
		</template>

		<template v-slot:content>
			<div class="character__content">
				<div class="character__person">
					<img
						class="character__image"
						src="/img/Character%20Placeholder.png"
						alt="Character Placeholder">
					<span class="character__level">
						{{ $store.state.character.level }}
					</span>
				</div>
				<div class="character__bars">
					<div class="character__info">
						<h2>
							{{ this.$store.state.character.name || 'New Character' }}
						</h2>
						<h3>
							{{
								this.$store.state.character.race ||
								"Click 'Edit' button above to change race and name"
							}}
						</h3>
					</div>
					<div class="character__core-bars">
						<HealthBar/>
						<MentalBar/>
					</div>
					<div class="character__additional-bars">
						<ManaBar :mana="this.$store.state.character.mana"/>
						<IntoxicationBar
							v-if="false"
							:intoxication="this.$store.state.character.intoxication"/>
					</div>
				</div>
				<div class="character__luck">
					<span class="character__luck-value">
						{{ $store.state.character.luck }}
					</span>
					<Luck class="character__luck-icon"/>
				</div>
			</div>
		</template>
	</Card>
</template>

<script lang="ts">
import Card from "@/components/common/Card.vue";
import HealthBar from "@/components/sheet-elements/bars/HealthBar.vue";
import MentalBar from "@/components/sheet-elements/bars/MentalBar.vue";
import ManaBar from "@/components/sheet-elements/bars/ManaBar.vue";
import IntoxicationBar from "@/components/sheet-elements/bars/IntoxicationBar.vue";
import {defineComponent} from "vue";
import EditCharacterInfo from "@/components/edit/EditCharacterInfo.vue";
import ManageHealth from "@/components/edit/ManageHealth.vue";
import ManageMental from "@/components/edit/ManageMental.vue";
import ManageMana from "@/components/edit/ManageMana.vue";
import Luck from "@/components/ui/icons/Luck.vue";

export default defineComponent({
	name: "Character",
	components: {
		Luck,
		ManageMana,
		ManageMental,
		ManageHealth,
		EditCharacterInfo,
		IntoxicationBar, ManaBar, MentalBar, HealthBar, Card
	},
})
</script>

<style scoped lang="scss">
.character {
	position: relative;
	width: 100%;

	&__content {
		display: flex;
		width: 100%;
		gap: 50px;
	}

	&__person {
		position: relative;
		height: 183px;
	}

	&__info {
		display: flex;
		justify-content: space-between;

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
		border: 1px solid black;
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
		right: 1px;
		bottom: 1px;
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
