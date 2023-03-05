<template>
	<Bar :max="maxHealth" :current="characters[current].health.current">
		<template #icon>
			<Icon name="HealthIcon" />
		</template>
	</Bar>
</template>

<script lang="ts" setup>
import { Bar, Icon } from "@/shared/ui";
import { useCharactersStore } from "@/app/store/CharacterStore";
import { storeToRefs } from "pinia";

const store = useCharactersStore();
const { characters, current, maxHealth } = storeToRefs(store);
</script>
