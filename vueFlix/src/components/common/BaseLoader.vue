<template>
  <div class="loader">
    <div class="spinner"></div>
    <p class="loader_text">LOADING...</p>
  </div>
</template>

<style scoped>
.loader {
  padding: 24px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 8px;
  margin: 16px 0;
}

.spinner {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  margin: 0 auto 8px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loader_text {
  letter-spacing: 0.08em;
}
</style>
