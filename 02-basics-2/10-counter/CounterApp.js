import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const minCounter = 0
    const maxCounter = 5

    const counter = ref(0)

    function incCounter() {
      counter.value += 1
    }

    function decCounter() {
      counter.value -= 1
    }

    return {
      minCounter,
      maxCounter,
      counter,

      incCounter,
      decCounter
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter <= minCounter"
        @click="decCounter"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter >= maxCounter"
        @click="incCounter"
      >➕</button>
    </div>
  `,
})
