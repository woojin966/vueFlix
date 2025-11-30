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

const { votes, getVote, setVote } = useVotes()

// 🔥 전역 votes를 그대로 본다 (로컬 ref ❌)
const voteState = computed(() => {
  votes.value        // 의존성 추적
  return getVote(props.movieId)
})

const upVoted = computed(() => voteState.value === 'up')
const downVoted = computed(() => voteState.value === 'down')

const emit = defineEmits(['notify'])

const handleClick = (type) => {
  let newVote = null

  if (type === 'up') {
    newVote = upVoted.value ? null : 'up'
  } else {
    newVote = downVoted.value ? null : 'down'
  }

  // 🔥 중앙 스토어 업데이트 → 모든 컴포넌트에 즉시 반영
  setVote(props.movieId, newVote)

  emit('notify', {
    icon:
      newVote === 'up'
        ? ['fas', 'thumbs-up']
        : newVote === 'down'
        ? ['fas', 'thumbs-down']
        : type === 'up'
        ? ['far', 'thumbs-up']
        : ['far', 'thumbs-down'],

    messageKey:
      newVote === 'up'
        ? "notification.liked"
        : newVote === 'down'
        ? "notification.disliked"
        : "notification.canceled",

    params: { title: props.movieTitle }
  })
}
</script>



<style scoped lang="scss">
@import '../assets/thumbsbutton.scss';
</style>