<template>
<menu
	class="dropdown"
	@click="log"
	v-if="modelValue">
123123213213
	<button>12312321</button>
</menu>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
	name: "Dropdown",
	emits: ['update:modelValue'],
	props: {
		modelValue: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		close() {
			this.$emit('update:modelValue', false)
		},
		log() {
			console.log(123)
		}
	}

})
</script>

<style scoped lang="scss">
	.dropdown {
		position: absolute;

	}
</style>
