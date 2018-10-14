<template>
  <section class="section section-home">
    <div class="main-img">
      <img 
        class="hacktoberfest-img" 
        src="/hacktoberfest.svg" 
        alt="Hacktoberfest Frankfurt">
    </div>
    <ul class="list list-stats">
      <li 
        v-for="stat in stats"
        :key="stat.index" 
        class="list-item">
        <div class="stat-number">{{ stat.number }}</div>
        <div class="stat-name">{{ stat.name }}</div>
      </li>
    </ul>
    <article class="article article-community">
      <h2 class="sponsor-heading">Participating communities</h2>
      <list-component 
        :items="communities" 
        :item-type="'community'" 
        class="community-list"/>
      <h2 class="sponsor-heading">Sponsored by</h2>
      <list-component 
        :items="sponsors" 
        :item-type="'sponsor'" 
        class="sponsor-list"/>
    </article>
  </section>
</template>

<script>
import ListComponent from "@/components/ListComponent";
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListComponent
  },
  data: () => ({
    stats: [
      {
          name: "Communities",
          number: "10+"
        },
        {
          name: "Participants",
          number: "140+"
        },
        {
          name: "Sponsors",
          number: "10"
    }
      ]
  }),
  computed: {
    // GET COMMUNITY AND SPONSOR LIST FROM THE STORE
    ...mapState({
      communities: state => state.communities.communities,
      sponsors: state => state.sponsors.sponsors
    })
  }
};
</script>

<style lang="sass">

  .section-home
    min-height: 100vh

  .main-img
    max-width: 500px
    text-align: center
    padding: 1rem 0
    margin: 0 auto

  .hacktoberfest-img
    width: 100%

  .list-stats
    flex-basis: 100%
    text-align: center
    padding-bottom: .5rem
    max-width: 700px
    margin: 0 auto
    justify-content: center

    .list-item
      margin: 0 1.5rem

  .stat-number
    font-size: 2.5rem
    font-weight: 700

  .stat-name
    text-align: center
    text-transform: uppercase
    font-size: .9rem
    font-weight: 700
    letter-spacing: 1px
    opacity: .7

  .sponsor-heading
    text-transform: uppercase
    font-size: .9rem
    text-align: center
    letter-spacing: 1px
    color: $color-secondary

</style>
