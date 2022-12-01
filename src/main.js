import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from '@/router/index';
import '@/sass/main.scss';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faSearch, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

library.add(faSearch, faHeart, faFilter, faXmark);

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
