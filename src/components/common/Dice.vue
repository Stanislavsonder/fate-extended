<template>
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg">
		<rect
			x="6.10352e-05"
			width="24"
			height="24"
			rx="3"
			fill="#252122" />
		<rect
			v-if="!minus && !plus"
			x="9.39131"
			y="14.6087"
			width="5.21739"
			height="5.21739"
			rx="1"
			transform="rotate(-90 9.39131 14.6087)"
			fill="white" />
		<rect
			v-if="plus || minus"
			x="4.00006"
			y="10.4"
			width="16"
			height="3.2"
			rx="1"
			fill="white" />
		<rect
			v-if="plus"
			x="10.4001"
			y="20"
			width="16"
			height="3.2"
			rx="1"
			transform="rotate(-90 10.4001 20)"
			fill="white" />
	</svg>
</template>

<script>
// TODO: Remove component and replace by Icon
export default {
	name: 'Dice',
	props: {
		plus: {
			type: Boolean,
			default: false,
		},
		minus: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

