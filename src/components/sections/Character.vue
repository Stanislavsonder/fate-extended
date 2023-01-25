<template>
    <Card title="Character" class="character">
        <template v-slot:content>
            <div class="character__content">
                <div class="character__person">
                    <img
                        class="character__image"
                        src="https://cdn.vox-cdn.com/thumbor/UL8sOQrVnV0xlBQs9Ln9zznZCbE=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/8343885/red_dead_redemption_john_marston_revolver_1280.jpg" alt="">
                    <span class="character__level">
                10
            </span>
                </div>
                <div class="character__bars">
                    <div class="character__info">
                        <h2>{{ this.$store.state.character.name }}</h2>
                        <h3>{{ this.$store.state.character.race }}</h3>
                    </div>
                    <div class="character__core-bars">
                        <HealthBar/>
                        <MentalBar/>
                    </div>
                    <div class="character__additional-bars">
                        <ManaBar :mana="this.$store.state.character.mana"/>
                        <IntoxicationBar :intoxication="this.$store.state.character.intoxication"/>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>

<script lang="ts">
import Card from "@/components/common/Card.vue";
import HealthBar from "@/components/sheet-elements/bars/HealthBar.vue";
import MentalBar from "@/components/sheet-elements/bars/MentalBar.vue";
import ManaBar from "@/components/sheet-elements/bars/ManaBar.vue";
import IntoxicationBar from "@/components/sheet-elements/bars/IntoxicationBar.vue";
import {defineComponent, PropType} from "vue";
import {Health, Intoxication, Mana, Mental} from "@/types";

export default defineComponent({
    name: "Character",
    components: {
        IntoxicationBar, ManaBar, MentalBar, HealthBar, Card
    },
})
</script>

<style scoped lang="scss">
.character {
    width: 100%;

    &__content {
        display: flex;
        width: 100%;
        gap: 50px;
    }

    &__person {
        position: relative;
        height: 183px;
    }

    &__info {
        display: flex;
        justify-content: space-between;

        h2 {
            font-size: 24px;
            font-weight: bold;
        }
        h3 {
            font-weight: 500;
        }
    }

    &__image {
        height: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        border: 1px solid black;
        box-sizing: border-box;
        border-radius: 5px;
    }

    &__level {
        position: absolute;
        display: grid;
        place-content: center;
        font-weight: bold;
        font-size: 24px;
        width: 48px;
        height: 48px;
        border-radius: 14px 0 4px 0;
        background-color: white;
        right: 1px;
        bottom: 1px;
    }

    &__bars {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
    &__core-bars,
    &__additional-bars {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }

    &__additional-bars {
        width: 50%;
    }
}
</style>
