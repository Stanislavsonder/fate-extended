<template>
	<section class="card">
		<header class="card__header">
			<h2 class="card__title">
				{{ title }}
			</h2>
			<nav
				v-if="$slots.buttons"
				class="card__buttons">
				<slot name="buttons" />
			</nav>
		</header>
		<main class="card__content">
			<slot name="content" />
		</main>
	</section>
</template>

<script>
export default {
	name: 'Card',
	props: {
		title: {
			type: String,
			required: true,
		},
	},
}
</script>

<style scoped lang="scss">
.card {
	margin: 16px;
	box-shadow: 0 0 2px 2px rgba(24, 24, 24, 0.2);
	border-radius: 15px;
	background-color: #ffffff;

	&__header {
		display: flex;
		background-color: #181818;
		border-radius: 14px 14px 0 0;
		color: white;
		font-weight: bold;
		text-align: left;
		padding: 8px 15px;
		text-transform: uppercase;
		font-size: 16px;
	}

	&__buttons {
		display: flex;
		justify-content: center;
		gap: 10px;
		align-self: center;
		margin-left: auto;
		padding: 0 15px;
	}

	&__title {
		display: flex;
		align-items: center;
		padding: 0;
		margin: 0;
	}

	&__content {
		padding: 15px;
		border-radius: 0 0 15px 15px;
	}
}
</style>
