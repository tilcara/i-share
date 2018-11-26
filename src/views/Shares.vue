<template>
<section>
  <aside class="menu">
    <p class="menu-label">
      Shares
    </p>
    <ul class="menu-list">
      <li v-for="share in shares" :key="share.id">
        <router-link :to="{ name: 'share', params: { name: share.name } }">
          {{share.name}}
        </router-link>
      </li>
    </ul>
  </aside>
</section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  mounted() {
    this.init();
  },
  computed: mapState('shares', ['shares']),
  methods: mapActions('shares', ['init']),
};
</script>
