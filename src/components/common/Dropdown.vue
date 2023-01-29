<template>
	<menu
		v-if="modelValue"
		class="dropdown"
		@click="log">
		123123213213
		<button>12312321</button>
	</menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// TODO: Finish up Dropdown Component (low priority)
export default defineComponent({
	name: 'Dropdown',
	emits: ['update:modelValue'],
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		close() {
			this.$emit('update:modelValue', false)
		},
		log() {
			console.log(123)
		},
	},
})
</script>

<style scoped lang="scss">
.dropdown {
	position: absolute;
}
</style>
