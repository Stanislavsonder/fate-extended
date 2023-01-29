<template>
	<MainBar
		:max="$store.getters.maxHealth"
		:current="$store.state.characters[$store.state.current].health.current">
		<template #icon>
			<HealthIcon />
		</template>
	</MainBar>
</template>

<script lang="ts">
import HealthIcon from '@/components/ui/icons/HealthIcon.vue'
import MainBar from '@/components/sheet-elements/bars/MainBar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'HealthBar',
	components: {
		MainBar,
		HealthIcon,
	},
})
</script>
