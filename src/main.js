import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import * as firebase from 'firebase';
import './assets/global.css';
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue';
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue';
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue';
import RegisterMeetupDialog from './components/Meetup/Registration/RegisterMeetupDialog.vue';

import DateFilter from './filters/date';
import TimeFilter from './filters/time';

Vue.filter('date', DateFilter);
Vue.filter('time', TimeFilter);

import Alert from './components/shared/Alert.vue';
Vue.component('appAlert', Alert);
Vue.component('appEditMeetupDetailsDialog', EditMeetupDetailsDialog);
Vue.component('appEditMeetupDateDialog', EditMeetupDateDialog);
Vue.component('appEditMeetupTimeDialog', EditMeetupTimeDialog);
Vue.component('appRegisterMeetupDialog', RegisterMeetupDialog);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBhNKgdzOmhYO5uGbGIi_yZf--4Qi5rMok',
      authDomain: 'devmeetup-ds.firebaseapp.com',
      databaseURL: 'https://devmeetup-ds.firebaseio.com',
      projectId: 'devmeetup-ds',
      storageBucket: 'gs://devmeetup-ds.appspot.com',
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
        this.$store.dispatch('fetchUserData');
      }
    });
    this.$store.dispatch('loadMeetups');
  },
}).$mount('#app');
