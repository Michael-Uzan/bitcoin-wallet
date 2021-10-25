<template>
  <section class="login-signup">
    <form @submit.prevent="signup">
      <h1>Signup</h1>
      <input v-model="creds.name" type="text" placeholder="Name" required />
      <input v-model="creds.email" type="text" placeholder="Email" required />
      <input
        v-model="creds.password"
        type="text"
        placeholder="Password"
        required
      />
      <button>Signup</button>
    </form>
    <router-link to="/login">Login</router-link>
  </section>
</template>

<script>
export default {
  data() {
    return {
      creds: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async signup() {
      await this.$store.dispatch({ type: "signup", creds: this.creds });
      if (this.$store.getters.loggedinUser) this.$router.push("/");
    },
  },
};
</script>

