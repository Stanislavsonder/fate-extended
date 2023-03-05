<template>
	<div class="difficulty">
		<button
			class="difficulty__button difficulty__button--up"
			@click="setDifficulty(modelValue + 1)">
			<Icon name="Caret" />
		</button>
		<button
			class="difficulty__button difficulty__button--down"
			@click="setDifficulty(modelValue - 1)">
			<Icon name="Caret" />
		</button>
		<span class="difficulty__value">
			{{ modelValue }}
		</span>
		<span class="difficulty__text">
			{{ $t('difficulty') }}
		</span>
	</div>
</template>

<script lang="ts">
import { Icon } from '@/shared/ui'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'RollDifficulty',
	components: { Icon },
	emits: ['update:modelValue'],
	props: {
		modelValue: {
			type: Number,
			required: true
		}
	},
	methods: {
		setDifficulty(value: number) {
			this.$emit('update:modelValue', value)
		}
	}
})
</script>

<style scoped lang="scss">
.difficulty {
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16px;
	width: 100px;
	height: 100px;
	background: var(--primary);
	border-radius: 0 13px 0 16px;
	color: var(--white);
	right: 0;
	top: 0;
	font-weight: bold;

	&__value {
		font-size: 36px;
	}

	&__button {
		position: absolute;
		display: grid;
		place-content: center;
		width: 36px;
		height: 36px;
		border: none;
		border-radius: 0;
		background: var(--primary);
		color: var(--white);
		left: 2px;

		svg {
			width: 100%;
			fill: white;
		}

		&:hover {
			filter: brightness(0.8);
		}

		&--up {
			top: 0;
			transform: translateX(-100%) rotate(180deg);
		}

		&--down {
			transform: translateX(-100%);
		}
	}
}
</style>
