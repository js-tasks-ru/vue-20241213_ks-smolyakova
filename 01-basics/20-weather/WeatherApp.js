import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData()

    console.log(weatherData)

    function getDegreesCelsius(degreesKelvin) {
      return (degreesKelvin - 273.15).toFixed(1)
    }

    function getPressureMmRtSt(pressure) {
      return Math.round(pressure * 0.75)
    }

    function getWeatherIcon(weather) {
      const icon = WeatherConditionIcons[weather.id];

      return icon;
    }

    function isNight(localTime, sunrise, sunset) {
      const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };

      const localMinutes = timeToMinutes(localTime);
      const sunriseMinutes = timeToMinutes(sunrise);
      const sunsetMinutes = timeToMinutes(sunset);

      return localMinutes < sunriseMinutes || localMinutes > sunsetMinutes;

    }
    

    return {
      weatherData,

      getDegreesCelsius,
      getPressureMmRtSt,
      getWeatherIcon,
      isNight
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="weatherCard in weatherData" class="weather-card" :class="{'weather-card--night': isNight(weatherCard.current.dt, weatherCard.current.sunrise, weatherCard.current.sunset)}">
          <div v-if="weatherCard.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weatherCard.alert.sender_name }}: {{ weatherCard.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weatherCard.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weatherCard.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherCard.current.weather.description">
              {{ getWeatherIcon(weatherCard.current.weather) }}
            </div>
            <div class="weather-conditions__temp">
              {{ getDegreesCelsius(weatherCard.current.temp) }} °C
            </div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ getPressureMmRtSt(weatherCard.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherCard.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherCard.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherCard.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `
})
