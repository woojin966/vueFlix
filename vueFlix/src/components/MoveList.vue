<template>
  <article class="movie_article">
    
    <!-- 기본 섹션들 -->
    <MovieSection
      :title="titles[currentLang].popular"
      endpoint="/movie/popular"
      :genreMap="genreMap"
      :currentLang="currentLang"
      class="popular"
      :limit="10"
      @notify="$emit('notify', $event)"
      @open-modal="$emit('open-modal', $event)"
    />

    <MovieSection 
      :title="titles[currentLang].now_playing"
      endpoint="/movie/now_playing"
      :genreMap="genreMap"
      :currentLang="currentLang"
      @notify="$emit('notify', $event)"
      @open-modal="$emit('open-modal', $event)"
    />

    <MovieSection 
      :title="titles[currentLang].upcoming"
      endpoint="/movie/upcoming"
      :genreMap="genreMap"
      :currentLang="currentLang"
      @notify="$emit('notify', $event)"
      @open-modal="$emit('open-modal', $event)"
    />

    <MovieSection 
      :title="titles[currentLang].top_rated"
      endpoint="/movie/top_rated"
      :genreMap="genreMap"
      :currentLang="currentLang"
      @notify="$emit('notify', $event)"
      @open-modal="$emit('open-modal', $event)"
    />

    <!-- 무한스크롤 장르 섹션들 -->
    <MovieSection 
      v-for="section in genreSections"
      :key="section.id"
      :title="section.name"
      :endpoint="section.endpoint"
      :genreMap="genreMap"
      :currentLang="currentLang"
      @notify="$emit('notify', $event)"
      @open-modal="$emit('open-modal', $event)"
    />
  </article>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import MovieSection from './MovieSection.vue'
import { useGenres } from '../composables/useGenres'

const props = defineProps({
  keyword: String,
  genreMap: Object,
})

const { currentLang, genreListKo, genresEn } = useGenres()

const loadedGenreIndex = ref(0)
const genreSections = ref([])

const titles = {
  ko: {
    popular: "인기 영화",
    now_playing: "현재 상영 중",
    upcoming: "상영 예정",
    top_rated: "평점 높은 영화",
  },
  en: {
    popular: "Popular Movies",
    now_playing: "Now Playing",
    upcoming: "Upcoming Movies",
    top_rated: "Top Rated Movies",
  }
}

const genreListActive = computed(() =>
  currentLang.value === 'en'
    ? (genresEn.value || [])
    : genreListKo.value
)

const loadNextGenre = () => {
  if (loadedGenreIndex.value >= genreListActive.value.length) return

  const genre = genreListActive.value[loadedGenreIndex.value]

  genreSections.value.push({
    id: genre.id,
    name: genre.name, // ← en/ko 자동반영!
    endpoint: `/discover/movie?with_genres=${genre.id}`,
  })

  loadedGenreIndex.value++
}

const initMovieSections = () => {
  genreSections.value = []
  loadedGenreIndex.value = 0
  loadNextGenre()
}

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadNextGenre()
  }
}

onMounted(() => {
  initMovieSections()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(currentLang, () => {
  initMovieSections()
})

watch(() => props.keyword, (newVal) => {
  if (newVal === '') initMovieSections()
})
</script>

<style scoped lang="scss">
@import '../assets/movielist.scss';
</style>
