import { defineComponent, onMounted, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const selectedMeetupId = ref(1)
    const selectedMeetupTitle = ref('')
    const minMeetupId = 1
    const maxMeetupId = 5

    const loadMeetup = async (id) => {
      const meetup = await getMeetup(id)
      selectedMeetupTitle.value = meetup.title
    }

    onMounted(() => {
      loadMeetup(selectedMeetupId.value)
    })

    watch(selectedMeetupId, async () => {
      await loadMeetup(selectedMeetupId.value)
    })

    const goToPrev = function () {
      if (selectedMeetupId.value > minMeetupId) {
        selectedMeetupId.value--
      }
    }

    const goToNext = function () {
      if (selectedMeetupId.value < maxMeetupId) {
        selectedMeetupId.value++
      }
    }

    return {
      selectedMeetupId,
      selectedMeetupTitle,
      goToPrev,
      goToNext,
      minMeetupId,
      maxMeetupId
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="selectedMeetupId === minMeetupId" @click="goToPrev">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div 
            v-for="id in maxMeetupId" 
            :key="id" 
            class="radio-group__button"
          >
            <input
              :id="'meetup-id-' + id"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="id"
              v-model="selectedMeetupId"
            />
            <label :for="'meetup-id-' + id" class="radio-group__label">{{ id }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="selectedMeetupId === maxMeetupId" @click="goToNext">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ selectedMeetupTitle }}</h1>
        </div>
      </div>

    </div>
  `,
})