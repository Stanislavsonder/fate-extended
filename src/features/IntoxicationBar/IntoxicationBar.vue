<template>
	<div class="main-bar">
		<div class="main-bar__numbers">
			<span class="main-bar__icon">
				<PotionIcon />
			</span>
			<h6>{{ intoxication.current }} /</h6>
		</div>
		<div
			:style="gradient"
			class="main-bar__bar">
			<span class="main-bar__threshold main-bar__threshold--high" />
			<span class="main-bar__threshold main-bar__threshold--medium" />
			<span class="main-bar__threshold main-bar__threshold--light" />
		</div>
	</div>
</template>

<script lang="ts">
import PotionIcon from '@/shared/ui/Icon/svg/PotionIcon.vue'
import { defineComponent, PropType } from 'vue'
import { Intoxication } from '@/types'
import { useCharactersStore } from '@/app/store/CharacterStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
	name: 'IntoxicationBar',
	components: { PotionIcon },
	props: {
		intoxication: {
			type: Object as PropType<Intoxication>,
			required: true,
		},
	},
	setup() {
		const store = useCharactersStore()

		const { maxIntoxication } = storeToRefs(store)

		return {
			maxIntoxication,
		}
	},
	computed: {
		percent() {
			return (this.intoxication.current / this.maxIntoxication) * 100
		},
		gradient() {
			return {
				background: `linear-gradient(${
					this.percent < 100
						? `90deg, #181818 0%, #181818 ${this.percent}%, transparent ${this.percent}%`
						: `90deg, #7E7E7E 0%, #7E7E7E ${this.percent - 100}%, #181818 ${this.percent - 100}%`
				})`,
			}
		},
	},
})
</script>

<style scoped lang="scss">
.main-bar {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	height: 20px;
	width: 100%;

	&__numbers {
		position: relative;
		display: flex;
		justify-content: flex-end;
		padding: 0 10px;
		box-sizing: border-box;
		width: 150px;
		height: 100%;
		font-size: 16px;
		font-weight: bold;
		border: 2px solid var(--primary);

		&:before {
			content: '';
			position: absolute;
			left: 0;
			width: 10px;
			height: 18px;
			background-color: white;
			top: -2px;
			z-index: 0;
			transform: translateX(-50%);
		}
	}

	&__icon {
		position: absolute;
		left: 0;
		top: 0;
		transform: translateX(-50%) scale(1.5);
	}

	&__bar {
		position: relative;
		height: 100%;
		box-sizing: border-box;
		width: calc(100% - 150px);
		border: 2px solid var(--primary);
		border-radius: 0 5px 5px 0;
	}
	&__threshold {
		position: absolute;
		z-index: 1;
		top: 50%;
		left: 0;
		background-color: white;
		height: calc(100% + 4px);
		transform: translateX(-50%) translateY(-50%);

		&:before {
			content: '';
			position: absolute;
			z-index: 1;
			background-color: white;
			width: 6px;
			height: 6px;
			top: 50%;
			transform: translateX(-50%) translateY(-50%) rotate(45deg);
		}

		&--light {
			left: 25%;
		}

		&--medium {
			left: 50%;
		}

		&--high {
			left: 75%;
		}
	}
}
</style>
