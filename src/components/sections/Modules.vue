<template>
<section class="modules">
    <img
        class="modules__fate-logo"
        src="/logo.png"
        alt="Fate Extended Logo">
    <ul
        class="modules__list"
        v-if="modules.length"
    >
        <li
            class="modules__module"
            :key="module.name"
            v-for="module in modules">
            <img
                class="modules__module-logo"
                :src="module.logo"
                :alt="module.name"
                :title="module.name">
        </li>
    </ul>
</section>
</template>

<script>
export default {
    name: "Modules",
    props: {
        modules: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style scoped lang="scss">
.modules {
    display: grid;
    place-content: center;
    padding: 20px;

    &__fate-logo {
       width: 250px;
    }
}
</style>
