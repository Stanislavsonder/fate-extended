<template>
	<article class="add-stunt">
		<header class="add-stunt__header">
			<h2>
				<input
					v-model="tmpStunt.name"
					placeholder="Stunt name"
					class="add-stunt__name"
					type="text" />
			</h2>
			<h3 class="add-stunt__skill">
				<select
					v-model="tmpStunt.skill"
					class="add-stunt__select">
					<option
						selected
						disabled
						:value="undefined">
						Select skill
					</option>
					<option
						v-for="skill in skills"
						:key="skill"
						:value="skill">
						{{ skill }}
					</option>
				</select>
			</h3>
		</header>
		<div>
			<textarea
				ref="textarea"
				v-model="tmpStunt.description"
				placeholder="Stunt description"
				class="add-stunt__textarea" />
		</div>
	</article>
	<nav class="add-stunt__buttons">
		<Button
			v-if="mode === 'edit'"
			secondary
			@click="remove"
			>Remove</Button
		>
		<Button
			secondary
			@click="close"
			>Discard</Button
		>
		<Button
			:disabled="!isValid"
			@click="update"
			>Save</Button
		>
	</nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { SKILLS } from '@/consts/const'
import { useAutoHeight } from '@/composables/useAutoHeight'
import Button from '@/components/ui/Button.vue'
import { Stunt } from '@/types'

interface Data {
	tmpStunt: Stunt
	skills: string[]
}

export default defineComponent({
	name: 'StuntAddAndEdit',
	components: { Button },
	emits: ['close', 'update', 'remove'],
	props: {
		stunt: {
			type: Object as PropType<Stunt>,
			required: true,
		},
		mode: {
			type: String,
			default: 'new',
		},
	},
	setup() {
		return useAutoHeight()
	},
	data(): Data {
		return {
			tmpStunt: JSON.parse(JSON.stringify(this.stunt)),
			skills: SKILLS.map(e => e.name).sort(),
		}
	},
	computed: {
		isValid() {
			return this.tmpStunt.name && this.tmpStunt.description && this.tmpStunt.skill
		},
	},
	mounted() {
		this.autoUpdateHeight(this.$refs.textarea as HTMLTextAreaElement)
	},
	methods: {
		remove() {
			this.$emit('remove')
			this.$emit('close')
		},
		close() {
			this.$emit('close')
		},
		update() {
			this.$emit('update', this.tmpStunt)
			this.$emit('close')
		},
	},
})
</script>

<style scoped lang="scss">
.add-stunt {
	margin: 15px;
	box-sizing: border-box;
	min-height: 126px;
	box-shadow: 0 0 1px 0.5px rgba(0, 0, 0, 0.25);
	border-radius: 10px;

	&__header {
		display: grid;
		grid-template-columns: 65% 35%;
		align-items: center;
		justify-content: space-between;
		height: 30px;
		border-radius: 10px 10px 0 0;
		padding-left: 15px;
		text-transform: uppercase;
		font-weight: 900;
		box-shadow: 0 2px 1px 0.5px rgba(0, 0, 0, 0.25);
	}

	&__name {
		display: flex;
		align-items: center;
		height: 100%;
		padding-left: 5px;
		width: 90%;
		font-size: 16px;
		font-weight: 900;
		border: none;
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

	&__select {
		background-color: #181818;
		border: none;
		color: white;
		width: 90%;
		text-align: right;
		font-weight: 900;
		text-transform: uppercase;
		cursor: pointer;
	}

	&__textarea {
		width: calc(100% - 20px);
		resize: none;
		box-sizing: border-box;
		padding: 10px;
		font-size: 16px;
		font-family: var(--inter);
		overflow: hidden;
		border: none;
		margin: 5px 0;
		min-height: 100px;
		max-height: 300px;
	}

	&__buttons {
		margin: 10px 0;
	}
}
</style>
