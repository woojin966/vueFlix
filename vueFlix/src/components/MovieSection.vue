<template>
    <section class="movie_section">
        <h3 class="sb">{{  title  }}</h3>
        <Swiper 
            :modules="[Navigation]"
            :navigation="navigationOptions"
            :breakpoints="swiperBreakpoints"
            class="movie-swiper"
            :class="{ 'highlight-popular': props.endpoint === '/movie/popular' }"
            ref="swiperRef"
        >
            <SwiperSlide v-for="movie in movies.slice(0, limit)" :key="movie.id">
                <MovieItem
                    :movie="movie"
                    :genres="genreMap"
                ></MovieItem>
            </SwiperSlide>
        </Swiper >
        <div :class="`${uniqueId}-prev swiper-button-prev`"></div>
        <div :class="`${uniqueId}-next swiper-button-next`"></div>
    </section>
</template>

<script setup>
    import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
    import axios from 'axios'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import { Navigation } from 'swiper/modules'
    import 'swiper/css'
    import 'swiper/css/navigation'
    import MovieItem from './MovieItem.vue'

    const props = defineProps({
        title: String,
        endpoint: String,
        genreMap: Object,
        limit: {
            type: Number,
            default: 20 // 기본은 20개로 설정
        }
    })

    const movies = ref([])
    const swiperRef = ref(null)
    const uniqueId = `swiper-${Math.random().toString(36).substr(2, 9)}`
    const centeredSlides = ref(false)
    const updateCenteredSlides = () => {
        centeredSlides.value = window.innerWidth >= 480
    }

    const navigationOptions = {
        nextEl: `.${uniqueId}-next`,
        prevEl: `.${uniqueId}-prev`
    }
    const swiperBreakpoints = {
  // 0~479px
  0: {
    slidesPerView: 1.2,
    centeredSlides: true,
    centeredSlidesBounds: true,
    loop: true,
    spaceBetween: 20,
  },
  // 480px 이상
  480: {
    slidesPerView: 3,
    centeredSlides: false,
    centeredSlidesBounds: true,
    loop: false,
    spaceBetween: 20,
  },
  840: {
    slidesPerView: 3,
    centeredSlides: false,
    centeredSlidesBounds: true,
    loop: false,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 4,
    centeredSlides: false,
    centeredSlidesBounds: true,
    loop: false,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 5,
    centeredSlides: false,
    centeredSlidesBounds: true,
    loop: false,
    spaceBetween: 20,
  },
}
    onMounted(async () => {
  // 영화 데이터 가져오기
  const res = await axios.get(`https://api.themoviedb.org/3${props.endpoint}`, {
    params: {
      api_key: 'fcc17cdaa94f35e5e1cf80b2de9ea4e7',
      language: 'ko-KR',
    }
  })
  movies.value = res.data.results

  // Swiper 네비게이션 초기화
  await nextTick()
  if (swiperRef.value?.swiper) {
    swiperRef.value.swiper.navigation.init()
    swiperRef.value.swiper.navigation.update()
  }

  // centeredSlides 반영
  updateCenteredSlides()
  window.addEventListener('resize', updateCenteredSlides)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCenteredSlides)
})
</script>