<template>
    <article class="header_article">
        <section class="logo_section">
            <a href="javascript:void(0)" class="big bb">VUEFLIX</a>
        </section>
        <section class="searchbar_btn_section">
            <div class="searchbar_box">
                <!-- $event : SearchBar.vue에서 emit('update:keyword', keyword.value)로 보낸 값 - 입력한 키워드 -->
                <SearchBar v-if="showSearch" @close="showSearch = false" @update:keyword="$emit('update:keyword', $event)"></SearchBar>
                <button v-if="showSearch" @click="showSearch=false" class="search_close_btn">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
                <button v-else @click="showSearch=true" type="button" class="search_btn">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </button>
            </div>
            <div class="header_btn_box">
                <button @click="toggleAlarm" type="button" class="alarm_btn">
                    <font-awesome-icon :icon="['far', 'bell']" />
                </button>
                <div v-if="showAlarm" class="alarm_box popup">
                    <ul>
                        <li v-if="notifications.length === 0" class="no_alarm">알림이 없습니다.</li>
                        <li v-else v-for="(notice, index) in notifications" :key="index">{{ notice }}</li>
                    </ul>
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
    import { ref } from 'vue'
    import SearchBar from './SearchBar.vue'

    // 검색바 보이기
    // ref() : 반응현 변수 -> 값이 바뀌면 dom도 자동으로 바뀌게 함
    const showSearch = ref(false)

    // 알람박스 보이기
    const showAlarm = ref(false)
    const notifications = ref([]) // or ['알림1', '알림2'] == notice 등
    const toggleAlarm = () => {
        showAlarm.value = !showAlarm.value
        showProfile.value = false
    }

    // 프로필 박스 보이기
    const showProfile = ref(false)
    const toggleProfile = () => {
        showProfile.value = !showProfile.value
        showAlarm.value = false
    }

    // app.vue로 검색 키워드 보내기
    const emit = defineEmits(['update:keyword'])
</script>

<style scoped lang="scss">
@import '../assets/header.scss';
</style>