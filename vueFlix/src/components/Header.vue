<template>
    <article class="header_article">
        <section class="logo_section">
            <a href="javascript:void(0)" class="big bb" @click="closeSearch">VUEFLIX</a>
        </section>
        <section class="searchbar_btn_section">
            <div class="searchbar_box">
                <!-- $event : SearchBar.vue에서 emit('update:keyword', keyword.value)로 보낸 값 - 입력한 키워드 -->
                <SearchBar v-if="showSearch" @close="showSearch = false" @update:keyword="$emit('update:keyword', $event)" ref="searchBarRef"></SearchBar>
                <button v-if="showSearch" @click="closeSearch" class="search_close_btn">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
                <button v-else @click="showSearch=true" type="button" class="search_btn">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </button>
            </div>
            <div class="header_btn_box">
                <button @click="toggleAlarm" type="button" :class="['alarm_btn', {'has_alarm' : notifications.length !== 0}]">
                    <font-awesome-icon :icon="['far', 'bell']" />
                </button>
                <div v-if="showAlarm" class="alarm_box popup">
                    <ul>
                        <li v-if="notifications.length === 0" class="no_alarm">알림이 없습니다.</li>
                        <li v-else v-for="(notice, index) in notifications" :key="index">
                            <font-awesome-icon :icon="notice.icon" /> 
                            <p class="text n">{{ notice.message }}</p>
                        </li>
                    </ul>
                    <button v-if="notifications.length !== 0" class="text reset_btn" @click="clearNotifications">알림 전체 삭제</button>
                </div>
                <button @click="toggleProfile" type="button" class="profile_btn">
                    <font-awesome-icon :icon="['far', 'user']" />
                </button>
                <div v-if="showProfile" class="profile_box popup">
                    <ul>
                        <li>
                            <a href="javascript:void(0)">프로필 관리</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">계정</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">고객센터</a>
                        </li>
                    </ul>
                    <button type="button" class="logout_btn">로그아웃</button>
                </div>
            </div>
        </section>
    </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchBar from './SearchBar.vue'

// 검색창 관련
const showSearch = ref(false)
const searchBarRef = ref(null)

// 검색 닫기
const closeSearch = () => {
  showSearch.value = false
  if (searchBarRef.value?.clearInput) {
    searchBarRef.value.clearInput()
  }
  emit('update:keyword', '')
}

// 알림 관련
const STORAGE_KEY = 'vueflix-notifications'
const notifications = ref([])
const showAlarm = ref(false)


const toggleAlarm = () => {
  showAlarm.value = !showAlarm.value
  showProfile.value = false
}

const addNotification = (notice) => {
  notifications.value.unshift(notice)
  showAlarm.value = true
  saveToStorage()
}

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications.value))
}

const clearNotifications = () => {
  notifications.value = []
  localStorage.removeItem(STORAGE_KEY)
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    notifications.value = JSON.parse(saved)
  }
})

defineExpose({ addNotification })

// 프로필 박스 관련
const showProfile = ref(false)
const toggleProfile = () => {
  showProfile.value = !showProfile.value
  showAlarm.value = false
}

// emit 선언
const emit = defineEmits(['update:keyword', 'clear-votes'])
</script>

<style scoped lang="scss">
@import '../assets/header.scss';
</style>