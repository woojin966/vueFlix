// src/composables/useVotes.js
import { ref } from 'vue'

const STORAGE_KEY = 'vueflix-votes'
const votes = ref({})   // { 'movie-123': 'up' }

function loadVotes() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  votes.value = saved
}

function setVote(movieId, vote) {
  const key = `movie-${movieId}`

  // 🔥 새 객체로 만들어 재할당 (반응형 유지)
  const updated = { ...votes.value }

  if (vote) {
    updated[key] = vote
  } else {
    delete updated[key]
  }

  votes.value = updated
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

function getVote(movieId) {
  const key = `movie-${movieId}`
  return votes.value[key] || null
}

// 🔥 전체 초기화 (알림 전체 삭제용)
function resetVotes() {
  votes.value = {}
  localStorage.removeItem(STORAGE_KEY)
}

loadVotes()

export function useVotes() {
  return {
    votes,
    getVote,
    setVote,
    resetVotes,
  }
}
