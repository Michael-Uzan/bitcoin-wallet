<template>
  <main class="main-container">
    <UserMsg />
    <AppHeader />
    <router-view />
    <AppFotter />
  </main>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFotter from "./components/AppFotter.vue";
import UserMsg from "@/components/UserMsg.vue";

export default {
  async created() {
    this.$store.dispatch({ type: "loadUser" });
  },
  components: {
    AppHeader,
    AppFotter,
    UserMsg,
  },
};
</script>