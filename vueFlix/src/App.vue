<template>
  <div class="body_wrap">
    <Header 
      ref="headerRef" 
      @update:keyword="keyword = $event"  
      v-model:keyword="keyword">
    </Header>
    <MainBanner></MainBanner>
    <SearchResults 
      v-if="keyword" 
      :keyword="keyword" 
    />
    <MoveList 
      v-else 
      :keyword="keyword" 
      :genreMap="genreMap"
      :genreList="genreList"
      @notify="handleNotify"
      @open-modal="handleOpenModal"  
    >
    </MoveList>
    <Footer></Footer>
    <MovieModal 
      v-if="showModal"
      :movie="selectedMovie"
      :genres="genreMap"
      @close="handleCloseModal"
      @notify="handleNotify"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Header from './components/Header.vue'
  import MainBanner from './components/MainBanner.vue'
  import SearchResults from './components/SearchResults.vue'
  import MoveList from './components/MoveList.vue'
  import MovieModal from './components/MovieModal.vue'
  import Footer from './components/Footer.vue'
  import { genreMap, genreList } from './data/genres'

  const keyword = ref('')
  const headerRef = ref(null)
  const selectedMovie = ref(null)
  const showModal = ref(false)  

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
</script>

<style scoped>

</style>
