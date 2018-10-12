<template>
  <v-app>
    <the-navigation/>
    <v-content>
      <router-view/>
    </v-content>
    <the-footer/>
  </v-app>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
import TheFooter from "./components/TheFooter.vue";
export default {
  name: "App",
  components: {
    TheNavigation,
    TheFooter
  }
};
</script>

<style lang="sass">
  body, html
    position: relative
    font-size: 20px
    color: white
    background: $color-primary
    line-height: 1.3
    @media screen and (max-width: 768px)
      font-size: 16px

  #app
    background: $color-primary
    min-height: 100vh
    @media screen and (max-width: 768px)
      padding: 0 .5rem

  .theme--light.application
    color: white
    font-family: 'Roboto', Helvetica, Arial, sans-serif

  *
    box-sizing: border-box
    margin: 0
    padding: 0

  section
    display: flex
    flex-direction: column
    flex-wrap: wrap
    max-width: 1400px
    margin: 0 auto
    min-height: 100vh

  a, a.link-external, a.inline-link
    color: white
    text-decoration: none
    &.inline-link
      font-weight: 500
      border-bottom: 1px solid $color-cyan

  p
    margin-bottom: 1rem

  h1, h2, h3
    margin-bottom: .3rem

  h2
    font-size: 1.2rem

  h3
    font-size: 1rem
    margin-top: 1.3rem

  article
    flex-basis: 50%
    padding: 1rem 1rem

  button
    color: white
    font-weight: 700
    font-family: 'Roboto', Helvetica, Arial, sans-serif
    background: $color-accent
    border: 0
    text-transform: uppercase
    letter-spacing: 1px
    font-size: 1rem
    padding: .5rem 1rem
    border-radius: .1rem
    box-shadow: 0 .2rem .2rem hsl(332, 32%, 23%)
    cursor: pointer
    &:active
      transform: translate3d(.05rem, .05rem, .05rem)
      box-shadow: 0
    &:focus
      outline: 2px dotted $color-secondary
      outline-offset: 5px

  .link-internal
    font-weight: 600
    text-decoration: none
    border-bottom: 2px solid $color-cyan

</style>
