<template>
  <footer class="footer">
    <div class="footer-wrapper"></div>
  </footer>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style lang="sass">

  .footer
    min-height: 200px
    background: hsl(332, 32%, 23%)

  .footer-wrapper
    max-width: 1280px
    height: 100%
    display: flex
    justify-content: center
    color: white

</style>
