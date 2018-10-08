<template>
  <div class="nav-wrapper primary">
    <nav class="nav">
      <router-link 
        v-for="route in $router.options.routes"
        :key="route.index"
        :class="{activeRoute: $route.name === route.name}" 
        :to="route.path" 
        class="routerlink white--text">{{ route.name }}</router-link>
    </nav>
  </div>
</template>

<style lang="sass">
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
    border-bottom: 2px solid $color-secondary

  .routerlink, .v-btn
    letter-spacing: 1px
    text-transform: uppercase
    font-weight: 600
    text-decoration: none
    font-size: 1rem

  .routerlink:focus, .v-btn:focus
    outline: 2px dotted $color-accent
    outline-offset: 5px

</style>
