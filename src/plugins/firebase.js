import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBRQgcZiyD9o4vVzOrGBWsEz8_mQ1e4ssk',
  authDomain: 'food-a-18243.firebaseapp.com',
  projectId: 'food-a-18243',
  storageBucket: 'food-a-18243.appspot.com',
  messagingSenderId: '214825260236',
  appId: '1:214825260236:web:5d8d39ed7ba84e2d845e69',
  measurementId: 'G-TYR489GRSH',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
