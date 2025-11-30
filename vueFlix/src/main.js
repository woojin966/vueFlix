import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import './assets/common.scss'
import { useGenres } from "./composables/useGenres";
import { i18n } from './i18n/index'
console.log("i18n ???", i18n)

// const { loadGenresEn } = useGenres();
// loadGenresEn();
const genresStore = useGenres()
genresStore.loadGenresEn()

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const app = createApp(App)
app.use(i18n)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

