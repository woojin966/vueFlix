<template>
  <section class="search_results">

    <!-- 🔥 로딩 -->
    <BaseLoader v-if="isLoading" />

    <!-- 🔥 에러 -->
    <BaseError v-else-if="isError" :message="errorMessage" />

    <!-- 🔥 결과 있음 -->
    <div v-else-if="movies.length">
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :genresMap="genresMapActive"
        @open-modal="$emit('open-modal', $event)"
      />
    </div>

    <!-- 🔥 결과 없음 -->
    <div v-else>
      <font-awesome-icon :icon="['fas', 'ban']" />
      <p>검색 결과가 없습니다.</p>
    </div>

  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { searchMovies } from '../api/tmdb'
import MovieItem from './MovieItem.vue'
import BaseLoader from './common/BaseLoader.vue'
import BaseError from './common/BaseError.vue'
import { useGenres } from '../composables/useGenres'

const emit = defineEmits(['open-modal'])

const { genresMapActive } = useGenres()

const props = defineProps({
  keyword: String,
})

const movies = ref([])
const isLoading = ref(false)
const isError = ref(false)
const errorMessage = ref('')

const fetchResults = async () => {
  if (!props.keyword) return

  const MIN_LOADING = 400
  const start = Date.now()

  isLoading.value = true
  isError.value = false
  errorMessage.value = ''

  try {
    const res = await searchMovies(props.keyword)
    movies.value = res.data.results
  } catch (err) {
    console.error(err)
    isError.value = true
    errorMessage.value = '검색 결과를 불러오지 못했습니다.'
  } finally {
    const elapsed = Date.now() - start
    const wait = Math.max(0, MIN_LOADING - elapsed)
    await new Promise(r => setTimeout(r, wait))
    isLoading.value = false
    console.log('[SearchResults] isLoading 끝, elapsed:', elapsed, 'ms')
  }
}

onMounted(fetchResults)
watch(() => props.keyword, fetchResults)
</script>

<style scoped lang="scss">
@import '../assets/searchresult.scss';
</style>
