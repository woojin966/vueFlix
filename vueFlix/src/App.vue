<template>
  <div class="body_wrap">
    <Header 
      ref="headerRef" 
      @update:keyword="keyword = $event"  
      @clear-votes="resetAllVotes"
      v-model:keyword="keyword">
    </Header>
    <MainBanner 
      :active="keyword !== ''"
      :currentLang="currentLang"
      @update:keyword="keyword = $event"
      ref="bannerRef"  
    ></MainBanner>
    <SearchResults 
      v-if="keyword" 
      :keyword="keyword" 
      @open-modal="handleOpenModal"
    />
    <MoveList 
      v-else 
      :keyword="keyword" 
      :genreMap="genresMapActive"
      :genreList="genres"
      :currentLang="currentLang"
      @notify="handleNotify"
      @open-modal="handleOpenModal"  
    >
    </MoveList>
    <Footer></Footer>
    <MovieModal 
      v-if="showModal"
      :movie="selectedMovie"
      :genres="genresMapActive"
      
      @close="handleCloseModal"
      @notify="handleNotify"
    />
  </div>
</template>

<script setup>
  import { ref, provide  } from 'vue'
  import Header from './components/Header.vue'
  import MainBanner from './components/MainBanner.vue'
  import SearchResults from './components/SearchResults.vue'
  import MoveList from './components/MoveList.vue'
  import MovieModal from './components/MovieModal.vue'
  import Footer from './components/Footer.vue'
import { useGenres } from './composables/useGenres'

  const { genresMapActive, genresMapKo, genresMapEn } = useGenres()

  const keyword = ref('')
  const headerRef = ref(null)
  const selectedMovie = ref(null)
  const showModal = ref(false)  
  const bannerRef = ref(null)

  provide('bannerRef', bannerRef)

  const handleNotify = (notice) => {
    headerRef.value?.addNotification(notice)
  }
  
  const handleOpenModal = (movie) => {
    selectedMovie.value = movie
    showModal.value = true
    document.body.style.overflow = 'hidden' 
  } 
  const handleCloseModal = () => {
    showModal.value = false
    selectedMovie.value = null
    document.body.style.overflow = '' 
  }
  const resetAllVotes = () => {

}
</script>

<style scoped>

</style>
