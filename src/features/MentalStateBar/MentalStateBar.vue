<template>
	<Bar :max="maxMental" :current="characters[current].mental.current">
		<template #icon>
			<Icon name="MindIcon" />
		</template>
	</Bar>
</template>

<script lang="ts" setup>
import { Bar, Icon } from "@/shared/ui";
import { useCharactersStore } from "@/app/store/CharacterStore";
import { storeToRefs } from "pinia";

const store = useCharactersStore();

const { characters, current, maxMental } = storeToRefs(store);
</script>
