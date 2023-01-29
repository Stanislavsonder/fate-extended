<template>
	<article class="aspect-edit">
		<h2>
			<textarea
				ref="title"
				v-model="data.title"
				placeholder="Aspect name"
				class="aspect-edit__title" />
		</h2>
		<h3>
			<textarea
				ref="description"
				v-model="data.description"
				placeholder="Aspect description"
				class="aspect-edit__description" />
		</h3>
		<p>Aspect type: {{ capitalize(data.type) }}</p>
		<ul>
			<li>
				<button
					:class="{ active: data.type === AspectType.Concept }"
					@click="data.type = AspectType.Concept">
					<Dice plus />
				</button>
			</li>
			<li>
				<button
					:class="{ active: data.type === AspectType.Problem }"
					@click="data.type = AspectType.Problem">
					<Dice minus />
				</button>
			</li>
			<li>
				<button
					:class="{ active: data.type === AspectType.Neutral }"
					@click="data.type = AspectType.Neutral">
					<Dice />
				</button>
			</li>
		</ul>
		<nav>
			<Button
				v-if="mode === 'edit'"
				secondary
				@click="remove">
				Remove
			</Button>
			<Button
				secondary
				@click="close">
				Discard
			</Button>
			<Button @click="save">Save</Button>
		</nav>
	</article>
</template>

<script lang="ts">
import { capitalize, defineComponent, PropType } from 'vue'
import { Aspect, AspectType } from '@/types'
import Dice from '@/components/common/Dice.vue'
import Button from '@/components/ui/Button.vue'
import { useAutoHeight } from '@/composables/useAutoHeight'

interface Data {
	data: Aspect
}

export default defineComponent({
	name: 'AspectEdit',
	components: { Button, Dice },
	emits: ['close', 'update', 'remove'],
	props: {
		aspect: {
			type: Object as PropType<Aspect>,
			required: true,
		},
		mode: {
			type: String,
			required: true,
		},
	},
	setup() {
		return useAutoHeight()
	},
	data(): Data {
		return {
			data: JSON.parse(JSON.stringify(this.aspect)),
		}
	},
	computed: {
		AspectType() {
			return AspectType
		},
	},
	mounted() {
		this.autoUpdateHeight(this.$refs.title as HTMLTextAreaElement)
		this.autoUpdateHeight(this.$refs.description as HTMLTextAreaElement)
	},
	methods: {
		capitalize,
		remove() {
			this.$emit('remove')
		},
		close() {
			this.$emit('close')
		},
		save() {
			this.$emit('update', this.data)
			this.$emit('close')
		},
	},
})
</script>

<style scoped lang="scss">
.aspect-edit {
	padding: 15px;

	&__title {
		font-weight: bold;
	}

	&__description,
	&__title {
		text-align: center;
		height: 10px;
		border-radius: 10px;
		border: 1px solid #181818;
		padding: 15px;
	}
}

textarea {
	width: 100%;
	resize: none;
	border: none;
	border-radius: 5px;
	margin: 10px 0;
	font-family: var(--inter);
	font-size: 24px;
	padding: 10px;
	box-sizing: border-box;
	overflow: hidden;
	min-height: 50px;
	max-height: 500px;
}

ul {
	display: flex;
	justify-content: center;
	gap: 10px;
	margin: 16px 0;

	button {
		display: grid;
		place-content: center;
		height: 48px;
		width: 48px;
		border-radius: 100%;
		border: none;
		background-color: transparent;
		transition: background-color 0.15s ease-out;

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}

		&.active {
			background-color: rgba(0, 0, 0, 0.25);
		}
	}
}
</style>
