<template>
  <nav class="nav">
    <router-link to="/">
      <img 
        class="nav-logo" 
        src="/hacktoberfest_small.svg" 
        alt="Hacktoberfest">
    </router-link>
    <div class="nav-wrapper primary">
      <router-link 
        v-for="route in $router.options.routes"
        :key="route.index"
        :class="{activeRoute: $route.name === route.name}" 
        :to="route.path" 
        class="router-link">{{ route.name }}</router-link>
    </div>
  </nav>
</template>

<style lang="sass">
  .nav
    position: sticky
    top: 0
    z-index: 999
    display: flex
    justify-content: flex-end
    align-items: center
    padding: 0 1rem
    background: $color-primary
    @media screen and (max-width: 320px)
      padding: 0

  .nav-wrapper
    display: flex
    text-align: right
    max-width: 1280px
    flex-basis: 100%
    margin: auto
    justify-content: flex-end
    padding: .8em 0

    .router-link
      color: white
      margin-left: 1.5em
      letter-spacing: 1px
      text-transform: capitalize
      font-weight: 500
      text-decoration: none
      font-size: 1rem
      @media screen and (max-width: 320px)
        margin-left: .5rem

  .activeRoute
    border-bottom: 1px solid $color-cyan

  .routerlink:focus
    outline: 2px dotted $color-accent
    outline-offset: 5px

  .nav-logo
    max-height: 2rem
    padding: .2rem

</style>
