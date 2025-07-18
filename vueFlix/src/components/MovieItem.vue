<template>
    <div 
        :class="['movie_item', { popular: endpoint === '/movie/popular' }]" 
        @mouseenter="hover = true" 
        @mouseleave="hover = false"
        @click="$emit('open-modal', movie)"
    >
        <p v-if="endpoint === '/movie/popular'" :class="['popular_num bb', `num_${index}`]">{{ index + 1 }}</p>
        <div v-if="!movie.poster_path" class="no_img">
            <font-awesome-icon :icon="['fas', 'ban']" />
            <p class="medium">NO POSTER</p>
        </div>
        <img
            v-else
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.poster_path ? movie.title : ''"
        />
        <div class="movie_overlay" v-show="hover">
            <h3 class="big sb">{{ movie.title }}</h3>
            <div class="movie_text">
                <p class="text n">{{ genreNames.join(', ') }} | {{ releaseYear }}</p>
                <p class="text n">⭐ {{ movie.vote_average }}</p>
            </div>
            <div class="movie_btn_box">
                <!-- <ThumbsButton
                    :movie-id="movie.id"
                    :movie-title="movie.title"
                    @notify="$emit('notify', $event)"
                /> -->
                <button type="button" class="text mb movie_detail_btn" @click.stop="$emit('open-modal', movie)">상세</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    // import { genreMap } from '../data/genres'
    import { ref, onMounted, watch } from 'vue'
    import ThumbsButton from './ThumbsButton.vue'

    const props = defineProps({ 
        movie: Object, 
        genres: Object,
        index: Number,
        endpoint: String, 
    })
    
    const hover = ref(false)
    const releaseYear = props.movie.release_date
    ? props.movie.release_date.slice(0, 4)
    : '정보 없음'

    const genreNames = props.movie.genre_ids
    ? props.movie.genre_ids.map(id => props.genres[id] || '기타')
    : []
</script>

<style scoped lang="scss">
@import '../assets/movieitem.scss';
</style>