import firebase from '@/firebase';
import { firebaseAction } from 'vuexfire';
import db from '@/db';

const posts = db.collection('posts');

const state = {
  shares: [],
  posts: [],
};

const getters = {
  share: state => (state.shares[0] ? state.shares[0] : {}),
};

const actions = {
  async createPost({ getters }, post) {
    const result = posts.doc();
    post.id = result.id;
    post.share_id = getters.share.id;
    post.user_id = firebase.auth().currentUser.uid;
    post.created_at = firebase.firestore.FieldValue.serverTimestamp();
    post.updated_at = firebase.firestore.FieldValue.serverTimestamp();
    await posts.doc(post.id).set(post);
  },
  async deletePost(_, post_id) {
    await posts.doc(post_id).delete();
  },
  initShare: firebaseAction(({ bindFirebaseRef }, name) => {
    bindFirebaseRef('shares', db.collection('shares').where('name', '==', name));
  }),
  initPosts: firebaseAction(({ bindFirebaseRef }, share_id) => {
    bindFirebaseRef('posts', posts.where('share_id', '==', share_id));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
};
