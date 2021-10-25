<template>
  <section class="home">
    <template v-if="loggedinUser">
      <h1>Hello {{ loggedinUser.name }} !</h1>
      <h2>coins: {{ loggedinUser.coins }}</h2>
    </template>
    <h4>Bitcoin rate: {{ bitCoinRate }}</h4>
    <h2 v-if="loggedinUser">Last transfers</h2>
    <TransferList
      v-if="loggedinUser && loggedinUser.moves.length"
      :movesToShow="movesToShow"
      :isToUser="true"
    />
  </section>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service";
import TransferList from "@/components/TransferList";
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
    movesToShow() {
      return this.loggedinUser.moves.slice(0, 5);
    },
  },
  components: {
    TransferList,
  },
};
</script>
