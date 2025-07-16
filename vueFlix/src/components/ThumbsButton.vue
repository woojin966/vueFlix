<template>
    <div class="thumbs">
        <button type="button" class="text thumbs_btn up" @click="handleClick('up')">
            <font-awesome-icon :icon="upVoted ? ['fas', 'thumbs-up'] : ['far', 'thumbs-up']" />
        </button>
        <button type="button" class="text thumbs_btn down" @click="handleClick('down')">
            <font-awesome-icon :icon="downVoted ? ['fas', 'thumbs-down'] : ['far', 'thumbs-down']" />
        </button>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps({
        movieId: Number,
        movieTitle: String,
    })
    const emit = defineEmits(['notify', 'vote-changed'])

    const STORAGE_KEY = 'vueflix-votes'
    const voteKey = `movie-${props.movieId}`
    const upVoted = ref(false)
    const downVoted = ref(false)

    const handleClick = (type) => {
        const savedVotes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')

        if (type === 'up') {
            if (upVoted.value) {
                upVoted.value = false
                delete savedVotes[voteKey]
                emit('notify', {
                    icon: ['far', 'thumbs-up'],
                    message: `'${props.movieTitle}' 좋아요가 취소되었습니다.`,
                })
            } else {
                upVoted.value = true
                downVoted.value = false
                savedVotes[voteKey] = 'up'
                emit('notify', {
                    icon: ['fas', 'thumbs-up'],
                    message: `'${props.movieTitle}' 영화 평점에 반영되었습니다.`,
                })
            }
        } else if (type === 'down') {
            if (downVoted.value) {
                downVoted.value = false
                delete savedVotes[voteKey]
                emit('notify', {
                    icon: ['far', 'thumbs-down'],
                    message: `'${props.movieTitle}' 싫어요가 취소되었습니다.`,
                })
            } else {
                downVoted.value = true
                upVoted.value = false
                savedVotes[voteKey] = 'down'
                emit('notify', {
                    icon: ['fas', 'thumbs-down'],
                    message: `'${props.movieTitle}' 영화 평점에 반영되었습니다.`,
                })
            }
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedVotes))
        emit('vote-changed', savedVotes[voteKey] || null)
    }

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
@import '../assets/thumbsbutton.scss';
</style>