// src/composables/useVotes.js
import { ref } from 'vue'

const STORAGE_KEY = 'vueflix-votes'
const votes = ref({}) // { 'movie-123': 'up' }

function loadVotes() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  votes.value = saved
}

function setVote(movieId, vote) {
  const key = `movie-${movieId}`
  if (vote) {
    votes.value[key] = vote
  } else {
    delete votes.value[key]
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes.value))
}

function getVote(movieId) {
  const key = `movie-${movieId}`
  return votes.value[key] || null
}

loadVotes()

export function useVotes() {
  return {
    votes,
    getVote,
    setVote
  }
}
