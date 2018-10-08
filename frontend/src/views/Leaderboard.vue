<template>
  <div class="leaderboard white--text">
    <!-- Change name to progress board? -->
    <h1>Live Leaderboard</h1>
    <p>Check out our leaderboard to see how our community is doing. Can't see your progress? Add yourself <button 
      class="font-weight-bold" 
      @click="login">here</button>!</p>
    <v-data-table 
      id="leaderboard-table"
      :headers="headers" 
      :items="users" 
      :loading="isLoading" 
      :pagination.sync="pagination"
      :must-sort="true"
      :hide-actions="true">
      <v-progress-linear 
        slot="progress" 
        color="accent" 
        height="3" 
        indeterminate/>
      <template 
        slot="items" 
        slot-scope="props">
        <!-- TOTAL PRS -->
        <td>{{ props.item.prs }}</td>
        <!-- GITHUB USERNAME -->
        <td>{{ props.item.name }}</td>
        <!-- PROJECT LAST CONTRIBUTED TO -->
        <td v-if="$mq !== 'xs'">{{ props.item.latestProject }}</td>
        <!-- STATUS: COMPLETE/IN PROGRESS -->
        <td :class="{'progress--complete': props.item.prs >= 5}">
          <template v-if="props.item.prs >= 5" >Completed!</template>
        <template v-else>In progress...</template></td>
      </template>
    </v-data-table>
    <div class="total white--text">{{ totalPrs }} PRs by {{ totalUsers }} users!</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    isLoading: false,
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
        text: "User",
        value: "name"
      },
      {
        text: "Latest contribution",
        value: "latest",
        sortable: false
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
      users: "api/users"
    }),
    totalPrs() {
      return this.users.reduce((total, obj) => obj.prs + total, 0);
    },
    totalUsers() {
      return this.users.length;
    }
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
  .leaderboard
    max-width: 1280px
    margin: 0 auto

  table.v-table thead tr
    height: 40px

  table.v-table thead tr th.column
    font-size: 14px

  table.v-table tbody td
    font-size: 18px

  table.v-table tbody td.progress--complete
    color: $color-success
    font-weight: bold

  .fa-sort-up
    margin-left: 5px

  .total
    text-align: right
    font-size: 1.5rem
    font-weight: 700
    padding-top: .5rem

  @media screen and (max-width: 700px)
    .v-datatable > thead:nth-child(1) > tr:nth-child(1) th.column:nth-child(3)
      display: none

    #leaderboard-table table.v-table thead th
      padding: 0 
      padding-left: 1em

    #leaderboard-table .v-datatable > tbody > tr > td
      padding: 0
      padding-left: 1em
</style>
