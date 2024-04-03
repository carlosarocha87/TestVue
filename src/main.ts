/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'
import VueAxios from 'vue-axios'
// Components
import App from './App.vue'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(VueSweetalert2)
registerPlugins(app)

app.mount('#app')
