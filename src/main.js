import { createApp } from 'vue';
import App from '@/App.vue';
import './style.css';
import router from '@/router/index';
import '@/sass/main.scss';
import { getAuth } from 'firebase/auth';
import '@/plugins/firebase';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faSearch, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faFacebook,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

library.add(
  faSearch,
  faHeart,
  faFilter,
  faXmark,
  faInstagram,
  faFacebook,
  faYoutube
);

let app;

getAuth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .component('font-awesome-icon', FontAwesomeIcon)
      .mount('#app');
  }
});
