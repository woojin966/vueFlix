<template>
  <section class="hero_banner" :class="bannerClass">
    <div 
      class="hero_bg"
      :style="{ backgroundImage: activeBackdrop }"
    ></div>
    <div class="hero_text_box">
      <h1 class="hero_title b">VUEFLIX</h1>

      <p class="hero_subtitle big b">
        {{ uiText.subtitle }}
      </p>
      <SearchBar 
        @update:keyword="emit('update:keyword', $event)" 
        ref="searchBarRef" 
      />
    </div>
    <div class="hero-slider">
      <Swiper
        v-if="popularMovies.length"
        :modules="[Autoplay, Pagination]"
        :loop="true"
        :pagination="{ clickable: true }"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false
        }"
        :slides-per-view="1"
        :space-between="0"
        class="hero-swiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide
          v-for="movie in popularMovies"
          :key="movie.id"
        >
          <div class="slide_content">
            <img :src="posterUrlForBanner(movie.poster_path)" :alt="movie.title" />
            <h2 class="movie_title medium b">{{ movie.title }}</h2>
            <p class="movie_overview text n">{{ movie.overview || uiText.noDescription }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SearchBar from './SearchBar.vue'
import { useGenres } from '../composables/useGenres'
const { currentLang } = useGenres()

const props = defineProps({
  active: Boolean,
})
const emit = defineEmits(['update:keyword'])

const API_KEY = import.meta.env.VITE_TMDB_KEY

const popularMovies = ref([])
const activeSlideIndex = ref(0)

const posterUrlForBanner = (path) =>
  `https://image.tmdb.org/t/p/w500${path}`

const uiText = computed(() =>
  currentLang.value === 'en'
    ? {
        subtitle: "Browse popular movies\nwith TMDB API",
        noDescription: "No description available.",
      }
    : {
        subtitle: "TMDB API로\n인기 영화를 탐색하세요",
        noDescription: "설명이 없습니다.",
      }
)

const activeBackdrop = computed(() => {
  const movie = popularMovies.value[activeSlideIndex.value]
  if (!movie?.backdrop_path) return ''
  return `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
})

const onSlideChange = (swiper) => {
  activeSlideIndex.value = swiper.realIndex
}

const langCode = computed(() =>
  currentLang.value === 'en' ? 'en-US' : 'ko-KR'
)

const fetchPopular = async () => {
  const res = await axios.get('https://api.themoviedb.org/3/movie/popular', {
    params: {
      api_key: API_KEY,
      language: langCode.value,
    }
  })

  popularMovies.value = res.data.results.slice(0, 10)
  activeSlideIndex.value = 0
}

onMounted(fetchPopular)

const bannerClass = computed(() => ({
  collapsed: props.active
}))

// ⭐ 언어 변경 시 자동 리프레시
watch(currentLang, async () => {
  popularMovies.value = []
  await fetchPopular()
})
</script>

<style scoped lang="scss">
@import '../assets/mainbanner.scss';
</style>
