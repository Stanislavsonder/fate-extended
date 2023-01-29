import { createApp } from 'vue'
import App from '../App.vue'
import '../registerServiceWorker'
import store from '../store'
import { createI18n } from 'vue-i18n'

import en from '../langs/en.json'
import bel from '../langs/bel.json'
import ru from '../langs/ru.json'
import ua from '../langs/ua.json'

const i18n = createI18n({
	locale: 'en',
	messages: {
		en,
		ua,
		ru,
		bel,
	},
})

createApp(App).use(store).use(i18n).mount('#app')
