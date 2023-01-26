<template>
	<component :is="lang" />
</template>

<script>
import Belarus from "@/components/ui/icons/flags/Belarus.vue";
import Russia from "@/components/ui/icons/flags/Russia.vue";
import Ukraine from "@/components/ui/icons/flags/Ukraine.vue";
import UnitedKingdom from "@/components/ui/icons/flags/UnitedKingdom.vue";

export default {
	name: "LanguageFlag",
	components: {
		bel: Belarus,
		ua: Ukraine,
		ru: Russia,
		en: UnitedKingdom
	},
	props: {
		lang: {
			type: String,
			required: true
		}
	}
}
</script>
