<template>
  <footer class="footer">
      <router-link class="footer-link" to="/coc">Code of Conduct</router-link>
      <a class="footer-link" href="https://twitter.com/hacktoberffm">@hacktoberffm</a>
      <a class="footer-link" href="https://hacktoberfest.digitalocean.com">Official Website</a>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="sass">

  .footer
    margin: 0 auto
    display: flex
    justify-content: center
    padding-bottom: .5rem
    text-align: center

  .footer-link
    color: white
    font-size: .9rem
    font-weight: 500
    text-decoration: none
    margin: 0 1rem
    &:hover
      border-bottom: 1px solid $color-cyan

</style>
