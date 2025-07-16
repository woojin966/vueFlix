<template>
    <article class="banner_article">
        <!--:autoplay="{ delay: 8000, disableOnInteraction: false }" -->
        <Swiper
            v-if="popularMoviesForBanner.length"
            :modules="[Autoplay, Pagination]"
            :loop="true"
            :autoplay="{ delay: 8000, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            class="main-banner-swiper"
        >
            <SwiperSlide v-for="movie in popularMoviesForBanner" :key="movie.id">
                <section class="movie_info_section">
                    <div>
                        <div class="title_box">
                            <h1 class="bb">{{ movie.title }}</h1>
                            <p v-if="movie.krRelease" class="age_grade" :class="`age-${movie.krRelease}`">{{ movie.krRelease }}</p>
                        </div>
                        <p class="medium mb">{{ movie.overview || '설명이 없습니다.' }}</p>
                    </div>
                    <button class="mb text detail_btn">상세보기</button>
                </section>
                <section class="movie_poster_section">
                    <img :src="posterUrlForBanner(movie.poster_path)" :alt="movie.title" />
                </section>
            </SwiperSlide>
        </Swiper>
    </article>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import { Autoplay, Pagination } from 'swiper/modules'
    import 'swiper/css'
    import 'swiper/css/pagination'

    const popularMoviesForBanner = ref([])

    const fetchAgeRating = async (movieId) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`, {
                params: {
                api_key: 'fcc17cdaa94f35e5e1cf80b2de9ea4e7'
            }
        })
        const krInfo = res.data.results.find(item => item.iso_3166_1 === 'KR')
        if (!krInfo) return null
        const release = krInfo.release_dates.find(r => r.certification)
        return release?.certification || null
        } catch (e) {
            console.warn(`관람등급 가져오기 실패 (ID: ${movieId})`)
            return null
        }
    }

    const fetchpopularMovies = async () => {
        const res = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: 'fcc17cdaa94f35e5e1cf80b2de9ea4e7',
                language: 'ko-KR',
            }
        })
        const movies = res.data.results.slice(0, 10) // 상위 5개만
        const enriched = await Promise.all(
            movies.map(async (movie) => {
                const krRelease = await fetchAgeRating(movie.id)
                return { ...movie, krRelease }
            })
        )
        popularMoviesForBanner.value = enriched
    }

    const posterUrlForBanner = (path) => `https://image.tmdb.org/t/p/w500${path}`

    onMounted(fetchpopularMovies)
</script>

<style scoped lang="scss">
@import '../assets/mainbanner.scss';
</style>