<template>
  <section class="section section-leaderboard">
    <div class="leaderboard-stats">
      <img 
        src="/hacktoberfest_title.svg" 
        alt="hacktoberfest" 
        class="leaderboard-header">
      <ul class="list list-stats">
        <li 
          v-for="stat in stats"
          :key="stat.index" 
          class="list-item">
          <div class="stat-number">{{ stat.number }}</div>
          <div class="stat-name">{{ stat.name }}</div>
        </li>
      </ul>
      <div class="join-us">
        <p>Want to track your progress live at our event?</p>
        <button @click="login" tabindex="0"> Join us </v-icon></button>
      </div>
    </div>
    <v-data-table 
      id="leaderboard-table"
      :headers="headers" 
      :items="users" 
      :loading="isLoading" 
      :pagination.sync="pagination"
      :must-sort="true"
      :hide-actions="true"
      :no-data-text="'Fetching data...'">

      <!-- LOADER BAR -->
      <v-progress-linear 
        slot="progress" 
        color="cyan" 
        height="3" 
        indeterminate/>

      <template 
        slot="items" 
        slot-scope="props">
        <!-- TOTAL PRS -->
        <td>{{ props.item.prs }}</td>

        <!-- GITHUB USERNAME -->
        <td>
          <a 
            :href="'https://github.com/' + props.item.name" 
            rel="noopener noreferrer" 
            target="_blank" 
            class="link-external">{{ props.item.name }} 
            <!-- LINK ICON -->
            <v-icon 
              small 
              class="icon icon-link" 
              v-text="'fas fa-link'"/></a></td>

        <!-- PROJECT LAST CONTRIBUTED TO -->
        <td v-if="$mq !== 'xs'">
          <a 
            v-if="props.item.latestProject !== 'N/A'"
            :href="'https://github.com/' + props.item.latestProject" 
            class="link-external" 
            rel="noopener noreferrer" 
            target="_blank">{{ props.item.latestProject }} 
            <!-- LINK ICON -->
            <v-icon 
              small 
              class="icon icon-link" 
              v-text="'fas fa-link'"/></a>
          <template v-else>{{ props.item.latestProject }}</template>
        </td>

        <!-- TIMESTAMP OF LAST CONTRIBUTION -->
        <td v-if="$mq !== 'xs'">{{ props.item.latestPr }}</td>
        <!-- STATUS: COMPLETE/IN PROGRESS -->
        <td :class="{'progress--complete': props.item.prs >= 5}">
          <!-- IF MORE THAN 5 PRS -->
          <template v-if="props.item.prs >= 5" >Completed!</template>
        <!-- IF LESS THAN 5 PRS -->
        <template v-else>In progress...</template></td>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    pagination: {
      sortBy: "prs",
      descending: true,
      rowsPerPage: 100
    },
    headers: [
      {
        text: "PRs",
        align: "left",
        value: "prs"
      },
      {
        text: "Name",
        value: "name"
      },
      {
        text: "Latest project",
        value: "latest",
        sortable: false
      },
      {
        text: "Timestamp",
        value: "time",
        sortable: true
      },
      {
        text: "Status",
        value: "status",
        sortable: false
      }
    ]
  }),
  computed: {
    ...mapGetters({
      users: "api/users",
      isLoading: "loader/isLoading",
      stats: "api/stats"
    })
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({
      login: "login/login",
      fetchData: "api/FETCH_USERS"
    })
  }
};
</script>

<style lang="sass">

  .leaderboard-description
    max-width: 800px

  .leaderboard-header
    max-height: 8rem

  .join-us
    padding-top: 1rem

  .leaderboard-stats
    padding-bottom: 1.5rem
    text-align: center

  #leaderboard-table
    padding: 1rem 2rem

  .theme--light.v-table
    background: $color-primary
    color: white

  .theme--light.v-datatable thead th.column.sortable.active i
    color: $color-cyan

  table.v-table tbody td
    font-weight: 500

  table.v-table thead tr
    height: 40px

  table.v-table thead tr th.column, .theme--light.v-datatable thead th.column.sortable.active, .theme--light.v-datatable thead th.column.sortable:hover
    color: white
    font-size: .9rem
    text-transform: uppercase
    letter-spacing: 1px
    text-align: left

  .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row)
    background: hsl(332, 32%, 21%)

  table.v-table tbody td
    font-size: 1rem

  table.v-table tbody td.progress--complete
    color: $color-secondary
    font-weight: bold

  .fa-sort-up
    margin-left: 5px

  i.v-icon.icon.icon-link
    color: $color-cyan
    margin-bottom: 3px
    opacity: 0

  .link-external:hover > i.v-icon.icon.icon-link
    opacity: 1

  .total
    text-align: right
    font-size: 1.5rem
    font-weight: 700
    padding-top: .5rem
  
  .theme--light.v-table tbody tr:not(:last-child), .theme--light.v-table thead tr:first-child
    border-bottom: 1px solid rgba(255,255,255,0.12)

  @media screen and (max-width: 700px)
    .v-datatable > thead:nth-child(1) > tr:nth-child(1) th.column:nth-child(3), .v-datatable > thead:nth-child(1) > tr:nth-child(1) th.column:nth-child(4)
      display: none

    #leaderboard-table table.v-table thead th
      padding: 0
      padding-left: 1em

    #leaderboard-table .v-datatable > tbody > tr > td
      padding: 0
      padding-left: 1em
</style>
