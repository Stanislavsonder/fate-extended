<template>
	<component :is="lang" />
</template>

<script>
import Flags from './svg'

export default {
	name: 'LanguageIcon',
	components: {
		...Flags,
	},
	props: {
		lang: {
			type: String,
			required: true,
		},
	},
}
</script>
