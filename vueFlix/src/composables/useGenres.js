import { ref, computed } from "vue";
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n/index.js'
import { getGenres } from "../api/tmdb";
import { genreMap as genreMapKo, genreList as genreListKo } from "../data/genres";

//const currentLang = ref('ko')  // 'ko' or 'en'
const currentLang = ref(i18n.global.locale.value)

const langCode = computed(() =>
  currentLang.value === 'en' ? 'en-US' : 'ko-KR'
)

const genresEn = ref([])
const genresMapEn = ref({})

const genresMapKoRef = ref(genreMapKo)
const genreListKoRef = ref(genreListKo)

async function loadGenresEn() {
  try {
    const res = await getGenres('en')
    genresEn.value = res.data.genres
    genresMapEn.value = Object.fromEntries(
      res.data.genres.map(g => [g.id, g.name])
    )
  } catch (err) {
    console.error("Failed to load English genres:", err)
  }
}

const genresMapActive = computed(() =>
  currentLang.value === 'ko'
    ? genresMapKoRef.value
    : genresMapEn.value
)

function setLang(lang) {
  currentLang.value = lang
  if (lang === 'en' && genresEn.value.length === 0) {
    loadGenresEn()
  }
}

export function useGenres() {
  return {
    currentLang,
    setLang,
    genresMapActive,

    genresMapKo: genresMapKoRef,
    genresMapEn,
    genreListKo: genreListKoRef,

    loadGenresEn,
    genresEn,
  }
}
