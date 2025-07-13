<template>
    <article class="searchbar_article">
        <!-- 
            v-model="keyword" : 인풋에 입력하면 자동으로 keyword값에 반영 -> 로컬 상태에 값을 자동으로 반영 - SearchBar.vue 내에서
            @input="onInput" : 입력이 발생할때마다 onInput함수 발동. @input은 input 이벤트리스너(== addEventListener('input', ...)) -> 인풋에 입력이벤트가 발생할때 특정 함수 실행
        -->
        <input type="text" placeholder="제목으로 검색" v-model="keyword" @input="onInput" />
        <button @click="onInput">검색</button> 
    </article>
</template>

<script setup>
    import { ref } from 'vue'
    const emit = defineEmits(['update:keyword'])
    const keyword = ref('')

    const onInput = () => {
        // 부모 컴포넌트로 이벤트 전송 : update:propName - V-model 커스텀 연동
        emit('update:keyword', keyword.value)
    }

    // 닫기 버튼 누르면 검색창 비우기
    defineExpose({
        clearInput: () => {
            keyword.value = ''
        }
    })
</script>

<style scoped lang="scss">
@import '../assets/searchbar.scss';
</style>