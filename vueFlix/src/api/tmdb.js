// src/api/tmdb.js
import axios from 'axios'

const apiKey = 'fcc17cdaa94f35e5e1cf80b2de9ea4e7'

export const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
    language: 'ko-KR',  // 기본 한국어
  }
})

// 기본 API 함수들
export function getPopularMovies(page = 1) {
  return client.get('/movie/popular', { params: { page } })
}

export function getNowPlaying(page = 1) {
  return client.get('/movie/now_playing', { params: { page } })
}

export function getUpcomingMovies(page = 1) {
  return client.get('/movie/upcoming', { params: { page } })
}

export function getTopRatedMovies(page = 1) {
  return client.get('/movie/top_rated', { params: { page } })
}

export function searchMovies(query, page = 1) {
  return client.get('/search/movie', {
    params: { query, page },
  })
}

export function getGenres() {
  return client.get('/genre/movie/list', {
    params: {
      language: 'en-US',   
    },
  });
}

export function fetchByEndpoint(endpoint) {
  return client.get(endpoint)
}
