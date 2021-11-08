<template>
  <section class="login-signup flex direction-col align-center">
    <form @submit.prevent="login" class="flex direction-col">
      <h1>login</h1>
      <input v-model="creds.email" type="text" placeholder="Email" required />
      <input
        v-model="creds.password"
        type="text"
        placeholder="Password"
        required
      />
      <button>Login</button>
    </form>
    <router-link to="/signup">Signup?</router-link>
  </section>
</template>

<script>
import { showUserMsg } from "@/services/eventBus.service";
export default {
  data() {
    return {
      creds: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch({ type: "login", creds: this.creds });
      if (this.$store.getters.loggedinUser) this.$router.push("/");
      else {
        this.creds = { email: "", passwords: "" };
        showUserMsg("bad login - incorrect username or password!", "danger");
      }
    },
  },
};
</script>

