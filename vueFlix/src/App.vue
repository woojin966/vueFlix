<template>
  <div class="body_wrap">
    <!-- $event : Header.vue에서 @update:keyword="$emit('update:keyword', $event)"로 보낸 값 - 입력한 키워드,을 keyword에 할당 -->
    <Header @update:keyword="keyword = $event"></Header>
    <SearchResults v-if="keyword" :keyword="keyword" />
    <!-- Header에서 받아 할당한 keyword를 MoveList로 props보냄 -->
    <MoveList v-else :keyword="keyword"></MoveList>
    <Footer></Footer>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Header from './components/Header.vue'
  import SearchResults from './components/SearchResults.vue'
  import MoveList from './components/MoveList.vue'
  import Footer from './components/Footer.vue'

  const keyword = ref('')
</script>

<style scoped>

</style>
