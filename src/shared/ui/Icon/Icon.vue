<template>
	<component :is="name" />
</template>

<script>
import Icons from './svg'

export default {
	name: 'Icon',
	components: { ...Icons },
	props: {
		name: {
			type: String,
			required: true,
		},
	},
}
</script>
