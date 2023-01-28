<template>
<main class="char-sheet">
    <div class="char-sheet__main-section">
        <Character />
        <Modules />
    </div>
    <Aspects />
	<Description />
	<Inventory />
    <div class="char-sheet__half-section">
        <Skills />
        <Stunts />
    </div>
</main>
</template>

<script lang="ts">
import Character from "@/components/sections/Character.vue";
import Aspects from "@/components/sections/Aspects.vue";
import Modules from "@/components/sections/Modules.vue";
import Description from "@/components/sections/Description.vue";
import Inventory from "@/components/sections/Inventory.vue";
import Skills from "@/components/sections/Skills.vue";
import Stunts from "@/components/sections/Stunts.vue";
import {defineComponent} from "vue";
import {
    AspectType,
    Character as Char
} from "@/types";

interface Data {
    character: Char
}

export default defineComponent({
    name: "CharList",
	emits: ['char-updated'],
    components: {
        Stunts,
        Skills,
        Inventory,
        Description,
        Modules,
        Aspects,
        Character
    },

})
</script>

<style lang="scss" scoped>
@use "src/styles/breakpoints";

.char-sheet {
    &__main-section {
        display: flex;

		@include breakpoints.media-breakpoint-down(sm) {
			flex-direction:column-reverse;
		}
    }

    &__half-section {
        display: grid;
        grid-template-columns: 1fr 1fr;

		@include breakpoints.media-breakpoint-down(sm) {
			grid-template-columns: auto;
		}

    }
}
</style>
