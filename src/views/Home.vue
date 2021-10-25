<template>
  <section class="home">
    <template v-if="loggedinUser">
      <h1>Hello {{ loggedinUser.name }} !</h1>
      <h2>coins: {{ loggedinUser.coins }}</h2>
    </template>
    <h2>Bitcoin rate: {{ bitCoinRate }}</h2>
  </section>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service";

export default {
  data() {
    return {
      bitCoinRate: 0,
    };
  },
  async created() {
    this.bitCoinRate = await bitcoinService.getBitcoinRate();
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>
