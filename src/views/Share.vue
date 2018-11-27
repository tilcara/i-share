<template>
  <section>
    <form>
      <b-field label="Search">
        <b-input v-model="searchTerm"></b-input>
      </b-field>
    </form>
    <br>
    <button @click="showForm = !showForm" class="button is-primary" v-if="isLoggedIn">I want to
      Share!</button>
    <br>
    <br>
    <form v-if="showForm" @submit.prevent="onCreatePost(post)">
      <b-field label="Title">
        <b-input v-model="post.title" required></b-input>
      </b-field>
      <b-field label="Description">
        <b-input v-model="post.description" maxlength="140" type="textarea"></b-input>
      </b-field>
      <b-field label="URL">
        <b-input v-model="post.URL" type="url"></b-input>
      </b-field>
      <button class="button is-success">Share it!</button>
    </form>
    <hr>
    <div class="card" v-for="post in filteredPosts" :key="post.id">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="loadedUsersById[post.user_id].image" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p><strong>{{post.title}}</strong><br><small>{{loadedUsersById[post.user_id].name}},
                {{createdAt(post.created_at)}}</small></p>
            <p class="subtitle is-6" v-if="post.URL"><a :href="post.URL">{{post.URL}}</a></p>
          </div>
          <div class="media-right">
            <button
              v-if="user && user.id == post.user_id"
              @click="deletePost(post.id)"
              class="delete">
            </button>
          </div>
        </div>
        <div class="content">
          {{post.description}}
          <hr>
          <router-link
            :to="{
              name: 'post',
              params: {
                name: $route.params.name,
                post_id: post.id
              }
            }"
            class="button is-success is-rounded">Comment!</router-link>
        </div>
      </div>
      <div class="card-image" v-if="isImage(post.URL)">
        <figure class="image">
          <img :src="post.URL" alt="Placeholder image">
        </figure>
      </div>
      <hr>
    </div>
  </section>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  data: () => ({
    showForm: false,
    searchTerm: '',
    post: {
      title: '',
      description: '',
      URL: '',
    },
  }),
  mounted() {
    this.initUsers();
    this.initShare(this.$route.params.name);
  },
  watch: {
    '$route.params.name': () => {
      this.initShare(this.$route.params.name);
    },
    share() {
      if (this.share.id) {
        this.initPosts(this.share.id);
      }
    },
  },
  computed: {
    ...mapState('auth', ['user', 'isLoggedIn']),
    ...mapState('share', ['posts']),
    ...mapGetters({
      share: 'share/share',
      usersById: 'users/usersById',
    }),
    loadedUsersById() {
      return this.posts.reduce((byId, post) => {
        byId[post.user_id] = this.usersById[post.user_id] || {
          name: 'Loading...',
          image: 'https://bulma.io/images/placeholders/48x48.png',
        };
        return byId;
      }, {});
    },
    filteredPosts() {
      if (this.searchTerm) {
        const regexp = new RegExp(this.searchTerm, 'gi');
        return this.posts.filter(post => (post.title + post.description).match(regexp));
      }
      return this.posts;
    },
  },
  methods: {
    isImage(url) {
      return url.match(/(png|jpeg|jpg|gif)$/);
    },
    ...mapActions('share', ['createPost', 'initShare', 'initPosts', 'deletePost']),
    ...mapActions('users', {
      initUsers: 'init',
    }),
    async onCreatePost() {
      if (this.post.title && (this.post.description || this.post.URL)) {
        this.createPost(this.post);
        this.post = {
          title: '',
          description: '',
          URL: '',
        };
        this.showForm = false;
      }
    },
    createdAt(created_at) {
      function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return `${interval} years`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return `${interval} months`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return `${interval} days`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return `${interval} hours`;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return `${interval} minutes`;
        }
        return `${Math.floor(seconds)} seconds`;
      }
      return timeSince(created_at.seconds * 1000) < 0 ? '0 seconds ago' : `${timeSince(created_at.seconds * 1000)} ago`;
    },
  },
};
</script>

<style>
  .container {
    width: 28em;
  }

  .button.is-primary {
    margin-left: 10em;
  }

  .button.is-success {
    margin-left: 23em;
  }
  .button.is-success.is-rounded {
    margin-left: 10em;
  }
</style>
