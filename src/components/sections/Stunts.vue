<template>
    <Card :title="$t('stunts')">
        <template v-slot:buttons>
            <ConfigButton
				hint="Add new Skill"
                @click="modal = true"
                type="PlusIcon"
				variant="transparent"/>
        </template>
        <template v-slot:content>
            <ul>
                <li v-for="(stunt, index) in $store.state.characters[$store.state.current].stunts" :key="stunt.name">
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
    data() {
        return {
            modal: false
        }
    },
    methods: {
        add(stunt: StuntType) {
			this.$store.commit('updateStunts', [...this.$store.state.characters[this.$store.state.current].stunts, stunt])
        },
		update(stunt: StuntType, id: number) {
			const newStunts = [...this.$store.state.characters[this.$store.state.current].stunts]
			newStunts.splice(id, 1, stunt);
			this.$store.commit('updateStunts', newStunts)
		},
		remove(id: number) {
			this.$store.commit('updateStunts', this.$store.state.characters[this.$store.state.current].stunts.filter((e: StuntType, i: number) => i !== id))
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
