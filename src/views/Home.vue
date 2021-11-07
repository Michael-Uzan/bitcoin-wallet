<template>
  <section class="home">
    <template v-if="loggedinUser">
      <h1>Hello {{ loggedinUser.name }} !</h1>
      <h2>
        Your Balance: {{ userBalance }} ₿ ( {{ coinsConvertedToDollar }} $)
      </h2>
      <h4>Current Bitcoin rate: 1 $ = {{ bitCoinRate }} ₿</h4>
      <div v-if="loggedinUser && loggedinUser.moves.length">
        <h2 v-if="loggedinUser">Last money transfers</h2>
        <TransferList :movesToShow="movesToShow" :isToUser="true" />
      </div>
      <div v-if="lotteryMovesToShow.length">
        <h2>Last lottery activity</h2>
        <LotteryMovesList
          :lotteryMovesToShow="lotteryMovesToShow"
        ></LotteryMovesList>
      </div>
    </template>
    <template v-else>
      <Loading></Loading>
    </template>
  </section>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service";
import TransferList from "@/components/TransferList";
import Loading from "@/components/Loading";
import LotteryMovesList from "@/components/LotteryMovesList";

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
    lotteryMovesToShow() {
      return this.loggedinUser.lotteryMoves.slice(0, 5);
    },
    coinsConvertedToDollar() {
      return (this.loggedinUser.coins / this.bitCoinRate).toLocaleString(
        "en-GB",
        { maximumFractionDigits: 2 }
      );
    },
    userBalance() {
      return this.loggedinUser.coins.toLocaleString("en-GB", {
        maximumFractionDigits: 2,
      });
    },
  },
  components: {
    TransferList,
    Loading,
    LotteryMovesList,
  },
};
</script>
