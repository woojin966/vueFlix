import { createI18n } from 'vue-i18n'

const getDefaultLocale = () => {
  const lang = navigator.language || navigator.userLanguage
  return lang.startsWith('ko') ? 'ko' : 'en'
}

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
    alarm_delete : "전체삭제",
    footer: {
      audio_desc: "화면 해설",
      help_center: "고객 센터",
      gift_card: "기프트카드",
      media_center: "미디어 센터",
      investor_relations: "투자 정보(IR)",
      jobs: "입사 정보",
      terms: "이용 약관",
      privacy: "개인정보",
      legal_notices: "법적 고지",
      cookie_pref: "쿠키 설정",
      corporate_info: "회사 정보",
      contact_us: "문의하기"
    },
    footer_bottom: {
        service_code: "서비스 코드",
        company_name: "뷰플릭스서비시스코리아 유한회사",
        business_number: "통신판매업신고번호 : 제0000-서울양천-0000호",
        phone: "전화번호 : 00-000-000-0000(수신자 부담)",
        ceo: "대표 : 예지킴",
        email: "이메일 : woojin_966&#64;naver.com",
        address: "주소 : 00000, 대한민국 서울특별시 양천구 &#64;&#64;로 nn",
        register_number: "사업자등록번호 : 000-00-00000",
        hosting: "클라우드 호스팅 : Amazon Web Services Inc.",
        ftc: "공정거래위원회 웹사이트",
      }
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
    alarm_delete : "Delete All",
    footer: {
      audio_desc: "Audio Description",
      help_center: "Help Center",
      gift_card: "Gift Cards",
      media_center: "Media Center",
      investor_relations: "Investor Relations",
      jobs: "Jobs",
      terms: "Terms of Use",
      privacy: "Privacy",
      legal_notices: "Legal Notices",
      cookie_pref: "Cookie Preferences",
      corporate_info: "Corporate Information",
      contact_us: "Contact Us"
    },
    footer_bottom: {
        service_code: "Service Code",
        company_name: "VueFlix Services Korea LLC",
        business_number: "Mail-Order Business Registration No.: 0000-Seoul Yangcheon-0000",
        phone: "Phone: 00-000-000-0000 (Toll-Free)",
        ceo: "Representative: Yeji Kim",
        email: "Email: woojin_966&#64;naver.com",
        address: "Address: &#64;&#64;-ro nn, Yangcheon-gu, Seoul, Republic of Korea (00000)",
        register_number: "Business Registration No.: 000-00-00000",
        hosting: "Cloud Hosting: Amazon Web Services, Inc.",
        ftc: "Fair Trade Commission Website",
      }
  }
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages
})

console.log('i18n locale on start:', i18n.global.locale.value)
