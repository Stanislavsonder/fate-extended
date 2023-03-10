<template>
	<article class="add-skill">
		<ul class="add-skill__list">
			<li
				v-for="skill in skills"
				:key="skill.name"
				class="add-skill__skill"
				@click="add(skill.name)"
			>
				<button
					:title="$t('ui-add') + ' ' + $t(`skill__${skill.name}`)"
					class="add-skill__button"
				>
					{{ skill.localizedName }}
				</button>
			</li>
		</ul>
	</article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Skill, SkillProgress } from "@/types";
import rules from "@/shared/constants/rules";

interface Data {
	skills: Skill[];
}

export default defineComponent({
	name: "AddNewSkill",
	emits: ["add", "close"],
	props: {
		existedSkills: {
			type: Array as PropType<SkillProgress[]>,
			default: () => [],
		},
	},
	data(): Data {
		return {
			skills: rules.SKILLS.filter(
				(skill) =>
					!this.existedSkills?.find((s) => s.name === skill.name)
			)
				.map((e) => {
					return {
						...e,
						localizedName: this.$t(`skill__${e.name}`),
					};
				})
				.sort((a, b) => a.localizedName.localeCompare(b.localizedName)),
		};
	},
	methods: {
		add(skillName: string) {
			this.$emit("add", {
				name: skillName,
				level: 1,
				experience: 0,
			});
			this.$emit("close");
		},
	},
});
</script>

<style lang="scss" scoped>
.add-skill {
	padding: 15px;

	&__list {
		display: flex;
		flex-direction: column;
		gap: 15px;
		max-height: 400px;
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
		background-color: var(--primary);
		color: white;

		&:hover {
			background-color: rgba(0, 0, 0, 0.75);
		}
	}
}
</style>
