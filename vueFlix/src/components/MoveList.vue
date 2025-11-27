<template>
    <article class="movie_article">
        <MovieSection
            title="인기 영화"
            endpoint="/movie/popular"
            :genreMap="genreMap"
            class="popular"
            :limit="10"
            @notify="$emit('notify', $event)"
            @open-modal="$emit('open-modal', $event)"
        />
        <MovieSection 
            title="현재 상영 중" 
            endpoint="/movie/now_playing" 
            :genreMap="genreMap"
            @notify="$emit('notify', $event)"
            @open-modal="$emit('open-modal', $event)"
        />
        <MovieSection 
            title="상영 예정" 
            endpoint="/movie/upcoming" 
            :genreMap="genreMap"
            @notify="$emit('notify', $event)"
            @open-modal="$emit('open-modal', $event)"
        />
        <MovieSection 
            title="평점 높은 영화" 
            endpoint="/movie/top_rated"  
            :genreMap="genreMap"
            @notify="$emit('notify', $event)"
            @open-modal="$emit('open-modal', $event)"
        />
        <!-- 무한 스크롤로 추가되는 장르 섹션 -->
        <MovieSection 
            v-for="section in genreSections"
            :key="section.id"
            :title="section.name"
            :endpoint="section.endpoint"
            :genreMap="genreMap"
            @notify="$emit('notify', $event)"
            @open-modal="$emit('open-modal', $event)"
        />
    </article>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
    import MovieSection from './MovieSection.vue'
    import { useGenres } from '../composables/useGenres'

    const loadedGenreIndex = ref(0)
    const genreSections = ref([])
    const props = defineProps({
        keyword: String,
        genreMap: Object,
    })

    // 한국어 장르
    const { genreListKo } = useGenres()

    const loadNextGenre = () => {
  // 🔥 props.genreList → genreListKo 로 변경
  if (loadedGenreIndex.value >= genreListKo.value.length) return
  
  const genre = genreListKo.value[loadedGenreIndex.value]

  genreSections.value.push({
    id: genre.id,
    name: genre.name,
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

watch(() => props.keyword, (newVal) => {
  if (newVal === '') {
    initMovieSections()
  }
})
</script>

<style scoped lang="scss">
@import '../assets/movielist.scss';
</style>