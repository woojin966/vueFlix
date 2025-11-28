<template>
    <div class="thumbs">
        <button type="button" class="text thumbs_btn up" :class="{'voted' : upVoted}" @click.stop="handleClick('up')">
            <font-awesome-icon :icon="upVoted ? ['fas', 'thumbs-up'] : ['far', 'thumbs-up']" />
        </button>
        <button type="button" class="text thumbs_btn down" :class="{'voted' : downVoted}" @click.stop="handleClick('down')">
            <font-awesome-icon :icon="downVoted ? ['fas', 'thumbs-down'] : ['far', 'thumbs-down']" />
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useVotes } from '../composables/useVotes'

const props = defineProps({
  movieId: Number,
  movieTitle: String,
})

const { getVote, setVote } = useVotes()

// upVoted / downVoted를 computed로!
const upVoted = computed(() => getVote(props.movieId) === 'up')
const downVoted = computed(() => getVote(props.movieId) === 'down')

const emit = defineEmits(['notify'])

const handleClick = (type) => {
  let newVote = null

  if (type === 'up') {
    newVote = upVoted.value ? null : 'up'
  } else {
    newVote = downVoted.value ? null : 'down'
  }

  setVote(props.movieId, newVote)

  // 알림
  emit('notify', {
    icon: newVote === 'up' ? ['fas', 'thumbs-up'] :
          newVote === 'down' ? ['fas', 'thumbs-down'] :
          type === 'up' ? ['far', 'thumbs-up'] : ['far', 'thumbs-down'],
    message:
      newVote === 'up'
        ? `'${props.movieTitle}' 좋아요가 반영되었습니다.`
        : newVote === 'down'
        ? `'${props.movieTitle}' 싫어요가 반영되었습니다.`
        : `'${props.movieTitle}' 평가가 취소되었습니다.'`
  })
}
</script>

<style scoped lang="scss">
@import '../assets/thumbsbutton.scss';
</style>