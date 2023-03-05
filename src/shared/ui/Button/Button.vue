<template>
	<button :class="{ secondary: secondary }">
		<slot />
	</button>
</template>

<script>
export default {
	name: "Button",
	props: {
		secondary: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style scoped lang="scss">
button {
	border: none;
	padding: 8px 16px;
	box-sizing: border-box;
	color: white;
	background-color: var(--primary);
	border-radius: 20px;
	font-size: 20px;
	margin: 5px;

	&.secondary {
		border: 1px solid var(--primary);
		background-color: transparent;
		color: var(--primary);

		&:not(:disabled):hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}

	&:not(:disabled):hover {
		background-color: rgba(0, 0, 0, 0.75);
	}

	&:disabled {
		cursor: default;
		opacity: 0.5;
	}
}
</style>
