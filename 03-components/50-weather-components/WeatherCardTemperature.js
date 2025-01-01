import { computed, defineComponent } from 'vue';
import { WeatherConditionIcons } from './weather.service';

export default defineComponent({
    name: 'WeatherCardTemperature',

    props: {
        weather: {
            type: Object,
            required: true
        }
    },

    setup(props) {
      const weatherIcon = computed(() => {
        return WeatherConditionIcons[props.weather.weather.id];
      })

      const degreesCelsius = computed(() => {
        return (props.weather.temp - 273.15).toFixed(1)
      });

      return {
        weatherIcon,
        degreesCelsius
      }
    },

    template: `
        <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weather.weather.description">
                {{ weatherIcon }}
            </div>
            <div class="weather-conditions__temp">
                {{ degreesCelsius }} °C
            </div>
        </div>
    `
})