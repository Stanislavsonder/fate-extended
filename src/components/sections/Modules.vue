<template>
	<section class="modules">
		<img
			class="modules__fate-logo"
			src="../../assets/Logo.png"
			alt="Fate Extended Logo" />
		<ul
			v-if="modules.length"
			class="modules__list">
			<li
				v-for="module in modules"
				:key="module.title"
				class="modules__module">
				<ModuleIcon :type="module.icon" />
			</li>
		</ul>
	</section>
</template>


<script>
import { MODULES_LIST } from '@/consts/const'
import ModuleIcon from '@/components/ui/icons/modules/ModuleIcon.vue'

export default {
	name: 'Modules',
	components: { ModuleIcon },
	MODULES_LIST: MODULES_LIST,
	computed: {
		modules() {
			return this.$store.state.characters[this.$store.state.current].modules.map(this.getModule).filter(e => e)
		},
	},
	methods: {
		getModule(module) {
			return MODULES_LIST.find(e => e.title === module)
		},
	},
}
</script>

<style scoped lang="scss">
.modules {
	display: grid;
	place-content: center;
	padding: 20px;

	&__fate-logo {
		width: 250px;
	}
}
</style>
