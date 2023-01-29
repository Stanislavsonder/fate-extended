<template>
	<Card
		class="text-section"
		:title="title">
		<template #buttons>
			<ConfigButton
				hint="Edit"
				type="EditIcon"
				variant="transparent"
				@click="editMode = true" />
		</template>
		<template #content>
			<p v-if="!editMode">
				{{ modelValue || 'Click "Edit" to add text' }}
			</p>
			<div v-show="editMode">
				<textarea
					ref="textarea"
					v-model="tmpValue"
					placeholder="Click here to write text"
					class="text-section__textarea" />
				<nav class="text-section__buttons">
					<Button
						secondary
						@click="editMode = false">
						Discard
					</Button>
					<Button @click="save"> Save </Button>
				</nav>
			</div>
		</template>
	</Card>
</template>

<script lang="ts">
import Card from '@/components/common/Card.vue'
import { defineComponent } from 'vue'
import { useAutoHeight } from '@/composables/useAutoHeight'
import ConfigButton from '@/components/ui/ConfigButton.vue'
import Button from '@/components/ui/Button.vue'

//TODO: Add MD editor
export default defineComponent({
	name: 'TextSection',
	components: {
		ConfigButton,
		Card,
		Button,
	},
	emits: ['update:modelValue'],
	props: {
		title: {
			type: String,
			default: '',
		},
		modelValue: {
			type: String,
			required: true,
		},
	},
	setup() {
		return useAutoHeight()
	},
	data() {
		return {
			editMode: false,
			tmpValue: '',
		}
	},
	watch: {
		editMode() {
			this.tmpValue = this.modelValue
		},
	},
	mounted() {
		this.autoUpdateHeight(this.$refs.textarea as HTMLTextAreaElement)
	},
	methods: {
		save() {
			this.$emit('update:modelValue', this.tmpValue)
			this.editMode = false
		},
	},
})
</script>

<style scoped lang="scss">
.text-section {
	min-height: 300px;

	&__buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	p,
	&__textarea {
		font-size: 20px;
		text-align: justify;
		line-height: 1.35;
	}
	&__textarea {
		width: 100%;
		border: none;
		font-family: var(--inter);
		resize: none;
		min-height: 250px;
		max-height: max-content;
	}
}
</style>
