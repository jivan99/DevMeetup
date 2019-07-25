import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Gallery from '@/components/Gallery/Gallery';
import Meetups from '@/components/Meetup/Meetups';
import Meetup from '@/components/Meetup/Meetup';
import CreateMeetup from '@/components/Meetup/CreateMeetup';
import Signup from '@/components/User/Signup';
import Signin from '@/components/User/Signin';
import authGuard from './auth-guard'

Vue.use(Router);

import goTo from 'vuetify/lib/components/Vuetify/goTo';

export default new Router({
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups,
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: authGuard,
    },
    {
      path: '/meetups/:id',
      props: true,
      name: 'Meetup',
      component: Meetup,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery
    }
  ],
});
