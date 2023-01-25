<template>
    <Card title="Stunts">
        <template v-slot:buttons>
            <ConfigButton
                @click="modal = true"
                type="PlusIcon"
                transparent/>
        </template>
        <template v-slot:content>
            <ul>
                <li v-for="(stunt, index) in stunts" :key="stunt.name">
                    <Stunt
						@remove="() => remove(index)"
						@update="newStunt => update(newStunt, index)"
						:stunt="stunt"/>
                </li>
            </ul>
        </template>
    </Card>
    <ModalWindow v-model="modal" title="Add new stunt">
        <StuntAddAndEdit
            :stunt="{ name: '', description: '', skill: undefined }"
			mode="new"
            @update="add"
            @close="modal = false"/>
    </ModalWindow>
</template>

<script lang="ts">
import Card from "@/components/common/Card.vue";
import {defineComponent, PropType} from "vue";
import {Stunt as StuntType} from "@/types";
import Stunt from "@/components/sheet-elements/Stunt.vue";
import ConfigButton from "@/components/ui/ConfigButton.vue";
import ModalWindow from "@/components/common/ModalWindow.vue";
import StuntAddAndEdit from "@/components/edit/StuntAddAndEdit.vue";

export default defineComponent({
    name: "Stunts",
    components: {StuntAddAndEdit, ModalWindow, ConfigButton, Stunt, Card},
    emits: ['update:stunts'],
    props: {
        stunts: {
            type: Array as PropType<StuntType[]>,
            required: true
        }
    },
    data() {
        return {
            modal: false
        }
    },
    methods: {
        add(stunt: StuntType) {
            this.$emit('update:stunts', [...this.stunts, stunt])
        },
		update(stunt: StuntType, id: number) {
			const newStunts = [...this.stunts]
			newStunts.splice(id, 1, stunt);
			this.$emit('update:stunts', newStunts)
		},
		remove(id: number) {
			this.$emit('update:stunts', this.stunts.filter((e, i) => i !== id))
		},
    }

})
</script>

<style scoped lang="scss">
ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
}
ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
