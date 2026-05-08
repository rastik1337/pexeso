import { createRouter, createWebHistory } from 'vue-router';

import Config from '@/pages/config.vue';
import Index from '@/pages/index.vue';
import Play from '@/pages/play.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Overview', component: Index },
    { path: '/config', name: 'Game config', component: Config },
    { path: '/play', name: 'Game', component: Play },
  ],
});

export default router;
