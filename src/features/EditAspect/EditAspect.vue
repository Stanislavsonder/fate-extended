<template>
	<article class="aspect-edit">
		<h2>
			<textarea
				ref="title"
				v-model="data.title"
				:placeholder="$t('aspect__name')"
				class="aspect-edit__title" />
		</h2>
		<h3>
			<textarea
				ref="description"
				v-model="data.description"
				:placeholder="$t('aspect__description')"
				class="aspect-edit__description" />
		</h3>
		<p>{{ $t('aspect__type') }}: {{ $t(`aspect__${data.type}`) }}</p>
		<ul>
			<li>
				<button
					:title="$t('aspect__concept')"
					:class="{ active: data.type === AspectType.Concept }"
					@click="data.type = AspectType.Concept">
					<Icon name="DicePositive" />
				</button>
			</li>
			<li>
				<button
					:title="$t('aspect__neutral')"
					:class="{ active: data.type === AspectType.Neutral }"
					@click="data.type = AspectType.Neutral">
					<Icon name="DiceNeutral" />
				</button>
			</li>
			<li>
				<button
					:title="$t('aspect__problem')"
					:class="{ active: data.type === AspectType.Problem }"
					@click="data.type = AspectType.Problem">
					<Icon name="DiceNegative" />
				</button>
			</li>
		</ul>
		<nav>
			<Button
				v-if="mode === 'edit'"
				:title="$t('ui-remove')"
				secondary
				@click="remove">
				{{ $t('ui-remove') }}
			</Button>
			<Button
				secondary
				:title="$t('ui-cancel')"
				@click="close">
				{{ $t('ui-cancel') }}
			</Button>
			<Button
				:title="$t('ui-save')"
				@click="save">
				{{ $t('ui-save') }}
			</Button>
		</nav>
	</article>
</template>

<script lang="ts">
import { capitalize, defineComponent, PropType } from 'vue'
import { Aspect, AspectType } from '@/types'
import { Button, Icon } from '@/shared/ui'
import { useAutoHeight } from '@/shared/composables/useAutoHeight'

interface Data {
	data: Aspect
}

export default defineComponent({
	name: 'EditAspect',
	components: { Icon, Button },
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
		border: 1px solid var(--primary);
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
