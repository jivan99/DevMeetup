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
    <div v-else>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h1 class="primary--text">Create a new Meetup</h1>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <form @submit.prevent="onCreateMeetup">
            <v-layout>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field label="Title" v-model="title" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                  name="location"
                  label="Location"
                  id="location"
                  required
                  v-model="location"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <input
                  type="file"
                  style="display: none;"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFilePicked"
                />
                <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <img :src="imageUrl" height="200" />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-textarea
                  name="description"
                  label="Description"
                  id="description"
                  v-model="description"
                  required
                ></v-textarea>
              </v-flex>
            </v-layout>
            <v-layout row class="mb-3">
              <v-flex xs12 sm6 offset-sm3>
                <h1 class="primary--text">Choose Date &amp; Time</h1>
              </v-flex>
            </v-layout>
            <v-layout row class="mb-3">
              <v-flex xs12 sm6 offset-sm3>
                <v-date-picker v-model="date" :min="minDate"></v-date-picker>
              </v-flex>
            </v-layout>
            <v-layout row class="mb-4">
              <v-flex xs12 sm6 offset-sm3>
                <v-time-picker v-model="time" :format="'ampm'"></v-time-picker>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-btn class="primary" :disabled="!formIsValid" type="submit">Create meetup</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      minDate: new Date().toISOString().substr(0, 10),
      time: new Date().toTimeString().substr(0, 5),
      date: new Date().toISOString().substr(0, 10),
      image: null
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.date,
        time: this.time
      };
      this.$store.dispatch("createMeetup", meetupData);
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>

