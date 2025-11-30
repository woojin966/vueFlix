<template>
  <article class="header_article">
    <section class="logo_section">
      <a href="javascript:void(0)" class="logo_btn" @click="closeSearch">
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
            <li v-if="notifications.length === 0" class="no_alarm">{{ t('no_alarm') }}</li>
            <li v-else v-for="(notice, index) in notifications" :key="index">
              <font-awesome-icon :icon="notice.icon" /> 
              <p class="text n">{{ t(notice.messageKey, notice.params) }}</p>

            </li>
          </ul>
          <button
            v-if="notifications.length !== 0"
            class="text reset_btn"
            @click="clearNotifications"
          >
            {{ t("alarm_delete") }}
          </button>
        </div>

        <button @click="toggleProfile" type="button" class="profile_btn">
          <font-awesome-icon :icon="['far', 'user']" />
        </button>

        <!-- <div v-if="showProfile" class="profile_box popup">
          <ul>
            <li><a href="javascript:void(0)">프로필 관리</a></li>
            <li><a href="javascript:void(0)">계정</a></li>
            <li><a href="javascript:void(0)">고객센터</a></li>
          </ul>
          <button type="button" class="logout_btn">로그아웃</button>
        </div> -->

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
import { ref, onMounted, inject } from 'vue'
import { useGenres } from '../composables/useGenres'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n/index.js'
import { useVotes } from '../composables/useVotes'

const { resetVotes } = useVotes()

// 🔥 i18n 글로벌 사용
const { t } = useI18n({ useScope: 'global' })

// 🔥 부모(MainBanner)에서 inject
const bannerRef = inject('bannerRef')

// 🔥 emit
const emit = defineEmits(['update:keyword', 'clear-votes'])

// 🔥 영화(API) 언어
const { currentLang, setLang } = useGenres()

// ⭐ 언어 전환 — 영화언어 + UI언어 둘 다 적용
function setEnglish() {
  setLang('en')                      // TMDB 영화 데이터 언어
  i18n.global.locale.value = 'en'    // UI 텍스트 언어
}

function setKorean() {
  setLang('ko')
  i18n.global.locale.value = 'ko'
}

// 🔥 알림 기능
const STORAGE_KEY = 'vueflix-notifications'
const notifications = ref([])
const showAlarm = ref(false)

const toggleAlarm = () => {
  showAlarm.value = !showAlarm.value
  showProfile.value = false
}

const addNotification = (notice) => {
  // notice는 { icon, messageKey } 형태로 전달됨
  notifications.value.unshift(notice)
  showAlarm.value = true
  saveToStorage()
}

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications.value))
}

const clearNotifications = () => {
  // 알림 제거
  notifications.value = []
  localStorage.removeItem(STORAGE_KEY)

  // 👍 좋아요/싫어요 전체 초기화
  resetVotes()
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    notifications.value = JSON.parse(saved)
  }
})

// 🔥 외부에서 addNotification 호출 가능하도록 expose
defineExpose({ addNotification })

// 🔥 프로필 박스
const showProfile = ref(false)
const toggleProfile = () => {
  showProfile.value = !showProfile.value
  showAlarm.value = false
}

// 🔥 검색 닫기
const showSearch = ref(false)
const searchBarRef = ref(null)

const closeSearch = () => {
  showSearch.value = false
  bannerRef.value?.resetSearch()

  if (searchBarRef.value?.clearInput) {
    searchBarRef.value.clearInput()
  }

  emit('update:keyword', '')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>


<style scoped lang="scss">
@import '../assets/header.scss';
</style>
