<template>
<main class="char-sheet">
    <div class="char-sheet__main-section">
        <Character
            v-model:name="character.name"
            v-model:race="character.race"
            v-model:health="character.hp"
            v-model:mental="character.mental"
            v-model:intoxication="character.intoxication"
            v-model:mana="character.mana"
        />
        <Modules/>
    </div>
    <Aspects v-model:aspects="character.aspects"/>
    <div class="char-sheet__half-section">
        <Description v-model:description="character.description"/>
        <Inventory v-model:inventory="character.inventory"/>
    </div>
    <div class="char-sheet__half-section">
        <Skills v-model:skills="character.skills"/>
        <Stunts v-model:stunts="character.stunts"/>
    </div>
</main>
</template>

<script lang="ts">
import Character from "@/components/sections/Character.vue";
import Aspects from "@/components/sections/Aspects.vue";
import Modules from "@/components/sections/Modules.vue";
import Description from "@/components/sections/Description.vue";
import Inventory from "@/components/sections/Inventory.vue";
import Skills from "@/components/sections/Skills.vue";
import Stunts from "@/components/sections/Stunts.vue";
import {defineComponent} from "vue";
import {
    AspectType,
    Character as Char
} from "@/types";

interface Data {
    character: Char
}

export default defineComponent({
    name: "CharList",
    components: {
        Stunts,
        Skills,
        Inventory,
        Description,
        Modules,
        Aspects,
        Character
    },
    data(): Data {
        return {
            character: {
                name: 'John Marston',
                race: 'Human, American',
                hp: {
                    max: 500,
                    current: 180,
                    consequences: []
                },
                mental: {
                    max: 340,
                    current: 200,
                    consequences: []
                },
                mana: {
                    max: 340,
                    current: 340
                },
                intoxication: {
                    max: 110,
                    current: 100
                },
                aspects: [
                    {
                        title: 'Стрелок с большой дороги',
                        description: 'Может использоваться только на лошади. При использовании получает дополнительное очко действия для перемещения',
                        type: AspectType.Concept
                    },
                    {
                        title: 'Постой, я тебя знаю...',
                        description: 'Стражи порядка могут узнать в вас преступника',
                        type: AspectType.Problem
                    },
                    {
                        title: 'Money comes, money goes',
                        description: 'Вы знаете, как легко достать деньжат. Тратите их так же легко',
                        type: AspectType.Neutral
                    },
                ],
                inventory: 'Два револьвера Colt, Лошадь, ЛAssо, Подсумок с патронами, 500 денег, Красивые глазки, Классная жопа, Ковбойская шляпа, Украденный значок шерифа, Ещё 500 денег, Золотой слиток, Шкура крокодила, Ботинки со шпорами',
                description: 'Джон Марстон стал одним из главных членов банды Ван дер Линде. Он вместе с Датчем, Биллом Уильямсоном и Хавьером Эскуэлой совершал грабежи, рейды, убийства, похищения людей и другие преступления. Со времен Джон стал одним из лучших стрелком в банде наравне с Артуром Морганом. Многие члены банды считали Джона любимцем Датча и часто завидовали ему. По словам Марстона, банда воровала и воевала не просто так — часть украденного у богатых они отдавали бедным. Они хотели изменить мировоззрение у народа Дикого Запада, хоть это и было лишь оправданием их действий',
                skills: [
                    {
                        name: 'constitution',
                        level: 4,
                        experience: 0
                    },
                    {
                        name: 'shooting',
                        level: 3,
                        experience: 0
                    },
                    {
                        name: 'charisma',
                        level: 3,
                        experience: 50
                    },
                    {
                        name: 'stealth',
                        level: 2,
                        experience: 0
                    },
                    {
                        name: 'deceit',
                        level: 2,
                        experience: 0
                    },
                    {
                        name: 'mechanics',
                        level: 2,
                        experience: 0
                    },
                    {
                        name: 'medicine',
                        level: 1,
                        experience: 0
                    },
                    {
                        name: 'agility',
                        level: 1,
                        experience: 0
                    },
                    {
                        name: 'contacts',
                        level: 1,
                        experience: 0
                    },
                    {
                        name: 'knowledge',
                        level: 1,
                        experience: 0
                    },
                ],
                stunts: [
                    {
                        name: 'Волк в овечьей шкуре',
                        description: 'Может использовать свой значок шерифа для обмана других',
                        skill: 'Обман'
                    },
                    {
                        name: 'Плохой парень',
                        description: 'При броске харизмы в диалоге с девушкой, добавляет +1 к результату броска',
                        skill: 'Харизма'
                    },
                    {
                        name: 'Ковбой',
                        description: 'Может использовать навык вождения для приручения диких лошадей',
                        skill: 'Вождение'
                    },
                ],
                modules: [],
                level: 10

            }
        }
    },
    watch: {
        character: {
            handler: function (value) {
                window.localStorage.char = JSON.stringify(value);
            },
            deep: true
        }
    },
    mounted() {
        if (window.localStorage.char) {
            this.character = JSON.parse(window.localStorage.char);
        }
    }
})
</script>

<style lang="scss" scoped>
.char-sheet {
    &__main-section {
        display: flex;
    }

    &__half-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
</style>
