<template>
    <article 
        class="movie_modal_article"
        @click="handleOverlayClick"
        >
        <div>
            <button class="close_btn" @click="$emit('close')">
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </button>
            <div class="modal_content_wrap">
                <section class="modal_poster_section">
                    <img :src="posterUrl" :alt="movie.title" />
                </section>
                <section class="modal_info_section">
                    <h3 class="sb">{{ movie.title }}</h3>
                    <div class="movie_info_box1">
                        <p class="medium bb age_grade" :class="`age-${displayRating}`">{{ displayRating  }}</p>
                        <ThumbsButton 
                            :movie-id="movie.id"
                            :movie-title="movie.title"
                            @notify="$emit('notify', $event)"
                        />
                    </div>
                    <div class="movie_info_box2">
                        <p class="medium mb">⭐ {{ movie.vote_average }}</p>
                        <p class="medium mb">{{ genreNames.join(', ') }} | {{ releaseYear }}</p>
                    </div>
                </section>
                <section class="movie_description_section">
                    <p class="text n">{{ movie.overview || '설명이 없습니다.' }}</p>
                </section>
            </div>
        </div>
    </article>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted } from 'vue'
    import ThumbsButton from './ThumbsButton.vue';

    const props = defineProps({
        movie: Object,
        genres: Object,
    })
    const emit = defineEmits(['close', 'notify'])

    const krRelease = ref('')

    const fetchRating = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${props.movie.id}/release_dates?api_key=fcc17cdaa94f35e5e1cf80b2de9ea4e7`
    )
    const data = await res.json()
    const krData = data.results.find(r => r.iso_3166_1 === 'KR')
    const release = krData?.release_dates.find(r => r.certification)
    krRelease.value = release?.certification?.trim() || ''
  } catch (err) {
    krRelease.value = ''
  }
}

// 실제 보여줄 관람등급 텍스트
const displayRating = computed(() => {
  const value = krRelease.value.toUpperCase()

  if (!value || value === '미정' || value === '정보 없음') return 'NR'
  if (value === 'ALL' || value === '전체관람가') return 'All'
  return value
})

    const genreNames = props.movie.genre_ids
    ? props.movie.genre_ids.map(id => props.genres[id] || '기타')
    : []
    const releaseYear = props.movie.release_date
    ? props.movie.release_date.slice(0, 4)
    : '정보 없음'

    const posterUrl = computed(() => 
        props.movie?.poster_path 
        ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}` 
        : ''
    )

    const handleOverlayClick = (e) => {
        // 바깥쪽 클릭 시 닫기
        if (e.target.classList.contains('movie_modal_article')) {
            emit('close')
        }
    }
    const onEsc = (e) => {
        if (e.key === 'Escape') emit('close')
    }
    onMounted(() => {
        window.addEventListener('keydown', onEsc)
        fetchRating()
    })
    onUnmounted(() => {
        window.removeEventListener('keydown', onEsc)
    })
</script>

<style scoped lang="scss">
@import '../assets/moviemodal.scss';
</style>