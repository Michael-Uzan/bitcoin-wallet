<template>
  <header class="main-header align-center full" :class="menuOpen">
    <router-link to="/" class="flex align-center pointer">
      <img src="../assets/img/logo.jpg" />
      <h1>BitCoin Wallet</h1>
    </router-link>
    <div class="screen" @click="onToggleModal"></div>
    <nav class="flex align-center">
      <router-link to="/"> <div @click="onToggleModal">Home</div></router-link>
      <router-link @click="onToggleModal" to="/contacts">
        <div @click="onToggleModal">Contacts</div>
      </router-link>
      <router-link @click="onToggleModal" to="/lottery">
        <div @click="onToggleModal">Lottery</div>
      </router-link>
      <router-link @click="onToggleModal" to="/dashboard">
        <div @click="onToggleModal">Dashboard</div>
      </router-link>
      <template v-if="loggedinUser">
        <router-link @click="onToggleModal" :to="`/user/${loggedinUser._id}`">
          <div @click="onToggleModal">{{ loggedinUser.name }}</div>
        </router-link>
        <a @click="logout">
          <div @click="onToggleModal">Logout</div>
        </a>
      </template>
      <router-link v-else to="/login">
        <div @click="onToggleModal">Login</div>
      </router-link>
    </nav>
    <button class="btn-menu-toggle" @click="onToggleModal">☰</button>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    menuOpen() {
      if (this.isMenuOpen) return "menu-open";
      else return "";
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch({ type: "logout" });
      this.$router.push("/login");
    },
    onToggleModal() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
