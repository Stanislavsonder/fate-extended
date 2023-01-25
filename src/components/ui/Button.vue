<template>
<button :class="{'secondary': secondary}">
    <slot/>
</button>
</template>

<script>
export default {
    name: "Button",
    props: {
        secondary: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
button {
    border: none;
    padding: 8px 16px;
    box-sizing: border-box;
    color: white;
    background-color: #181818;
    border-radius: 20px;
    font-size: 20px;
    margin: 5px;

    &.secondary {
        border: 1px solid #181818;
        background-color: transparent;
        color: #181818;

		&:not(:disabled):hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
    }

	&:not(:disabled):hover {
		background-color: rgba(0, 0, 0, 0.75);
	}

	&:disabled {
		opacity: 0.5;
	}
}
</style>
