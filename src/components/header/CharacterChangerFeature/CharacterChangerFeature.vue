<template>
	<nav>
		<ConfigButton
			type="Save"
			@click="modal = true"
			variant="transparent"/>
	</nav>
	<ModalWindow
		title="Switch character"
		v-model="modal">
		<ul>
			<li
				v-for="character in $store.state.characters"
				:key="character.name">
				{{ character.name || 'unnamed character' }},
				({{ character.level }})
			</li>
		</ul>
	</ModalWindow>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ConfigButton from "@/components/ui/ConfigButton.vue";
import ModalWindow from "@/components/common/ModalWindow.vue";

export default defineComponent({
	name: "CharacterChangerFeature",
	components: {ModalWindow, ConfigButton},
	data() {
		return {
			modal: false
		}
	}
})
</script>

<style scoped lang="scss">

</style>
