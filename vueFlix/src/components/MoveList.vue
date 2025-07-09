<template>
    <ul>
        <MovieItem 
            v-for="movie in filterMovies" 
            :key="movie.id" 
            :movie="movie"
        ></MovieItem>
    </ul>
</template>

<script setup>
    import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
    import axios from 'axios'
    import Hangul from 'hangul-js'
    import MovieItem from './MovieItem.vue'
    
    const props = defineProps(['keyword'])
    let page = ref(1)
    const isFetching = ref(false)
    const movies = ref([])

    const fetchMovies = async () => {
        if (isFetching.value) return
        isFetching.value = true

        try{
            const movieRes  = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                params: {
                    api_key: 'fcc17cdaa94f35e5e1cf80b2de9ea4e7',
                    language: 'ko-KR',
                    sort_by: 'popularity.desc',
                    page: page.value
                }
            })
            movies.value.push(...movieRes.data.results)
        } finally {
            isFetching.value = false
        }
    }

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    onMounted(() => {
        fetchMovies()
        window.addEventListener('scroll', handleScroll)
    })

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            page.value++
            fetchMovies()
        }
    }

    const filterMovies = computed(() => {
        return movies.value.filter((movie) => {
            const title = movie.title || ''
            const dis = Hangul.disassemble(title).join('')
            const search = Hangul.disassemble(props.keyword).join('')
            return (
                title.toLowerCase().includes(props.keyword.toLowerCase()) ||
                dis.includes(search)
            )
        })
    })
</script>