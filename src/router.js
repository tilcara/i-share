import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Shares from './views/Shares.vue';
import Share from './views/Share.vue';
import Post from './views/Post.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/shares',
      name: 'shares',
      component: Shares,
    },
    {
      path: '/r/:name',
      name: 'share',
      component: Share,
    },
    {
      path: '/r/:name/:post_id',
      name: 'post',
      component: Post,
    },
  ],
});
