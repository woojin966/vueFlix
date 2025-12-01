# 🎬 VueFlix — Vue.js Movie Browsing App

_A Netflix-Inspired Movie Discovery App built with Vue 3 + TMDB API_

![VueFlix Banner](public/vueflix_en.png)

<h1 align="center">🎬 VueFlix — Vue.js Movie Browsing App</h1>
<p align="center">
  Smooth, modern movie browsing built with Vue 3, TMDB API, and Vue I18n.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.4.0-42b883?logo=vue.js" />
  <img src="https://img.shields.io/badge/Vite-5.0-646cff?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TMDB-API-01d277?logo=themoviedatabase&logoColor=white" />
  <img src="https://img.shields.io/badge/SPA-Vue_Router-4f74ff" />
  <img src="https://img.shields.io/badge/Language-KR%20%7C%20EN-blue" />
  <img src="https://img.shields.io/badge/Styles-SCSS-ff69b4" />
</p>

---

## ⭐ Overview (EN)

VueFlix is a polished, Netflix-inspired movie browsing SPA built using **Vue 3**, **Vite**, **TMDB API**, and **Vue I18n** for full multilingual support.

It includes:

- Real-time search
- Genre browsing
- Hero banner with autoplay
- Movie modal with details
- Like/Dislike system (synced across all views)
- Notification center
- Fully responsive UI (PC, tablet, mobile)

---

## 📸 Screenshots

### 🌐 English UI

![VueFlix English UI](public/vueflix_en.png)

### 🇰🇷 Korean UI

![VueFlix Korean UI](public/vueflix_ko.png)

### 🖥 Full Desktop Screen

![VueFlix Full PC](public/vueflix_full_pc.png)

### 📱 Mobile Screen

<img src="public/vueflix_full_mo.png" width="320" />

### 🔔 Notification (Alarm)

![VueFlix Alarm](public/vueflix_alarm.png)

### 🎞 Movie Modal

![VueFlix Modal](public/vuflix_modal.png)

---

## ✨ Features (EN)

### 🔍 Real-Time Movie Search

- Search by title
- Keyword highlighting
- Same unified UI for movie cards, modal, search list

### 🌐 Full Multilingual (KR/EN)

- Header toggle
- TMDB API language sync
- Entire UI managed by Vue I18n

### 👍👎 Like / Dislike (LocalStorage)

- Vote saved locally
- Shared across:
  - Main List
  - Search Results
  - Modal
- “Clear All Notifications” also resets votes

### 🔔 Notification System

- Shows message per action (like/dislike/cancel)
- Stores history in LocalStorage
- Header popup UI

### 🎞 Hero Banner (Swiper)

- Autoplay slider
- Backdrop synced to active movie
- Includes search bar + subtitle

### 📱 Responsive Layout

- Optimized for PC/tablet/mobile
- Hover interactions only on hover-capable devices

---

## ⚙ Tech Stack

### Frontend

- Vue 3 (Composition API)
- Vite
- SCSS
- Vue Router
- Vue I18n
- Swiper.js
- Font Awesome

### API

- TMDB API

### Deploy

- GitHub Pages
- Vite build + deploy

---

## 📂 Project Structure

```bash
vueFlix/
 ├─ public/
 │   ├─ vueflix_en.png
 │   ├─ vueflix_ko.png
 │   ├─ vueflix_full_pc.png
 │   ├─ vueflix_full_mo.png
 │   ├─ vueflix_alarm.png
 │   ├─ vuflix_modal.png
 │   └─ favicon.svg
 │
 ├─ src/
 │   ├─ assets/
 │   ├─ components/
 │   │   ├─ Header.vue
 │   │   ├─ MainBanner.vue
 │   │   ├─ MovieSection.vue
 │   │   ├─ MovieItem.vue
 │   │   ├─ MovieModal.vue
 │   │   ├─ SearchBar.vue
 │   │   ├─ SearchResults.vue
 │   │   ├─ ThumbsButton.vue
 │   │   └─ Footer.vue
 │   ├─ composables/
 │   │   ├─ useGenres.js
 │   │   └─ useVotes.js
 │   ├─ data/
 │   │   └─ genres.js
 │   ├─ i18n/
 │   │   └─ index.js
 │   ├─ api/
 │   │   └─ tmdb.js
 │   ├─ router/
 │   │   └─ router.js
 │   ├─ App.vue
 │   └─ main.js
 │
 ├─ .prettierrc
 ├─ package.json
 ├─ vite.config.js
 └─ README.md
```

---

## 🚀 Getting Started

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Deploy (GitHub Pages)

```bash
npm run deploy
```

Vite config must include:

```js
base: "/vueFlix/";
```

---

## 🌐 I18n Usage

### Import

```js
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
```

### Language update

```js
i18n.global.locale.value = "ko"; // or 'en'
```

---

# 🇰🇷 한국어 설명

## 📌 프로젝트 소개

VueFlix는 Vue 3와 TMDB API로 구현한 Netflix 스타일 SPA 영화 탐색 서비스입니다.  
검색, 장르, 좋아요/싫어요, 알림, 다국어, 모달, 반응형까지 완성된 포트폴리오 프로젝트입니다.

---

## ✨ 주요 기능

### 🔍 실시간 검색

- 제목 검색
- `<mark>` 하이라이트
- 검색/메인/모달 동일 UI

### 🌐 다국어

- KR/EN 토글
- API 언어 자동 변경
- UI 모든 텍스트 i18n 적용

### 👍👎 좋아요/싫어요

- localStorage 저장
- 메인/검색/모달 모두 공유
- 알림 전체삭제 시 투표 초기화

### 🔔 알림

- 좋아요/싫어요/취소 메시지
- 내역 저장
- 전체 삭제

### 🎞 히어로 배너

- 자동 재생
- 백드롭 연동
- 검색창 + 서브타이틀

### 📱 반응형

- PC/태블릿/모바일 대응
- hover 지원 기기에서만 활성화

---

## 👩‍💻 Author

예지 (Yejin Kim / Woojin966)  
Portfolio: https://woojin966.github.io/portfolid2025  
GitHub: https://github.com/woojin966  
Email: woojin_966@naver.com

---

## 🙌 Thank You

VueFlix was created as a polished portfolio project.  
If this project helped you, leaving a ⭐ on GitHub is always appreciated!
