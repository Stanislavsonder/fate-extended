<template>
	<MainBar
		:max="$store.getters.maxMental"
		:current="$store.state.characters[$store.state.current].mental.current">
		<template #icon>
			<MindIcon />
		</template>
	</MainBar>
</template>

<script lang="ts">
import MainBar from '@/components/sheet-elements/bars/MainBar.vue'
import MindIcon from '@/components/ui/icons/MindIcon.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MentalBar',
	components: {
		MindIcon,
		MainBar,
	},
})
</script>
