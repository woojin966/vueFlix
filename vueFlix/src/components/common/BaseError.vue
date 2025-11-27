<template>
  <div class="error_box">
    <p class="error_title">ERROR</p>
    <p class="error_message">{{ message }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    default: '오류가 발생했습니다.'
  }
})
</script>

<style scoped>
.error_box {
  padding: 20px;
  margin: 16px 0;
  background: rgba(255, 80, 80, 0.1);
  border: 1px solid rgba(255, 80, 80, 0.6);
  color: #ff5050;
  border-radius: 8px;
  text-align: center;
}
.error_title {
  font-weight: 700;
  margin-bottom: 4px;
}
.error_message {
  font-size: 14px;
}
</style>
