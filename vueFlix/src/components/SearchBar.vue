<template>
    <article class="searchbar_article">
        <div>
            <input type="text" placeholder="제목으로 검색" v-model="keyword" @input="onInput" />
            <div>
                <button @click="clearInput" class="search_close_btn">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
        <button @click="onInput">검색</button>
            </div>
        </div>
            
             

        
        
    </article>
    
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['update:keyword'])
const keyword = ref('')

// 입력 시 search keyword 업데이트
const onInput = () => {
  emit('update:keyword', keyword.value)
}

// 닫기 버튼 → 입력창 비우고 부모에게도 비우라고 알림
const clearInput = () => {
  keyword.value = ''
  emit('update:keyword', '')   
}

defineExpose({ clearInput })
</script>


<style scoped lang="scss">
@import '../assets/searchbar.scss';
</style>