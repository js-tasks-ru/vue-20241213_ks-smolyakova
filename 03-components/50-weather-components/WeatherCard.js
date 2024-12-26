import { computed, defineComponent } from 'vue';
import WeatherCardAlert from './WeatherCardAlert.js';
import WeatherCardTitle from './WeatherCardTitle.js';
import WeatherCardTemperature from './WeatherCardTemperature.js';
import WeatherCardDetails from './WeatherCardDetails.js';

export default defineComponent({
    name: 'WeatherCard',

    components: {
        WeatherCardAlert,
        WeatherCardTitle,
        WeatherCardTemperature,
        WeatherCardDetails
    },

    props: {
        weatherInfo: {
            type: Object,
            required: true
        }
    },

    setup(props) {
        const isNight = computed(() => {
        const timeToMinutes = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
          };
    
          const localMinutes = timeToMinutes(props.weatherInfo.current.dt);
          const sunriseMinutes = timeToMinutes(props.weatherInfo.current.sunrise);
          const sunsetMinutes = timeToMinutes(props.weatherInfo.current.sunset);
    
          return localMinutes < sunriseMinutes || localMinutes > sunsetMinutes;
        })

      return {
        isNight
      }
    },

    template: `
        <li class="weather-card" :class="{'weather-card--night': isNight}">
            <WeatherCardAlert v-if="weatherInfo.alert" :sender-name="weatherInfo.alert.sender_name" :description="weatherInfo.alert.description" />

            <WeatherCardTitle :geographic-name="weatherInfo.geographic_name" :time="weatherInfo.current.dt" />

            <WeatherCardTemperature :weather="weatherInfo.current" />

            <WeatherCardDetails
                :pressure="weatherInfo.current.pressure"
                :humidity="weatherInfo.current.humidity"
                :clouds="weatherInfo.current.clouds"
                :windSpeed="weatherInfo.current.wind_speed"
            />
        </li>
    `

});