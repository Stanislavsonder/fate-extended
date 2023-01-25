<template>
	<div class="load-window">
		<label class="load-window__label">
			<span>
				Please, load character file:
			</span>
			<UploadIcon class="load-window__upload"/>
			<input
				class="load-window__input"
				type="file"
				accept=".fate"
				@change="load">
		</label>
		<div v-if="charValidator">
			<h3>
				<strong>
					{{ loadedChar.name }},
				</strong>
				{{ loadedChar.race }}
				({{ loadedChar.level}} level)
			</h3>
			<ul class="load-window__modules">
				<li class="load-window__module" v-for="module in MODULES_LIST()" :key="module.title">
					<ModuleIcon :type="module.icon"/>
				</li>
			</ul>
		</div>
		<Button
			class="load-window__button"
			:disabled="!charValidator"
			@click="confirmLoading">
			Confirm
		</Button>
		<p>{{ error }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {validateCharacter} from "@/consts/validators";
import Button from "@/components/ui/Button.vue";
import UploadIcon from "@/components/ui/icons/UploadIcon.vue";
import {MODULES_LIST} from "@/consts/const";
import ModuleIcon from "@/components/ui/icons/modules/ModuleIcon.vue";

export default defineComponent({
	MODULES_LIST: MODULES_LIST,
	name: "LoadWindow",
	components: {ModuleIcon, UploadIcon, Button},
	emits: ['close'],
	data() {
		return {
			loadedChar: undefined,
			error: ''
		}
	},
	watch: {
		loadedChar(value) {

			console.log(validateCharacter(value), value);
		}
	},

	computed: {
		charValidator(): boolean {
			return !!this.loadedChar && validateCharacter(this.loadedChar);
		}
	},
	methods: {
		MODULES_LIST() {
			return MODULES_LIST
		},
		load(e: any) {
			if (!e.target.files.length) {
				this.loadedChar = undefined
				return;
			}
			const file = e.target.files[0] as File
			const reader = new FileReader()
			reader.readAsText(file, 'UTF-8');
			reader.onload = (event) => {
				if (typeof event?.target?.result === 'string') {
					this.loadedChar = JSON.parse(event.target.result)
				}
				else {
					this.loadedChar = undefined
				}
			}
		},
		confirmLoading() {
			this.$store.commit('setCharacter', this.loadedChar)
			this.$emit('close')
		}
	}
})
</script>

<style scoped lang="scss">
strong {
	font-weight: bolder;
}

.load-window {
	padding: 24px;

	&__label {
		padding: 50px;
		font-weight: bolder;
		font-size: 18px;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 2px dashed #181818;
		border-radius: 10px;
		height: 100px;
		margin: 20px 0;
		cursor: pointer;
		transition: background-color 0.15s ease-out;

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}

	&__upload {
		position: absolute;
		top: 50%;
		margin: 10px 0;
		transforM: scale(2.5);
		opacity: 0.5;
	}

	&__input {
		visibility: hidden;
	}

	&__modules {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin: 10px;
	}

	&__module {
		width: 30px;
		height: 30px;
		svg {
			width: 30px;
			height: 30px;
		}
	}

}
</style>
