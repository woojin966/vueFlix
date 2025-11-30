// src/api/tmdb.js
import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const client = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export function getLanguageParam(lang = 'ko') {
  return lang === 'en' ? 'en-US' : 'ko-KR'
}

export function get(url, params = {}, lang = 'ko') {
  return client.get(url, {
    params: {
      api_key: API_KEY,
      language: getLanguageParam(lang),
      ...params,
    },
  })
}

export const getPopularMovies = (lang) => get('/movie/popular', {}, lang)
export const getUpcomingMovies = (lang) => get('/movie/upcoming', {}, lang)
export const getTopRatedMovies = (lang) => get('/movie/top_rated', {}, lang)
export const getNowPlaying = (lang) => get('/movie/now_playing', {}, lang)

export const fetchByEndpoint = (endpoint, lang) => get(endpoint, {}, lang)

export const searchMovies = (query, page = 1, lang) =>
  get('/search/movie', { query, page }, lang)

export const getGenres = (lang) =>
  get('/genre/movie/list', {}, lang)
