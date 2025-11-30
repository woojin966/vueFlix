<template>
  <section class="hero_banner" :class="bannerClass">
    <div 
      class="hero_bg"
      :style="{ backgroundImage: activeBackdrop }"
    ></div>
    <div class="hero_text_box">
      <h1 class="hero_title b">VUEFLIX</h1>
      <p class="hero_subtitle big b">Browse popular movies <br class="mo_blk" />with TMDB API</p>
      <SearchBar @update:keyword="emit('update:keyword', $event)" ref="searchBarRef" />
      <!-- <button class="hero_cta medium" @click="scrollToMovies">
        Browse Movies
      </button> -->
    </div>
    <div class="hero-slider">
      <!-- <Swiper
        v-if="popularMovies.length"
        :modules="[Autoplay, Pagination]"
        :loop="true"
        :autoplay="{ delay: 7000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :slides-per-view="1"
        :space-between="0"
        class="hero-swiper"
        @slideChange="onSlideChange"
    > -->
    <Swiper
        v-if="popularMovies.length"
        :modules="[Autoplay, Pagination]"
        :loop="true"
        :pagination="{ clickable: true }"
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
            <p class="movie_overview text n">{{ movie.overview || '설명이 없습니다.' }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, computed  } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SearchBar from './SearchBar.vue'

const props = defineProps({ active: Boolean })
const emit = defineEmits(['update:keyword'])

const popularMovies = ref([])
const activeSlideIndex = ref(0)

const activeBackdrop = computed(() => {
  const movie = popularMovies.value[activeSlideIndex.value]
  if (!movie?.backdrop_path) return ''
  return `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
})

// 슬라이드 변경 시 현재 인덱스 업데이트
const onSlideChange = (swiper) => {
  activeSlideIndex.value = swiper.realIndex
}

// CTA 버튼 → 영화 목록으로 스크롤
// const scrollToMovies = () => {
//   const target = document.querySelector('.movie_section')
//   if (target) {
//     window.scrollTo({
//       top: target.offsetTop - 60,
//       behavior: 'smooth'
//     })
//   }
// }

const searchBarRef = ref(null)

const resetSearch = () => {
  searchBarRef.value?.clearInput()
}

defineExpose({ resetSearch })

// TMDB 인기 영화 불러오기
const posterUrlForBanner = (path) =>
  `https://image.tmdb.org/t/p/w500${path}`
const fetchPopular = async () => {
  const res = await axios.get('https://api.themoviedb.org/3/movie/popular', {
    params: {
      api_key: 'fcc17cdaa94f35e5e1cf80b2de9ea4e7',
      language: 'ko-KR',
    }
  })
  
  popularMovies.value = res.data.results.slice(0, 10)
}

onMounted(fetchPopular)
const bannerClass = computed(() => ({
  collapsed: props.active
}))
</script>

<style scoped lang="scss">
@import '../assets/mainbanner.scss';
</style>
