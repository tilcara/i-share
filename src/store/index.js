import Vue from 'vue';
import Vuex from 'vuex';
import { firebaseMutations } from 'vuexfire';

import auth from './auth';
import shares from './shares';
import share from './share';
import users from './users';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: firebaseMutations,
  modules: {
    auth,
    shares,
    share,
    users,
  },
});
