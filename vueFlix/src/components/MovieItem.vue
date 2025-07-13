<template>
    <div :class="['movie_item', { popular: endpoint === '/movie/popular' }]">
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
        <div>
            <p class="big sb">{{ movie.title }}</p>
            <div class="movie_text">
                <p class="text n">{{ genreNames.join(', ') }} | {{ releaseYear }}</p>
                <p class="text n">⭐ {{ movie.vote_average }}</p>
            </div>
            <div class="movie_btn_box">
                <div class="thumbs">
                    <button type="button" class="text thumbs_btn up" @click="changeIcon('up')">
                        <font-awesome-icon :icon="upVoted ? ['fas', 'thumbs-up'] : ['far', 'thumbs-up']" />
                    </button>
                    <button type="button" class="text thumbs_btn down" @click="changeIcon('down')">
                        <font-awesome-icon :icon="downVoted ? ['fas', 'thumbs-down'] : ['far', 'thumbs-down']" />
                    </button>
                </div>
                <button type="button" class="text mb movie_detail_btn">상세</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    // import { genreMap } from '../data/genres'
    import { ref, onMounted, watch } from 'vue'

    const props = defineProps({ 
        movie: Object, 
        genres: Object,
        index: Number,
        endpoint: String, 
    })
    const emit = defineEmits(['notify'])
    const STORAGE_KEY = 'vueflix-votes'
    const voteKey = `movie-${props.movie.id}`
    const saveVote = (type) => {
        const savedVotes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        savedVotes[voteKey] = type
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedVotes))
    }
    const upVoted = ref(false)
    const downVoted = ref(false)

    const changeIcon = (type) => {
        const title = props.movie.title
    const savedVotes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')

    if (type === 'up') {
        if (upVoted.value) {
            // 이미 up 상태면 취소
            upVoted.value = false
            delete savedVotes[voteKey]
            emit('notify', {
                icon: ['far', 'thumbs-up'],
                message: `'${title}' 좋아요가 취소되었습니다.`,
            })
        } else {
            // 새로 up 누름
            upVoted.value = true
            downVoted.value = false
            savedVotes[voteKey] = 'up'
            emit('notify', {
                icon: ['fas', 'thumbs-up'],
                message: `'${title}' 영화 평점에 반영되었습니다.`,
            })
        }
    } else if (type === 'down') {
        if (downVoted.value) {
            // 이미 down 상태면 취소
            downVoted.value = false
            delete savedVotes[voteKey]
            emit('notify', {
                icon: ['far', 'thumbs-down'],
                message: `'${title}' 싫어요가 취소되었습니다.`,
            })
        } else {
            // 새로 down 누름
            downVoted.value = true
            upVoted.value = false
            savedVotes[voteKey] = 'down'
            emit('notify', {
                icon: ['fas', 'thumbs-down'],
                message: `'${title}' 영화 평점에 반영되었습니다.`,
            })
        }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedVotes))
    }

    const releaseYear = props.movie.release_date
    ? props.movie.release_date.slice(0, 4)
    : '정보 없음'

    const genreNames = props.movie.genre_ids
    ? props.movie.genre_ids.map(id => props.genres[id] || '기타')
    : []

    onMounted(() => {
        const savedVotes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        if (savedVotes[voteKey] === 'up') {
            upVoted.value = true
            downVoted.value = false
        } else if (savedVotes[voteKey] === 'down') {
            downVoted.value = true
            upVoted.value = false
        }
    })
</script>

<style scoped lang="scss">
@import '../assets/movieitem.scss';
</style>