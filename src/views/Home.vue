<template>
  <section class="home">
    <template v-if="loggedinUser">
      <h1>Hello, {{ loggedinUser.name }} !</h1>
      <hr />
      <section class="balance-details flex space-between">
        <div>
          <h5 class="font2">CURRENT BALANCE</h5>
          <h4>
            BIT: <span class="user-balance">₿ {{ userBalance }}</span>
          </h4>
          <h4>
            USD: <span class="font2">$ {{ coinsConvertedToDollar }}</span>
          </h4>
        </div>
        <div>
          <h5 class="font2">CURRENT BTC USD:</h5>
          <p>$ 1 = ₿ {{ bitCoinRate }}</p>
        </div>
      </section>
      <div class="flex space-around">
        <img src="../assets/img/home-image.jpg" />
      </div>
      <div
        class="transfer-details"
        v-if="loggedinUser && loggedinUser.moves.length"
      >
        <h4 v-if="loggedinUser">Last 5 moves</h4>
        <hr />
        <TransferList
          :movesToShow="movesToShow"
          :bitCoinRate="bitCoinRate"
          :isToUser="true"
        />
      </div>
      <div class="lottery-trasfer-details" v-if="lotteryMovesToShow.length">
        <h4>Last 5 lottery activity</h4>
        <hr />
        <LotteryMovesList
          :lotteryMovesToShow="lotteryMovesToShow"
          :bitCoinRate="bitCoinRate"
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
