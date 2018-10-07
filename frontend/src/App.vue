<template>
  <v-app>
    <div class="nav-wrapper primary">
      <nav class="nav">
        <router-link 
          :class="{activeRoute: $route.name === 'home'}" 
          class="routerlink white--text" 
          to="/">Home</router-link>
        <router-link 
          :class="{activeRoute: $route.name === 'leaderboard'}" 
          class="routerlink white--text" 
          to="/leaderboard">Leaderboard</router-link>
        <router-link 
          :class="{activeRoute: $route.name === 'resources'}" 
          class="routerlink white--text" 
          to="/resources">Resources</router-link>
      </nav>
    </div>
    <v-content class="primary">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "fas fa-trophy",
          title: "About",
          path: "/about"
        },
        {
          icon: "fas fa-trophy",
          title: "Leaderboard",
          path: "/leaderboard"
        },
        {
          icon: "fas fa-users",
          title: "Participants",
          path: "/participants"
        }
      ],
      miniVariant: false,
      title: "Hacktoberfest Frankfurt 2018"
    };
  }
};
</script>

<style lang="stylus">
  body, html
    position: relative
    font-size: 18px
    background: #582D41
    padding: 0 .3em
    @media screen and (max-width: 420px)
      font-size: 16px
  
  #app
    background: #582D41
    padding-bottom: 2em

  *
    box-sizing: border-box

  .nav-wrapper
    position: sticky 
    top: 0
    z-index: 999
    display: flex
    justify-content: flex-end

  nav
    display: flex
    text-align: right
    max-width: 1280px
    flex-basis: 100%
    margin: auto
    justify-content: flex-end
    padding: .8em 0
    @media screen and (max-width: 420px)
      justify-content: space-between
      flex-wrap: wrap
  
    .routerlink
      margin-left: 1.5em
      @media screen and (max-width: 420px)
        margin: 0

  .activeRoute
    border-bottom: 2px solid #FF9A56

  .routerlink, .v-btn
    letter-spacing: 1px
    text-transform: uppercase
    font-weight: 600
    text-decoration: none
    font-size: 1rem

  .routerlink:focus, .v-btn:focus
    outline: 2px dotted #01FFFF
    outline-offset: 5px

  .page
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: center
    align-items: center
    min-height: 90vh

  .content
    max-width: 550px
</style>
