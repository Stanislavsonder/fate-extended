<template>
<section class="modules">
    <img
        class="modules__fate-logo"
        src="../../assets/Logo.png"
        alt="Fate Extended Logo">
    <ul
        class="modules__list"
        v-if="modules.length"
    >
        <li
            class="modules__module"
            :key="module.title"
            v-for="module in modules">
			<ModuleIcon :type="module.icon"/>
        </li>
    </ul>
</section>
</template>


<script>

import {MODULES_LIST} from "@/consts/const";
import ModuleIcon from "@/components/ui/icons/modules/ModuleIcon.vue";

export default {
	components: {ModuleIcon},
	MODULES_LIST: MODULES_LIST,
    name: "Modules",
	computed: {
		modules() {
			return this.$store.state.character.modules.map(this.getModule).filter(e => e)
		}
	},
	methods: {
		getModule(module) {
			return MODULES_LIST.find(e => e.title === module)
		}
	}
}
</script>

<style scoped lang="scss">
.modules {
    display: grid;
    place-content: center;
    padding: 20px;

    &__fate-logo {
       width: 250px;
    }
}
</style>
