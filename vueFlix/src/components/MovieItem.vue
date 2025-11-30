<template>
    <div 
        :class="[
          'movie_item',
          { 
            popular: endpoint === '/movie/popular',
            hovering: hover,
            voted: voteState !== null   
          }
        ]" 
        @mouseenter="onEnter"
        @mouseleave="onLeave"
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
            <!-- <h3 class="big sb" >{{ movie.title }}</h3> -->
            <h3 class="big sb" v-html="highlightedTitle"></h3>
            <div class="movie_text">
                <p class="text n">{{ genreNames.join(', ') }} | {{ releaseYear }}</p>
                <p class="text n">⭐ {{ movie.vote_average }}</p>
            </div>
            <div class="movie_btn_box">
                <ThumbsButton
                    :movie-id="movie.id"
                    :movie-title="movie.title"
                    @notify="$emit('notify', $event)"
                />
                <button type="button" class="text mb movie_detail_btn" @click.stop="$emit('open-modal', movie)">{{ t("detail") }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVotes } from '../composables/useVotes'
import ThumbsButton from './ThumbsButton.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })

const props = defineProps({ 
    movie: Object,
    genresMap: Object,  
    index: Number,
    endpoint: String,
    keyword: String
})

//  👍 좋아요, 싫어요 관련 (중앙 스토어만 사용)
const { getVote } = useVotes()

// 🔥 이 값만 믿는다. set은 절대 하지 않음!
const voteState = computed(() => getVote(props.movie.id))

// ui관련
const hover = ref(false)
const canHover = window.matchMedia('(hover: hover)').matches

const onEnter = () => {
    if (!canHover) return  
    hover.value = true
}
const onLeave = () => {
    if (!canHover) return
    hover.value = false
}

const highlightedTitle = computed(() => {
  if (!props.keyword) return props.movie.title

  const regex = new RegExp(`(${props.keyword})`, 'gi')
  return props.movie.title.replace(regex, `<mark>$1</mark>`)
})

const releaseYear = computed(() => 
    props.movie.release_date 
        ? props.movie.release_date.slice(0, 4)
        : '정보 없음'
)

const genreNames = computed(() => {
    if (!props.movie.genre_ids) return []
    return props.movie.genre_ids
        .map(id => props.genresMap[id])
        .filter(Boolean)
})
</script>




<style scoped lang="scss">
@import '../assets/movieitem.scss';
</style>