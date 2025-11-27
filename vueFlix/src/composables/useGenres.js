// src/composables/useGenres.js
import { ref, computed } from "vue";
import { getGenres } from "../api/tmdb";
import { genreMap as genreMapKo, genreList as genreListKo } from "../data/genres";

// TMDB에서 가져올 영어 장르
const genresEn = ref([]);
const genresMapEn = ref({});

// 한글 장르 (로컬 데이터)
const genresMapKoRef = ref(genreMapKo);
const genreListKoRef = ref(genreListKo);

// 현재 언어 상태
const currentLang = ref('ko'); // 'ko' or 'en'

// 영어 장르 로딩
async function loadGenresEn() {
  try {
    const res = await getGenres();
    genresEn.value = res.data.genres;
    genresMapEn.value = Object.fromEntries(
      res.data.genres.map(g => [g.id, g.name])
    );
  } catch (err) {
    console.error("Failed to load English genres:", err);
  }
}

// 현재 언어에 따라 쓸 장르 map
const genresMapActive = computed(() => {
  return currentLang.value === 'ko'
    ? genresMapKoRef.value
    : genresMapEn.value;
});

// 언어 변경 함수
function setLang(lang) {
  currentLang.value = lang;
}

export function useGenres() {
  return {
    genresMapActive,
    currentLang,
    setLang,

    // 🔥 MoveList용 장르 리스트
    genreListKo: genreListKoRef,
    genresMapKo: genresMapKoRef,
    genresMapEn,

    loadGenresEn,
  };
}
