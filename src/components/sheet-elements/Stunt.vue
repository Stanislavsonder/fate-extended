<template>
	<article
		class="stunt"
		@click="modal = true">
		<header class="stunt__header">
			<h5 class="stunt__name">{{ stunt.name }}</h5>
			<h6 class="stunt__skill">{{ stunt.skill }}</h6>
		</header>
		<p class="stunt__description">
			{{ stunt.description }}
		</p>
	</article>
	<ModalWindow
		v-model="modal"
		title="Edit stunt">
		<StuntAddAndEdit
			:stunt="stunt"
			mode="edit"
			@remove="remove"
			@update="update"
			@close="modal = false" />
	</ModalWindow>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Stunt } from '@/types'
import ModalWindow from '@/components/common/ModalWindow.vue'
import StuntAddAndEdit from '@/components/edit/StuntAddAndEdit.vue'

export default defineComponent({
	name: 'Stunt',
	components: { StuntAddAndEdit, ModalWindow },
	props: {
		stunt: {
			type: Object as PropType<Stunt>,
			required: true,
		},
	},
	emits: ['update', 'remove'],
	data() {
		return {
			modal: false,
		}
	},
	methods: {
		update(stunt: Stunt) {
			this.$emit('update', stunt)
		},
		remove() {
			this.$emit('remove')
		},
	},
})
</script>

<style scoped lang="scss">
.stunt {
	min-height: 126px;
	box-shadow: 0 0 1px 0.5px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	cursor: pointer;
	background-color: white;
	transition: transform 0.15s ease-out;

	&:hover {
		transform: scale(1.01);
	}

	&__header {
		display: grid;
		grid-template-columns: 65% 35%;
		align-items: center;
		justify-content: space-between;
		height: 30px;
		border-radius: 10px 10px 0 0;
		text-transform: uppercase;
		font-weight: 900;
		box-shadow: 0 2px 1px 0.5px rgba(0, 0, 0, 0.25);
	}
	&__name {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 0 0 15px;
		margin: 0;
		text-align: left;
		font-size: 16px;
	}
	&__skill {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 100%;
		padding: 0 15px 0 0;
		border-radius: 0 10px 0 0;
		margin: 0;
		font-size: 16px;
		color: white;
		background-color: #181818;

		&:before {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			aspect-ratio: 1;
			background-color: #181818;
			z-index: 1;
			clip-path: polygon(100% 0, 0% 100%, 100% 100%);
			transform: translateX(-95%);
		}
	}
	&__description {
		padding: 10px;
		text-align: left;
	}
}
</style>
