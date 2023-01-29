<template>
	<component :is="type" />
</template>

<script>
import Icons from './icons'

export default {
	name: 'ModuleIcon',
	components: {
		...Icons,
	},
	props: {
		type: {
			type: String,
			required: true,
		},
	},
}
</script>
