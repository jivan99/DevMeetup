<template>
  <v-container>
    <v-layout row wrap v-for="meetup of meetups" :key="meetup.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img
                  :src="meetup.imageUrl"
                ></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h2 class="white--text" mb-0>{{meetup.title}}</h2>
                    <div class="white--text">{{meetup.date | date}}, {{meetup.time | time}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat light :to="'/meetups/' + meetup.id" router>
                    <v-icon left>arrow_forward</v-icon>
                    view meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>
