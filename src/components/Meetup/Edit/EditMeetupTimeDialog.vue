<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">Edit Time</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%;" actions :format="'ampm'">
              <template scope="{save, cancel}">
                <v-btn class="blue--text darken-1" flat @click="editDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" flat @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableTime: null
    };
  },
  created() {
    if(this.meetup.time) {
      this.editableTime = this.meetup.time;
    }
  },
  methods: {
    onSaveChanges() {
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        time: this.editableTime
      })
    }
  }
};
</script>

