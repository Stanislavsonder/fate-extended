<template>
    <Card title="Aspects" class="aspects">
        <template v-slot:buttons>
            <ConfigButton @click="modal = true" type="PlusIcon" transparent/>
        </template>
        <template v-slot:content >
            <ul class="aspects__content">
                <li v-for="(aspect, index) in aspects" :key="aspect.type">
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
import {defineComponent, PropType} from "vue";
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
    emits: ['update:aspects'],
    props: {
        aspects: {
            type: Array as PropType<Aspect[]>,
            required: true
        }
    },
    data() {
        return {
            modal: false
        }
    },
    methods: {
        update(aspect: Aspect, id: number) {
            const newAspects = [...this.aspects]
            newAspects.splice(id, 1, aspect);
            this.$emit('update:aspects', newAspects)
        },
        remove(id: number) {
            this.$emit('update:aspects', this.aspects.filter((e, i) => i !== id))
        },
        add(aspect: Aspect) {
            this.$emit('update:aspects', [...this.aspects, aspect])
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
