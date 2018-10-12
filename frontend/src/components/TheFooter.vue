<template>
  <footer class="footer">
    <div class="footer-wrapper">
      <router-link class="footer-link" to="/coc">Code of Conduct</router-link>
      <a class="footer-link" href="https://hacktoberfest.digitalocean.com">Official Website</a>
      <a class="footer-link" href="https://twitter.com/hacktoberffm">@hacktoberffm</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="sass">

  .footer
    padding: .5rem 0
    background: hsl(332, 32%, 23%)

  .footer-wrapper
    max-width: 1280px
    margin: 0 auto
    height: 100%
    display: flex
    justify-content: center
    color: white
  
  .footer-link
    color: white
    font-weight: 500
    text-decoration: none
    margin: 0 1rem
    &:hover
      border-bottom: 1px solid $color-cyan

</style>
