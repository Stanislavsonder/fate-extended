<template>
	<SheetHeader/>
	<CharList/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CharList from "@/components/CharList.vue";
import SheetHeader from "@/components/header/SheetHeader.vue";

export default defineComponent({
	name: 'App',
	components: {
		SheetHeader,
		CharList
  }
});
</script>

<style src="./reset.css"/>
<style lang="scss">
:root {
    --inter: Inter, Avenir, Helvetica, Arial, sans-serif;
}
button {
    cursor: pointer;
}
body {

    font-family: var(--inter);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #fdfcfc;
}
</style>
