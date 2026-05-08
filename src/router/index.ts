import { createRouter, createWebHistory } from 'vue-router';

import Config from '@/pages/config.vue';
import Index from '@/pages/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/config', name: 'Game config', component: Config },
  ],
});

export default router;
