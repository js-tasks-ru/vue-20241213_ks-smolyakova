import { defineComponent, createApp } from 'vue'

const RootComponent = defineComponent({
    name: 'RootComponent',
    setup () {
        const formatter = new Intl.DateTimeFormat(navigator.language, { dateStyle: 'long' });
        const dateFormatted = formatter.format(new Date());

        return {
            dateFormatted
        }
    },
    template: '<div>Сегодня {{ dateFormatted }}</div>',
  })

createApp(RootComponent).mount('#app')
