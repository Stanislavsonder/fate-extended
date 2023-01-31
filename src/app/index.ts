import { createApp } from 'vue'
import App from '../App.vue'
import '../registerServiceWorker'
import { i18n } from '@/app/i18n'
import pinia from '@/app/store'

createApp(App).use(pinia).use(i18n).mount('#app')
