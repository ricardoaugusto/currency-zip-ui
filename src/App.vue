<template>
  <main>
    <div id="app">
      <h1>Currency Converter</h1>
      <div class="flex">
        <input
          type="text"
          v-model="currencyString"
          placeholder="1000USD + 5000BRL to EUR"
          class="input-field w-3/5 mr-2"
          @keyup.enter="convertCurrency"
        />
        <input
          type="text"
          v-model="whenString"
          :placeholder="getYesterdayDate()"
          class="input-field w-1/5 mr-2"
          @keyup.enter="convertCurrency"
        />
        <button
          data-testid="convertCurrencyButton"
          @click="convertCurrency"
          class="button w-1/5"
        >
          Convert
        </button>
      </div>
      <div
        v-if="response"
        data-testid="response"
        :class="`response ${responseClass}`"
        :key="responseKey"
      >
        {{ response }}
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const getYesterdayDate = () => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  return (
    yesterday.getFullYear() +
    ('0' + (yesterday.getMonth() + 1)).slice(-2) +
    ('0' + yesterday.getDate()).slice(-2)
  )
}

const responseClass = computed(() => {
  return hasError.value ? ' errorResponse' : ' successResponse'
})

const convertCurrency = async () => {
  hasError.value = false
  try {
    const res = await axios.post(apiUrl, {
      currency: currencyString.value,
      when: whenString.value,
    })
    response.value = res.data.result
    responseKey.value += 1
    blinkSuccessResponse()
  } catch (error) {
    hasError.value = true
    response.value = error.response.data.detail
  }
}

const blinkSuccessResponse = () => {
  successResponseBlink.value = true
  setTimeout(() => {
    successResponseBlink.value = false
  }, 1000)
}

const currencyString = ref('')
const whenString = ref(getYesterdayDate())
const response = ref(null)
const hasError = ref(false)
const responseKey = ref(0) // for reactivity
const successResponseBlink = ref(false)
const apiUrl = import.meta.env.VITE_API_ENDPOINT
</script>

<style lang="scss" scoped>
main {
  @apply flex justify-center items-center min-h-screen;
}

#app {
  @apply bg-white shadow-md p-8;
}

h1 {
  @apply text-2xl font-bold text-center mb-8;
}

.input-field {
  @apply border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-500 transition-all duration-300;
}

.button {
  @apply bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-300 transition-all duration-300;
}

.response {
  @apply mt-4 text-center text-xl;

  &.errorResponse {
    @apply text-red-700;
    animation: blink 0.2s 3;
  }

  &.successResponse {
    @apply text-green-700;
    animation: blink 0.5s ease-in-out;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
