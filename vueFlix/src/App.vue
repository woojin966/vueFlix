<template>
  <div class="body_wrap">
    <Header></Header>
    <MoveList></MoveList>
    <Footer></Footer>
  </div>
</template>

<script setup>
  import Header from './components/Header.vue'
  import MoveList from './components/MoveList.vue'
  import Footer from './components/Footer.vue'
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
