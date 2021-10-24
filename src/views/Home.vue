<template>
  <section class="home">
    <h1>Hello {{ loggedinUser.name }} !</h1>
    <h2>coins: {{ loggedinUser.coins }}</h2>
    <h2>Bitcoin rate: {{ bitCoinRate }}</h2>
  </section>
</template>

<script>
import { userService } from "../services/user.service.js";
import { bitcoinService } from "../services/bitcoin.service";

export default {
  data() {
    return {
      loggedinUser: {},
      bitCoinRate: 0,
    };
  },
  async created() {
    this.loggedinUser = userService.getUser();
    this.bitCoinRate = await bitcoinService.getBitcoinRate();
  },
};
</script>
