<template>
	<Teleport to="body">
		<div
			v-if="modelValue"
			class="modal-window"
			:class="`modal-window--${type}`"
		>
			<div class="modal-window__bg" @click="close" />
			<div class="modal-window__main">
				<header class="modal-window__header">
					<h2 class="modal-window__title">{{ title }}</h2>
					<button
						:title="$t('ui-close')"
						class="modal-window__close"
						@click="close"
					/>
				</header>
				<main class="modal-window__content">
					<slot />
				</main>
			</div>
		</div>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "ModalWindow",
	emits: ["update:modelValue"],
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "default",
		},
	},
	watch: {
		modelValue(value) {
			document.body.style.overflowY = value ? "hidden" : "auto";
		},
	},
	methods: {
		close() {
			this.$emit("update:modelValue", false);
		},
	},
});
</script>

<style scoped lang="scss">
.modal-window {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;

	&__bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	&__main {
		min-width: min(800px, 80vw);
		border-radius: 10px;
		background: white;
		position: absolute;
		left: 50%;
		top: 10%;
		z-index: 200;
		box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
		transform: translateX(-50%);

		@include media-down(tablet) {
			width: calc(100vw - 10px);
			top: 50px;
		}
	}

	&__close {
		position: relative;
		border: none;
		width: 24px;
		height: 24px;
		box-sizing: border-box;
		border-radius: 100%;
		transition: background-color 0.15s ease-out;

		@include media-down(tablet) {
			width: 48px;
			height: 48px;
		}

		&:hover {
			background-color: rgba(255, 255, 255, 0.75);
		}

		&:after,
		&:before {
			content: "";
			position: absolute;
			width: 3px;
			border-radius: 5px;
			height: 75%;
			background-color: var(--primary);
			left: 50%;
			top: 50%;
		}
		&:after {
			transform: translate3d(-50%, -50%, 0) rotate(45deg);
		}

		&:before {
			transform: translate3d(-50%, -50%, 0) rotate(-45deg);
		}
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
		height: 50px;
		border-radius: 10px 10px 0 0;
		background: var(--primary);
	}

	&__title {
		color: white;
		font-weight: bold;
		text-transform: uppercase;
	}

	&__content {
		border-radius: 0 0 10px 10px;
		background: #ffffff;
		min-height: 200px;
	}
}
</style>
