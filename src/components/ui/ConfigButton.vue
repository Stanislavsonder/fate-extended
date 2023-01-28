<template>
<button
	:title="hint"
    class="config-button"
    :class="modifiers">
    <component :is="type"/>
</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Buttons from './icons'

export default defineComponent({
    name: "ConfigButton",
    components: { ...Buttons },
    props: {
        type: {
            type: String,
            required: true
        },
        variant: {
            type: [String, Array],
            default: ''
        },
		hint: {
			type: String,
			default: ''
		}
    },
	computed: {
		modifiers(): string {

			if (typeof this.variant === 'string' && this.variant) {
				return 'config-button--' + this.variant
			}
			if (Array.isArray(this.variant)){
				return this.variant.map(e => 'config-button--' + e).join(' ')
			}
			return ''
		}
	}

})
</script>

<style lang="scss">
.config-button {
    display: inline-grid;
    place-content: center;
    box-sizing: border-box;
    border: none;
    height: 36px;
    width: 36px;
    border-radius: 100%;
    background-color: white;
    cursor: pointer;
    transition: background-color 0.15s ease-out;

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

	& > svg {
		width: 20px;
		height: 20px;
	}

    &--transparent {
        background-color: transparent;

		svg,
		path,
		circle {
			fill: white;
		}
    }

	&--danger {
		svg,
		path,
		circle {
			fill: #f87070;
		}
	}


}
</style>
