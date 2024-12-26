import { defineComponent, toRef } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true
    },

    min: {
      type: Number,
      required: false,
      default: 0
    },

    max: {
      type: Number,
      required: false,
      default: null
    }
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    function incCounter() {
      emit('update:count', props.count + 1)
    }

    function decCounter() {
      emit('update:count', props.count - 1)
    }

    return {
      incCounter,
      decCounter
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count <= min" @click="decCounter">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" :disabled="max !== null && count >= max" @click="incCounter">➕</UiButton>
    </div>
  `,
})
