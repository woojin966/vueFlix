<template>
  <article class="header_article">
    <section class="logo_section">
      <a href="javascript:void(0)" class="logo_btn" @click="handleLogoClick">
        <img src="../data/vueflix.svg" alt="logo">
      </a>
    </section>

    <section class="searchbar_btn_section">
      <div class="header_btn_box">
        <button
          @click="toggleAlarm"
          type="button"
          :class="['alarm_btn', {'has_alarm' : notifications.length !== 0}]"
        >
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
          <button
            v-if="notifications.length !== 0"
            class="text reset_btn"
            @click="clearNotifications"
          >
            알림 전체 삭제
          </button>
        </div>

        <button @click="toggleProfile" type="button" class="profile_btn">
          <font-awesome-icon :icon="['far', 'user']" />
        </button>

        <div v-if="showProfile" class="profile_box popup">
          <ul>
            <li><a href="javascript:void(0)">프로필 관리</a></li>
            <li><a href="javascript:void(0)">계정</a></li>
            <li><a href="javascript:void(0)">고객센터</a></li>
          </ul>
          <button type="button" class="logout_btn">로그아웃</button>
        </div>

        <div class="lang_btn_box">
          <button 
            type="button" 
            @click="setKorean"
            :class="{ active: currentLang === 'ko' }"
          >
            KR
          </button>
          <button 
            type="button" 
            @click="setEnglish"
            :class="{ active: currentLang === 'en' }"
          >
            EN
          </button>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGenres } from '../composables/useGenres'

// 🔥 emit 먼저
const emit = defineEmits(['update:keyword', 'clear-votes'])

// 장르, 언어변환
const { currentLang, setLang } = useGenres()
const setKorean = () => setLang('ko')
const setEnglish = () => setLang('en')

// 로고 클릭 시 검색어 초기화
const handleLogoClick = () => {
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
</script>

<style scoped lang="scss">
@import '../assets/header.scss';
</style>
