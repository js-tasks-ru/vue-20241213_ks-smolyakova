import { defineComponent } from "vue";

export default defineComponent({
    name: 'WeatherCardTitle',

    props: {
        geographicName: {
            type: String,
            required: true
        },

        time: {
            type: String,
            required: true
        }
    },

    template: `
        <div>
            <h2 class="weather-card__name">
                {{ geographicName }}
            </h2>
            <div class="weather-card__time">
                {{ time }}
            </div>
        </div>
    `
})