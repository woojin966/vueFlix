<template>
    <article class="searchbar_article">
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