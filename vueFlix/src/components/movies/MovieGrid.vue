<template>
  <div class="movie_grid fade_grid">
    <MovieItem
      v-for="movie in items"
      :key="movie.id"
      :movie="movie"
      :genresMap="genresMap"
      :keyword="keyword"
      @open-modal="$emit('open-modal', $event)"
    />
  </div>
</template>

<script setup>
import MovieItem from '../MovieItem.vue'

const props = defineProps({
  items: Array,
  genresMap: Object,
  keyword: String
})

const emit = defineEmits(['open-modal'])
</script>

<style scoped lang="scss">
@import '../../assets/moviegrid.scss';
</style>
