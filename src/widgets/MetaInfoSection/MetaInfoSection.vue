<template>
	<section class="modules">
		<img
			class="modules__fate-logo"
			src="./assets/Logo.png"
			:alt="$t('fate-extended-logo')" />
	</section>
</template>


<script>
export default {
	name: 'MetaInfoSection',
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
