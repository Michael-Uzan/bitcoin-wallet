<template>
  <main>
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
  components: {
    AppHeader,
    AppFotter,
    UserMsg,
  },
};
</script>