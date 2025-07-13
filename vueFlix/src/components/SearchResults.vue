<template>
    <section :class="['search_results', {'no_search' : movies.length == 0}]">
    <div v-if="movies.length">
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :genres="genreMap"
      />
    </div>
    <div v-else>
        <font-awesome-icon :icon="['fas', 'ban']" />
        <p >검색 결과가 없습니다.</p>
    </div>
  </section>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue'
    import axios from 'axios'
    import MovieItem from './MovieItem.vue'
    import { genreMap } from '../data/genres'

    const props = defineProps({
        keyword: String
    })

    const movies = ref([])

    const fetchSearchResults = async () => {
        if (!props.keyword) return
            try {
                const res = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: 'fcc17cdaa94f35e5e1cf80b2de9ea4e7',
                        language: 'ko-KR',
                        query: props.keyword
                    }
                })
                movies.value = res.data.results
            } catch (err) {
                console.error('검색 에러:', err)
            }
        }

        // 최초 진입 또는 keyword 바뀔 때마다 검색
        onMounted(fetchSearchResults)
        watch(() => props.keyword, fetchSearchResults)
</script>

<style scoped lang="scss">
@import '../assets/searchresult.scss';
</style>