import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const formatter = new Intl.DateTimeFormat(navigator.language, { timeStyle: 'medium' });
    const timeFormatted = ref('');

    let intervalId = 0;

    onMounted(() => {
      timeFormatted.value =  formatter.format(new Date())

      intervalId = setInterval(() => {
        timeFormatted.value =  formatter.format(new Date())
      }, 1000);
    })

    onUnmounted(() => {
      clearInterval(intervalId)
    });

    return {
      timeFormatted
    }
  },

  template: `<div class="clock">{{ timeFormatted }} </div>`,
})
