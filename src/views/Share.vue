<template>
  <section>
    <button @click="showForm = !showForm" class="button is-primary" v-if="isLoggedIn">I want to Share!</button>
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
    <br>
      <div class="card" v-for="post in posts" :key="post.id">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="post.user_avatar" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{post.title}}</p>
              <p class="subtitle is-6">@{{post.user_name}} {{post.created_at}}</p>
              <p class="subtitle is-6" v-if="post.URL"><a :href="post.URL">{{post.URL}}</a></p>
            </div>
          </div>
          <div class="content">
            {{post.description}}
            <hr>
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
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    showForm: false,
    post: {
      title: '',
      description: '',
      URL: '',
    },
  }),
  mounted() {
    this.initShare(this.$route.params.name);
  },
  watch: {
    '$route.params.name'() {
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
    ...mapGetters('share', ['share']),
  },
  methods: {
    isImage(url) {
      return url.match(/(png|jpeg|jpg|gif)$/);
    },
    ...mapActions('share', ['createPost', 'initShare', 'initPosts']),
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
  },
};
</script>

<style>
.container {
  width: 28em;
}
</style>
