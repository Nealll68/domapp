import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Alarm from '@/pages/alarm'
import Light from '@/pages/light'
import Heater from '@/pages/heater'
import Scenario from '@/pages/scenario'
import Video from '@/pages/video'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Index, name: 'Accueil' },
    { path: '/alarm', component: Alarm, name: 'Alarme' },
    { path: '/light', component: Light, name: 'Eclairage' },
    { path: '/heater', component: Heater, name: 'Chauffage' },
    { path: '/scenario', component: Scenario, name: 'Scénario' },
    { path: '/video', component: Video, name: 'Vidéo' },
    { path: '*', redirect: '/' }
  ]
})
