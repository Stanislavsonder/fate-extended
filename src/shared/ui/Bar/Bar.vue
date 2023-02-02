<template>
	<div class="main-bar">
		<div class="main-bar__numbers">
			<span class="main-bar__icon">
				<slot name="icon" />
			</span>
			<h6>{{ current }} / {{ max }}</h6>
		</div>
		<div
			:style="{
				background: `linear-gradient(90deg, #181818 0%, #181818 ${percent}%, transparent ${percent}%)`,
			}"
			class="main-bar__bar">
			<span
				v-if="percent > 10"
				class="main-bar__threshold main-bar__threshold--high" />
			<span
				v-if="percent > 25"
				class="main-bar__threshold main-bar__threshold--medium" />
			<span
				v-if="percent > 50"
				class="main-bar__threshold main-bar__threshold--light" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Bar',
	props: {
		current: {
			type: Number,
			required: true,
		},
		max: {
			type: Number,
			required: true,
		},
	},
	computed: {
		percent() {
			return (this.current / this.max) * 100
		},
	},
})
</script>

<style scoped lang="scss">
.main-bar {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	height: 20px;
	width: 100%;

	&__numbers {
		position: relative;
		display: flex;
		justify-content: flex-end;
		padding: 0 10px;
		box-sizing: border-box;
		width: 150px;
		height: 100%;
		font-size: 16px;
		font-weight: bold;
		border: 2px solid var(--primary);

		&:before {
			content: '';
			position: absolute;
			left: 0;
			width: 10px;
			height: 18px;
			background-color: white;
			top: -2px;
			z-index: 0;
			transform: translateX(-50%);
		}
	}

	&__icon {
		position: absolute;
		left: 0;
		top: 0;
		transform: translateX(-50%) scale(1.5);
	}

	&__bar {
		position: relative;
		height: 100%;
		box-sizing: border-box;
		width: calc(100% - 150px);
		border: 2px solid var(--primary);
		border-radius: 0 5px 5px 0;
	}
	&__threshold {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		background-color: white;
		height: 100%;
		width: 2px;

		&:before,
		&:after {
			content: '';
			position: absolute;
			width: 5px;
			height: 5px;
			background-color: white;
			transform: translateX(-50%) translateY(-75%) rotate(45deg);
		}
		&:after {
			bottom: 0;
			transform: translateX(-50%) translateY(75%) rotate(45deg);
		}

		&--light {
			left: 50%;
		}

		&--medium {
			left: 25%;
		}

		&--high {
			left: 10%;
		}
	}
}
</style>
