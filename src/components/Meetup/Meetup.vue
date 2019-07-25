<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="primary--text">{{ meetup.title }}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px"></v-img>
          <v-card-text>
            <div class="info--text">
              {{ meetup.date | date }}, {{ meetup.time | time}}
              &mdash; {{meetup.location}}
            </div>
            <div v-if="userIsCreator">
              <app-edit-meetup-date-dialog :meetup="meetup"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup"></app-edit-meetup-time-dialog>
            </div>
            <div>{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-meetup-dialog :meetup="meetup" v-if="userIsAuthenticated && !userIsCreator"></app-register-meetup-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.getUser !== null &&
        this.$store.getters.getUser !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.getUser.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  }
};
</script>
