<template>
  <section class="home">
    <template v-if="loggedinUser">
      <h1>Hello {{ loggedinUser.name }} !</h1>
      <h2>
        Your Balance: {{ loggedinUser.coins }} BIT (
        {{ coinsConvertedToDollar }} $)
      </h2>
    </template>
    <h4>Current Bitcoin rate: 1 $ = {{ bitCoinRate }} ₿</h4>
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
    if (!this.loggedinUser) {
      await this.$store.dispatch({ type: "signupAsGuest" });
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    movesToShow() {
      return this.loggedinUser.moves.slice(0, 5);
    },
    coinsConvertedToDollar() {
      return (this.loggedinUser.coins / this.bitCoinRate).toLocaleString(
        "en-GB",
        { maximumFractionDigits: 2 }
      );
    },
  },
  components: {
    TransferList,
  },
};
</script>
