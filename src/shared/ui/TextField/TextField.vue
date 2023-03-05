<template>
	<Card class="text-section" :title="title">
		<template #buttons>
			<IconButton
				hint="Edit"
				type="EditIcon"
				variant="transparent"
				@click="editMode = true"
			/>
		</template>
		<template #content>
			<p v-if="!editMode">
				{{ modelValue || $t("click-edit-to-add-text") }}
			</p>
			<div v-show="editMode">
				<textarea
					ref="textarea"
					v-model="tmpValue"
					:placeholder="$t('click-here-to-write-text')"
					class="text-section__textarea"
				/>
				<nav class="text-section__buttons">
					<Button secondary @click="editMode = false">
						{{ $t("ui-cancel") }}
					</Button>
					<Button @click="save">
						{{ $t("ui-save") }}
					</Button>
				</nav>
			</div>
		</template>
	</Card>
</template>

<script lang="ts">
import { Button, Card, IconButton } from "@/shared/ui";
import { defineComponent } from "vue";
import { useAutoHeight } from "@/shared/composables/useAutoHeight";

//TODO: Add MD editor
export default defineComponent({
	name: "TextField",
	components: {
		IconButton,
		Card,
		Button,
	},
	emits: ["update:modelValue"],
	props: {
		title: {
			type: String,
			default: "",
		},
		modelValue: {
			type: String,
			required: true,
		},
	},
	setup() {
		return useAutoHeight();
	},
	data() {
		return {
			editMode: false,
			tmpValue: "",
		};
	},
	watch: {
		editMode() {
			this.tmpValue = this.modelValue;
		},
	},
	mounted() {
		this.autoUpdateHeight(this.$refs.textarea as HTMLTextAreaElement);
	},
	methods: {
		save() {
			this.$emit("update:modelValue", this.tmpValue);
			this.editMode = false;
		},
	},
});
</script>

<style scoped lang="scss">
.text-section {
	min-height: 300px;

	&__buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	p,
	&__textarea {
		font-size: 20px;
		text-align: justify;
		line-height: 1.35;
	}
	&__textarea {
		width: 100%;
		border: none;
		font-family: var(--inter);
		resize: none;
		min-height: 250px;
		max-height: max-content;
	}
}
</style>
