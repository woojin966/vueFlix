<template>
    <article class="movie_article">
        <MovieSection
            title="인기 영화"
            endpoint="/movie/popular"
            :genreMap="genreMap"
            class="popular"
            :limit="10"
        />
        <MovieSection 
            title="현재 상영 중" 
            endpoint="/movie/now_playing" 
            :genreMap="genreMap"
        />
        <MovieSection 
            title="상영 예정" 
            endpoint="/movie/upcoming" 
            :genreMap="genreMap"
        />
        <MovieSection 
            title="평점 높은 영화" 
            endpoint="/movie/top_rated"  
            :genreMap="genreMap"
        />
        <!-- 무한 스크롤로 추가되는 장르 섹션 -->
        <MovieSection 
            v-for="section in genreSections"
            :key="section.id"
            :title="section.name"
            :endpoint="section.endpoint"
            :genreMap="genreMap"
        />
    </article>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import MovieSection from './MovieSection.vue'
    import { genreMap, genreList } from '../data/genres'

    const loadedGenreIndex = ref(0)
    const genreSections = ref([])

    const loadNextGenre = () => {
        if (loadedGenreIndex.value >= genreList.length) return
        const genre = genreList[loadedGenreIndex.value]
        genreSections.value.push({
            id: genre.id,
            name: genre.name,
            endpoint: `/discover/movie?with_genres=${genre.id}`,
        })
        loadedGenreIndex.value++
    }

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadNextGenre()
        }
    }

    onMounted(() => {
        // 처음 한 섹션은 미리 로딩
        loadNextGenre()
        window.addEventListener('scroll', handleScroll) 
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })
</script>

<style scoped lang="scss">
@import '../assets/movielist.scss';
</style>