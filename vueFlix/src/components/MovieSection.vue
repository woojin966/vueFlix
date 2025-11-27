<template>
  <section class="movie_section">
    <h2 class="sb">{{ title }}</h2>

    <!-- 🔥 로딩 -->
    <BaseLoader v-if="isLoading" />

    <!-- 🔥 에러 -->
    <BaseError v-else-if="isError" :message="errorMessage" />

    <!-- 🔥 정상 목록 -->
    <Swiper
      v-else
      :modules="[Navigation]"
      :navigation="navigationOptions"
      :breakpoints="swiperBreakpoints"
      class="movie-swiper"
      ref="swiperRef"
    >
      <SwiperSlide
        v-for="(movie, index) in movies.slice(0, limit)"
        :key="movie.id"
      >
        <MovieItem
          :movie="movie"
          :genresMap="genresMapActive"
          :index="index"
          :endpoint="props.endpoint"
          @notify="$emit('notify', $event)"
          @open-modal="$emit('open-modal', $event)"
        />
      </SwiperSlide>
    </Swiper>

    <div :class="`${uniqueId}-prev swiper-button-prev`"></div>
    <div :class="`${uniqueId}-next swiper-button-next`"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import MovieItem from './MovieItem.vue'
import BaseLoader from './common/BaseLoader.vue'
import BaseError from './common/BaseError.vue'
import { useGenres } from '../composables/useGenres'

import {
  getPopularMovies,
  getNowPlaying,
  getUpcomingMovies,
  getTopRatedMovies,
  fetchByEndpoint,
} from '../api/tmdb'

const swiperRef = ref(null)

const props = defineProps({
  title: String,
  endpoint: String,
  limit: { type: Number, default: 20 },
})

const movies = ref([])
const isLoading = ref(false)
const isError = ref(false)
const errorMessage = ref('')

const { genresMapActive } = useGenres()

const apiMap = {
  '/movie/popular': getPopularMovies,
  '/movie/now_playing': getNowPlaying,
  '/movie/upcoming': getUpcomingMovies,
  '/movie/top_rated': getTopRatedMovies,
}

const uniqueId = `swiper-${Math.random().toString(36).substr(2, 9)}`

const navigationOptions = {
  nextEl: `.${uniqueId}-next`,
  prevEl: `.${uniqueId}-prev`,
}

const swiperBreakpoints = {
  0: { slidesPerView: 1.2, loop: true, spaceBetween: 12 },
  1024: { slidesPerView: 3, spaceBetween: 16 },
  1280: { slidesPerView: 4, spaceBetween: 20 },
  1900: { slidesPerView: 5, spaceBetween: 20 },
}

onMounted(async () => {
  const MIN_LOADING = 400
  const start = Date.now()

  isLoading.value = true
  isError.value = false
  errorMessage.value = ''

  try {
    let res

    if (props.endpoint.startsWith('/discover/movie')) {
      res = await fetchByEndpoint(props.endpoint)
    } else {
      const apiFn = apiMap[props.endpoint]
      if (!apiFn) {
        throw new Error(`Invalid endpoint: ${props.endpoint}`)
      }
      res = await apiFn()
    }

    movies.value = res.data.results

    await nextTick()
    if (swiperRef.value?.swiper) {
      swiperRef.value.swiper.navigation.init()
      swiperRef.value.swiper.navigation.update()
    }
  } catch (err) {
    console.error(err)
    isError.value = true
    errorMessage.value = '영화 데이터를 불러오지 못했습니다.'
  } finally {
    const elapsed = Date.now() - start
    const wait = Math.max(0, MIN_LOADING - elapsed)
    await new Promise(r => setTimeout(r, wait))
    isLoading.value = false
    console.log('[MovieSection] isLoading 끝, elapsed:', elapsed, 'ms')
  }
})
</script>

<style scoped lang="scss">
@import '../assets/moviesection.scss';
</style>
