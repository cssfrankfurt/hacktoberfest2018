<template>
    <ul class="list" :class="{'sponsor-list': itemType === 'sponsor'}">
        <li
          v-for="item in items"
          :key="item.index"
          class="list-item"
          :class="{'logo-item': item.img}">
          <!-- SPONSOR IF TYPE IS SPONSORS -->
          <a v-if="itemType === 'sponsor'" :href="item.url">
            <img
              :src="item.img"
              :alt="item.name"
              class="logo-img"
              :class="item.name">
          </a>
          <!-- COMMUNITY IF TYPE IS COMMUNITY  -->
          <a v-if="itemType === 'community'"
            :href="item.url"
            :class="itemType"
            class="item-link">
            {{ item.name }}
          </a>
        </li>
      </ul>
</template>

<script>
  export default {
    name: "List",
    props: {
      items: {
        type: Array,
        required: true
      },
      itemType: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="sass">

  .list
    display: flex
    flex-wrap: wrap
    list-style-type: none
    padding: 0
    margin: 0
    align-content: center
    justify-content: center
    margin-bottom: 1rem

  .sponsor-list
    margin: auto
    justify-content: center
    padding-bottom: 3rem

  .list-item
    text-align: center

  .item-link
    text-decoration: none
    font-weight: 500
    margin: .1rem .5rem
    &.community
      color: $color-secondary
      font-size: 1.2rem

  .logo-item
    display: flex
    align-items: center
    justify-content: center
    margin: .5rem 1.5rem

  .logo-img
    max-height: 2rem

  .uib
    max-height: 2.5rem

</style>