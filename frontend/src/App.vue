<template>
  <v-app>
    <the-navigation/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
export default {
  name: "App",
  components: {
    TheNavigation
  }
};
</script>

<style lang="sass">
  body, html
    position: relative
    font-size: 18px
    background: $color-primary
    padding: 0 .3em
    @media screen and (max-width: 420px)
      font-size: 16px

  #app
    background: $color-primary
    padding-bottom: 2em

  *
    box-sizing: border-box

  .page
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: center
    min-height: 90vh

  .content
    max-width: 550px
</style>
