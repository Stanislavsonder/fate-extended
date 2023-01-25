<template>
<article class="add-skill">
    <ul class="add-skill__list">
        <li
            class="add-skill__skill"
            @click="add(skill.name)"
            v-for="skill in skills"
            :key="skill.name">
            <button
                class="add-skill__button">
                {{ skill.name }}
            </button>
        </li>
    </ul>
</article>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {SKILLS} from "@/consts/const";
import {Skill, SkillType} from "@/types";

interface Data {
    skills: SkillType[]
}

export default defineComponent({
    name: "AddSkill",
    emits: ['add', 'close'],
    props: {
        existedSkills: {
            type: Array as PropType<Skill[]>,
            default: () => [],
        }
    },
    data(): Data {
        return {
            skills: SKILLS
                .filter(skill => !this.existedSkills?.find(s => s.name === skill.name))
                .sort((a, b) => a.name.localeCompare(b.name))
        }
    },
    methods: {
        add(skillName: string) {
            this.$emit('add', {
                name: skillName,
                level: 1,
                experience: 0
            })
            this.$emit('close')
        }
    }
})
</script>

<style lang="scss" scoped>
.add-skill {
    padding: 15px;

    &__list {
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-height: 500px;
        overflow-y: auto;
        padding: 15px;
    }

    &__skill {
        width: 100%;
    }

    &__button {
        display: grid;
        width: 100%;
        place-content: center;
        padding: 10px;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 24px;
        border-radius: 24px;
        background-color: #181818;
        color: white;

        &:hover {
            background-color: rgba(0, 0, 0, 0.75);
        }
    }
}
</style>
