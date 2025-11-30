<template>
  <section class="search_results" ref="searchRef">
    <BaseLoader v-if="isLoadingInitial" />
    <BaseError v-else-if="isError" :message="errorMessage" />
    <template v-else>
      <p v-if="movies.length" class="result_count sb">
        "{{ props.keyword }}" 검색 결과: {{ movies.length }}건
      </p>

      <div v-if="movies.length">
        <MovieGrid
          :items="movies"
          :genresMap="genresMapActive"
          :keyword="props.keyword"
          @open-modal="$emit('open-modal', $event)"
        />

        <div v-if="isLoadingMore" class="load-more-box">
          <BaseLoader small />
        </div>

        <div ref="sentinel" class="sentinel"></div>
      </div>

      <!-- 5) 결과 없음 -->
      <div v-else class="no_search">
        <font-awesome-icon :icon="['fas', 'ban']" />
        <p class="big sb">검색 결과가 없습니다.</p>
      </div>

    </template>

  </section>
</template>


<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { searchMovies } from '../api/tmdb'
import MovieGrid from './movies/MovieGrid.vue'
import BaseLoader from './common/BaseLoader.vue'
import BaseError from './common/BaseError.vue'
import { useGenres } from '../composables/useGenres'

const emit = defineEmits(['open-modal'])
const { genresMapActive } = useGenres()

const props = defineProps({
  keyword: String,
})

/* -------------------------- 상태 -------------------------- */
const movies = ref([])
const page = ref(1)
const totalPages = ref(1)

const isLoadingInitial = ref(false)
const isLoadingMore = ref(false)
const isError = ref(false)
const errorMessage = ref('')

const sentinel = ref(null)
let observer = null

const searchRef = ref(null)

/* --------------------- 검색 API -------------------- */
window.scrollTo({ top: 0, behavior: 'smooth' })
const fetchMovies = async (reset = false) => {
  if (!props.keyword) return

  if (reset) {
    movies.value = []
    page.value = 1
    totalPages.value = 1
    isLoadingInitial.value = true
    isError.value = false
  }

  try {
    const res = await searchMovies(props.keyword, page.value)
    totalPages.value = res.data.total_pages

    if (reset) {
      movies.value = res.data.results

      nextTick(() => {
    if (searchRef.value) {
      // const top = searchRef.value.offsetTop
      // window.scrollTo({ top, behavior: 'smooth' })

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  })
    } else {
      movies.value = [...movies.value, ...res.data.results]
    }

  } catch (err) {
    console.error(err)
    isError.value = true
    errorMessage.value = '검색 결과를 불러오지 못했습니다.'
  } finally {
    if (reset) isLoadingInitial.value = false
    else isLoadingMore.value = false
  }
}

/* ------------------ IntersectionObserver ------------------ */
const setupObserver = () => {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(entries => {
    const entry = entries[0]
    if (entry.isIntersecting && !isLoadingMore.value) {
      if (page.value < totalPages.value) {
        page.value++
        isLoadingMore.value = true
        fetchMovies()
      }
    }
  })

  if (sentinel.value) observer.observe(sentinel.value)
}

onMounted(() => {
  fetchMovies(true)
  setupObserver()
  // nextTick(() => {
  //   // const el = document.querySelector('')
  //   // if (el) el.scrollIntoView({ behavior: 'smooth' })
    
  // })
})

watch(() => props.keyword, () => {
  fetchMovies(true)
  emit('close-all-modals')
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped lang="scss">
@import '../assets/searchresult.scss';


</style>
