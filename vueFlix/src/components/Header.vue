<template>
    <article class="header_wrap">
        <div class="logo_box">
            <a href="javascript:void(0)" class="big bb">VUEFLIX</a>
        </div>
        <div>
            <div class="searchbar_box">
                <button @click="toggleSearch" type="button" class="search_btn">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </button>
                <SearchBar v-if="showSearch" @close="showSearch = false"></SearchBar>
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
        </div>
    </article>
</template>

<script setup>
    import { ref } from 'vue'
    import SearchBar from './SearchBar.vue'

    // 검색바 보이기
    // ref() : 반응현 변수 -> 값이 바뀌면 dom도 자동으로 바뀌게 함
    const showSearch = ref(false)
    const toggleSearch = () => {
        // toggleSearch 호출시 showSearch.value 값을 반대로 바꿈 : true or false
        showSearch.value = !showSearch.value
    }

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
</script>

<style scoped lang="scss">
@import '../assets/header.scss';
</style>