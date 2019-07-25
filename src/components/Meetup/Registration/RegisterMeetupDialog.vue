<template>
  <v-dialog persistent v-model="registerDialog" width='350'>
    <v-btn class="primary" slot="activator">{{ userIsRegistered ? 'Unregister' : 'Register' }}</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Unregister from Meetup</v-card-title>
            <v-card-title v-else>Register for Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-btn 
                class="red--text darken-1"
                flat
                @click="registerDialog = false">
                Cancel</v-btn>
              <v-btn 
                class="green--text darken-1"
                flat
                @click="onAgree">
                Confirm
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data() {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.getUser.registeredMeetups.findIndex(meetupId => meetupId === this.meetup.id) >= 0
    } 
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetup.id);
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetup.id);
      }
    }
  }
}
</script>



