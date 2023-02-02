<template>
	<article
		class="aspect"
		@click="editMode = true">
		<p>
			{{ aspect.description }}
		</p>
		<h6>
			{{ aspect.title }}
		</h6>
		<Icon
			:name="diceIcon"
			class="aspect__dice" />
	</article>
	<ModalWindow
		v-model="editMode"
		:title="$t('edit-aspect')">
		<EditAspect
			mode="edit"
			:aspect="aspect"
			@remove="remove"
			@update="newAspect => update(newAspect)"
			@close="editMode = false" />
	</ModalWindow>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Aspect } from '@/types'
import { Icon, ModalWindow } from '@/shared/ui'
import { EditAspect } from '@/features'

export default defineComponent({
	name: 'Aspect',
	components: { EditAspect, Icon, ModalWindow },
	emits: ['update', 'remove'],
	props: {
		aspect: {
			type: Object as PropType<Aspect>,
			required: true,
		},
	},
	data() {
		return {
			editMode: false,
		}
	},
	computed: {
		diceIcon() {
			return this.aspect.type === 'concept'
				? 'DicePositive'
				: this.aspect.type === 'problem'
					? 'DiceNegative'
					: 'DiceNeutral'
		},
	},
	methods: {
		remove() {
			this.$emit('remove')
		},
		update(newAspect: Aspect) {
			this.$emit('update', newAspect)
		},
	},
})
</script>

<style scoped lang="scss">
.aspect {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	aspect-ratio: 1;
	height: 200px;
	border-radius: 5px;
	box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
	padding: 10px;
	cursor: pointer;
	transition: transform 0.15s ease-out;

	&:hover {
		transform: scale(1.05);
	}

	&__dice {
		position: absolute;
		left: 0;
		top: 0;
		transform: translate3d(-25%, -25%, 0) scale(1.4);
	}

	&__remove {
		position: absolute;
		width: 24px;
		height: 24px;
		border-radius: 100%;
		background-color: darkred;
		color: white;
		border: none;
		right: 5px;
		top: 5px;
		cursor: pointer;
	}
}
h6 {
	font-weight: 700;
	font-size: 16px;
	margin: 0;
}
p {
	padding: 0 10px;
	font-size: 15px;
	line-height: 1.1;
}
</style>
