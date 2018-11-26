
import  { firebaseAction } from 'vuexfire';
import db from '@/db';

const state = {
  shares: [],
};

const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('shares', db.collection('shares'));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};
