<template>
<article class="aspect-edit">
    <h2>
        <textarea
            ref="title"
            class="aspect-edit__title"
            v-model="data.title"/>
    </h2>
    <h3>
        <textarea
            ref="description"
            class="aspect-edit__description"
            v-model="data.description"/>
    </h3>
    <ul>
        <li>
            <button
                :class="{'active': data.type === AspectType.Concept}"
                @click="data.type = AspectType.Concept">
                <Dice plus/>
            </button>
        </li>
        <li>
            <button
                :class="{'active': data.type === AspectType.Problem}"
                @click="data.type = AspectType.Problem">
                <Dice minus/>
            </button>
        </li>
        <li>
            <button
                :class="{'active': data.type === AspectType.Neutral}"
                @click="data.type = AspectType.Neutral">
                <Dice/>
            </button>
        </li>
    </ul>
    <nav>
        <Button v-if="mode === 'edit'" @click="remove" secondary>
            Remove
        </Button>
        <Button @click="close" secondary>
            Discard
        </Button>
        <Button @click="save">
            Save
        </Button>
    </nav>

</article>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Aspect, AspectType} from "@/types";
import Dice from "@/components/common/Dice.vue";
import Button from "@/components/ui/Button.vue";
import {useAutoHeight} from "@/composables/useAutoHeight";

interface Data {
    data: Aspect
}

export default defineComponent({
    name: "AspectEdit",
    computed: {
        AspectType() {
            return AspectType
        }
    },
    emits: ['close', 'update', 'remove'],
    components: {Button, Dice},
    props: {
        aspect: {
            type: Object as PropType<Aspect>,
            required: true
        },
        mode: {
            type: String,
            required: true
        }
    },
    data(): Data {
        return {
            data: JSON.parse(JSON.stringify(this.aspect))
        }
    },
    mounted() {
        this.autoUpdateHeight(this.$refs.title as HTMLTextAreaElement)
        this.autoUpdateHeight(this.$refs.description as HTMLTextAreaElement)
    },
    methods: {
        remove() {
          this.$emit('remove')
        },
        close() {
            this.$emit('close')
        },
        save() {
            this.$emit('update', this.data)
            this.$emit('close')
        }
    },
    setup() {
        return useAutoHeight()
    }
})
</script>

<style scoped lang="scss">
.aspect-edit {
    padding: 15px;

    &__title {
        text-align: center;
        font-weight: bold;
    }

    &__description {

    }
}

textarea {
    width: 100%;
    resize: none;
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    font-family: var(--inter);
    font-size: 24px;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    min-height: 50px;
    max-height: 500px;

}

ul {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 16px 0;



    button {
        display: grid;
        place-content: center;
        height: 48px;
        width: 48px;
        border-radius: 100%;
        border: none;
        background-color: transparent;
        transition: background-color 0.15s ease-out;

        &:hover {
            background-color: rgba(0,0,0,0.1);
        }

        &.active {
            background-color: rgba(0,0,0,0.25);
        }
    }
}
</style>
