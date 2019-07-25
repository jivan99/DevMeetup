<template>
  <v-app>
    <div class="grid-layout">
      <v-navigation-drawer v-model="sideNav" temporary app>
        <v-list>
          <v-list-tile v-for="(item, index) of menuItems" :key="index" router :to="item.link">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{item.title}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Logout</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar class="primary" dark app>
        <router-link to="/" tag="span" style="cursor: pointer;">
          <h2>DevMeetup</h2>
        </router-link>
        <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link">
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
          <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
            <v-icon left dark>exit_to_app</v-icon>Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <main>
        <router-view></router-view>
      </main>
      <footer>
        <p>&copy; 2019, DevMeetup. All Rights Reserved.</p>
      </footer>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "photo", title: "Gallery", link: "/gallery" },
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "photo", title: "Gallery", link: "/gallery" },
          {
            icon: "supervisor_account",
            title: "View Meetups",
            link: "/meetups"
          },
          { icon: "room", title: "Organize Meetup", link: "/meetup/new" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.getUser !== null &&
        this.$store.getters.getUser !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-rows: 5rem auto fit-content(2rem);
  grid-template-areas:
    "header"
    "main"
    "footer";
  height: 100vh;
}

main {
  grid-area: main;
  margin-bottom: 2rem;
}

footer {
  grid-area: footer;
  text-align: center;
  background: #333;
  color: #f4f4f4;
  padding: 1rem;
  font-family: Helvetica, sans-serif;
}
</style>

