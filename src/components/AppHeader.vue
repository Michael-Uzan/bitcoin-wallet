<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/contacts">Contacts</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <template v-if="loggedinUser">
        <span>{{ loggedinUser.name }}</span> |
        <button @click="logout">Logout</button>
      </template>
      <router-link v-else to="/login">Login</router-link> |
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch({ type: "logout" });
      this.$router.push("/login");
    },
  },
};
</script>
