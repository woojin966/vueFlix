<template>
    <div :class="['movie_item', { popular: endpoint === '/movie/popular' }]">
        <p v-if="endpoint === '/movie/popular'" :class="['popular_num bb', `num_${index}`]">{{ index + 1 }}</p>
        <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
        />
        <div>
            <p class="big sb">{{ movie.title }}</p>
            <div class="movie_text">
                <p class="text n">{{ genreNames.join(', ') }} | {{ releaseYear }}</p>
                <p class="text n">⭐ {{ movie.vote_average }}</p>
            </div>
            <div class="movie_btn_box">
                <div class="thumbs">
                    <button type="button" class="text thumbs_btn up" @click="changeIcon">
                        <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    </button>
                    <button type="button" class="text thumbs_btn down" @click="changeIcon">
                        <font-awesome-icon :icon="['far', 'thumbs-down']" />
                    </button>
                </div>
                <button type="button" class="text mb movie_detail_btn">상세</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    // import { genreMap } from '../data/genres'

    const props = defineProps({ 
        movie: Object, 
        genres: Object,
        index: Number,
        endpoint: String, 
    })

    const releaseYear = props.movie.release_date
    ? props.movie.release_date.slice(0, 4)
    : '정보 없음'

    const genreNames = props.movie.genre_ids
    ? props.movie.genre_ids.map(id => props.genres[id] || '기타')
    : []

    const changeIcon = () => {

    }
</script>

<style scoped lang="scss">
@import '../assets/movieitem.scss';
</style>