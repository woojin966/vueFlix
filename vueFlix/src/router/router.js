import { createRouter, createWebHistory } from 'vue-router'
// 📌 SearchResults 컴포넌트는 지연 로딩 방식으로 등록할 거야

const routes = [
  {
    path: '/search',             // ✅ 여기 추가!
    name: 'SearchResults',
    component: () => import('../components/SearchResults.vue'),
  },
  // ...다른 라우트들도 여기에
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router