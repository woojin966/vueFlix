import { createI18n } from 'vue-i18n'

const messages = {
  ko: {
    search_placeholder: "제목으로 검색",
    no_result: "검색 결과가 없습니다.",
    browse_movies: "영화 둘러보기",
    detail: "상세",
    rating: "평점",
    age: "관람등급",
    search: "검색",
    no_alarm: "알림이 없습니다.",
    notification: {
      liked: "'{title}' 좋아요가 반영되었습니다.",
      disliked: "'{title}' 싫어요가 반영되었습니다.",
      canceled: "'{title}' 평가가 취소되었습니다.",
    },
    alarm_delete : "전체삭제"
  },

  en: {
    search_placeholder: "Search by title",
    no_result: "No results found",
    browse_movies: "Browse Movies",
    detail: "Details",
    rating: "Rating",
    age: "Age",
    search: "Search",
    no_alarm: "No notifications.",
    notification: {
      liked: "'{title}' has been marked as liked.",
      disliked: "'{title}' has been marked as disliked.",
      canceled: "'{title}' rating has been canceled."
    },
    alarm_delete : "Delete All"
  }
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ko',
  fallbackLocale: 'en',
  messages
})
