<template>
  <div class="page">
    <!-- TODO: Rewrite text, make button better. Update with find out more link. -->
    <img 
      class="hacktoberfest" 
      src="/hacktoberfest.svg" 
      alt="Hacktoberfest Frankfurt">
    <div class="content white--text">
      <h1>Welcome to Hacktoberfest Frankfurt 2018!</h1>
      <p>We are excited that you've joined us to celebrate Open Source with the Frankfurt and Rhein-Main tech community! Take a look around to see what you can expect from this event!</p>
      <p>Join our live <router-link 
        class="white--text" 
        to="/leaderboard">leaderboard</router-link> to track your progress and see how our community is doing.</p>
      <v-btn 
        class="accent white--text" 
        @click="login">Join us</v-btn> or find out more here.
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Home",
  methods: {
    ...mapActions({
      login: "login/login"
    })
  }
};
</script>

<style lang="sass">
  .hacktoberfest
    max-width: 600px
    padding: 1rem
</style>
