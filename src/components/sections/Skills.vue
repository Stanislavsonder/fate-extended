<template>
    <Card :title="$t('skills')" class="skills">
        <template v-slot:buttons>
            <ConfigButton
				hint="Add new Skill"
				variant="transparent"
                @click="add"
                type="PlusIcon"/>
        </template>
        <template v-slot:content>
            <ul class="skills__list">
                <li v-for="(skill, index) in $store.state.characters[$store.state.current].skills" :key="$store.state.characters[$store.state.current].name + index + skill.name">
                    <Skill
						:skill="skill"
						@remove="remove(index)"
						@update="newSkill => update(newSkill, index)"
					/>
                </li>
            </ul>
        </template>
    </Card>
    <ModalWindow v-model="addModal" title="Add new skill">
        <AddSkill
            :existed-skills="$store.state.characters[$store.state.current].skills"
            @close="addModal = false"
            @add="addSkill" />
    </ModalWindow>
</template>

<script lang="ts">
import Card from "@/components/common/Card.vue";
import Skill from "@/components/sheet-elements/Skill.vue";
import {Skill as SkillType} from "@/types"
import {defineComponent} from "vue";
import ConfigButton from "@/components/ui/ConfigButton.vue";
import ModalWindow from "@/components/common/ModalWindow.vue";
import AddSkill from "@/components/edit/AddSkill.vue";

export default defineComponent({
    name: "Skills",
    components: {
        AddSkill,
        ModalWindow,
        ConfigButton,
        Skill,
		Card
    },
    methods: {
        add() {
            this.addModal = true
        },
        addSkill(skill: SkillType) {
			this.$store.commit('updateSkills',  [...this.$store.state.characters[this.$store.state.current].skills, skill])
        },
		update(skill: SkillType, index: number) {
			const newSkills = [...this.$store.state.characters[this.$store.state.current].skills]
			newSkills.splice(index, 1, skill);
			newSkills.sort((a,b) => {
				return b.level - a.level? b.level - a.level : b.experience - a.experience
			})
			this.$store.commit('updateSkills',  newSkills)
		},
		remove(index: number) {
			this.$store.commit('updateSkills', this.$store.state.characters[this.$store.state.current].skills.filter((e: SkillType, i: number) => i !== index))
		}
    },
    data() {
        return {
            addModal: false
        }
    }
})
</script>

<style scoped lang="scss">
.skills {
    max-height: 600px;

    &__list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 10px;
        overflow-y: auto;
        max-height: 500px;
    }
}

</style>
