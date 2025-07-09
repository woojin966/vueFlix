<template>
    <li class="movie_item">
        <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
        />
        <p class="big sb">{{ movie.title }}</p>
        <p class="text n">{{ genreNames.join(', ') }} | {{ releaseYear }}</p>
    </li>
</template>

<script setup>
    import { genreMap } from '../data/genres'

    const props = defineProps({ movie: Object, genres: Object })

    const releaseYear = props.movie.release_date
    ? props.movie.release_date.slice(0, 4)
    : '정보 없음'

    const genreNames = props.movie.genre_ids
  ? props.movie.genre_ids.map(id => genreMap[id] || '기타')
  : []
</script>

<style scoped lang="scss">
@import '../assets/movieitem.scss';
</style>