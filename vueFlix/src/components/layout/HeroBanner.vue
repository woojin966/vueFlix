<template>
  <section class="hero_banner">
    <div class="hero_content">
      <h1 class="title b">vueFlix</h1>
      <p class="subtitle big">Browse popular movies with TMDB API</p>

      <div class="searchbar_box">
        <slot name="search"></slot>
      </div>
      <!-- <div class="">
        <SearchBar v-if="showSearch" @close="showSearch = false" @update:keyword="$emit('update:keyword', $event)" ref="searchBarRef"></SearchBar>
            <button v-if="showSearch" @click="closeSearch" class="search_close_btn">
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </button>
            <button v-else @click="showSearch=true" type="button" class="search_btn">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </button>
        </div> -->

      <button class="cta_btn" @click="$emit('scroll-list')">
        Browse Movies
      </button>
    </div>

    <div class="overlay"></div>
  </section>
</template>

<style scoped lang="scss">
    @import '../../assts/herabanner.scss';
</style>
