<template>
	<section class="modules">
		<img
			class="modules__fate-logo"
			src="../../assets/Logo.png"
			:alt="$t('fate-extended-logo')" />
		<!--		<ul-->
		<!--			v-if="modules.length"-->
		<!--			class="modules__list">-->
		<!--			<li-->
		<!--				v-for="module in modules"-->
		<!--				:key="module.title"-->
		<!--				class="modules__module">-->
		<!--				<ModuleIcon :type="module.icon" />-->
		<!--			</li>-->
		<!--		</ul>-->
	</section>
</template>


<script>
export default {
	name: 'Modules',
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
