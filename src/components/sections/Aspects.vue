<template>
    <Card :title="$t('aspects')" class="aspects">
        <template v-slot:buttons>
            <ConfigButton
				hint="Add new Aspect"
				@click="modal = true" type="PlusIcon"
				variant="transparent"/>
        </template>
        <template v-slot:content >
            <ul class="aspects__content">
                <li v-for="(aspect, index) in $store.state.characters[$store.state.current].aspects" :key="aspect.type">
                    <AspectComponent
                        :aspect="aspect"
                        @remove="remove(index)"
                        @update="newAspect => update(newAspect, index)"/>
                </li>
            </ul>
        </template>
    </Card>
    <ModalWindow
        v-model="modal"
        title="Create new aspect">
        <AspectEdit
            mode="new"
            :aspect="{title: '', description: '', type: AspectType.Neutral}"
            @update="newAspect => add(newAspect)"
            @close="modal = false"/>
    </ModalWindow>
</template>

<script lang="ts">
import Card from "@/components/common/Card.vue";
import AspectComponent from "@/components/sheet-elements/Aspect.vue";
import {defineComponent} from "vue";
import {Aspect, AspectType} from "@/types";
import ModalWindow from "@/components/common/ModalWindow.vue";
import ConfigButton from "@/components/ui/ConfigButton.vue";
import AspectEdit from "@/components/edit/AspectEdit.vue";

export default defineComponent({
    name: "Aspects",
    computed: {
        AspectType() {
            return AspectType
        }
    },
    components: {AspectEdit, ConfigButton, ModalWindow, AspectComponent, Card},
    data() {
        return {
            modal: false
        }
    },
    methods: {
        update(aspect: Aspect, id: number) {
            const newAspects = [...this.$store.state.characters[this.$store.state.current].aspects]
            newAspects.splice(id, 1, aspect);
			this.$store.commit('updateAspects', newAspects)
        },
        remove(id: number) {
            this.$store.commit('updateAspects', this.$store.state.characters[this.$store.state.current].aspects.filter((e: Aspect, i: number) => i !== id))
        },
        add(aspect: Aspect) {
			this.$store.commit('updateAspects', [...this.$store.state.characters[this.$store.state.current].aspects, aspect])
        }
    }

})
</script>

<style scoped lang="scss">
.aspects {
    &__content {
        display: flex;
        gap: 26px;
        padding: 20px;
        overflow-x: auto;
    }

}
</style>
