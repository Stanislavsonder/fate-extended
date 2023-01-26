<template>
	<div>
		<ConfigButton
			@click="modal = true"
			type="Dices"
			variant="transparent"/>
	</div>
	<ModalWindow
		v-model="modal"
		:title="$t('roll-dices')">
		<article class="roll-dices">
			<h3>
				Amount:
			</h3>
			<input
				v-model="dicesCount" />
		</article>
	</ModalWindow>
</template>

<script>
import ConfigButton from "@/components/ui/ConfigButton.vue";
import ModalWindow from "@/components/common/ModalWindow.vue";

export default {
	name: "RollDiceFeature",
	components: {ModalWindow, ConfigButton},
	data() {
		return {
			modal: false,
			dicesCount: 4
		}
	}
}
</script>

<style scoped lang="scss">
.roll-dices {
	padding: 16px;
}
</style>
