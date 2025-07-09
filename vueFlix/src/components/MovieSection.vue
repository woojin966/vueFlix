<template>
    <section class="movie_section">
        <h3 class="sb">{{  title  }}</h3>
        <ul>
            <MovieItem
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                :genres="props.genreMap"
            ></MovieItem>
        </ul>
    </section>
</template>

<script setup>
    import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
    import axios from 'axios'
    import MovieItem from './MovieItem.vue'

    const props = defineProps({
        title: String,
        endpoint: String,
        genreMap: Object,
    })

    const movies = ref([])

    onMounted(async () => {
        const res = await axios.get(`https://api.themoviedb.org/3${props.endpoint}`, {
            params: {
                api_key: 'fcc17cdaa94f35e5e1cf80b2de9ea4e7',
                language: 'ko-KR',
            }
        })
        movies.value = res.data.results
    })
</script>