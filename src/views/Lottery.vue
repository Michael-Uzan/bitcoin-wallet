<template>
  <section class="lottery">
    <h1>Lets play lottery!</h1>
    <p class="tac">Choose a number and set your amount:</p>
    <NumPicker @chooseNum="setNum" :chosenNum="chosenNum" />
    <section class="lottery-settings flex direction-col align-center">
      <div>
        <div>
          <label for="amount">Amount: </label>
          <input
            type="number"
            :placeholder="`Amount ₿`"
            v-model.number="amount"
            id="amount"
            min="0.1"
            :disabled="isGameStarted || !loggedinUser"
            required
          />
        </div>
      </div>
      <h4>
        Your Lucky number: <span> {{ chosenNum }}</span>
      </h4>
      <button :disabled="isGameStarted || !loggedinUser" @click="startLottery">
        Start playing
      </button>
      <router-link to="/login" v-if="!loggedinUser"
        >* login to play</router-link
      >
    </section>
    <LotteryNums
      v-if="isGameStarted"
      :winningNums="winningNums"
      :chosenNum="chosenNum"
      :isWin="isWin"
    />
    <WinLoseModal
      v-if="showGameModal"
      :isWin="isWin"
      :amount="amount"
      @onRestartGame="restartGame"
      :loggedinUserBalance="loggedinUser.coins"
    />
  </section>
</template>

<script>
import { utilService } from "@/services/util.service";
import NumPicker from "@/components/lottery/NumPicker";
import LotteryNums from "@/components/lottery/LotteryNums";
import WinLoseModal from "@/components/lottery/WinLoseModal";
import { showUserMsg } from "@/services/eventBus.service";

export default {
  data() {
    return {
      amount: 0.1,
      chosenNum: 5,
      winningNums: null,
      isGameStarted: false,
      showGameModal: false,
      isWin: null,
    };
  },
  created() {
    this.winningNums = utilService.getRandomArray().splice(0, 5);
  },
  methods: {
    setNum(num) {
      this.chosenNum = num;
    },
    startLottery() {
      if (this.amount > this.loggedinUser.coins) {
        showUserMsg("not enough coins!", "danger");
        return;
      }
      if (this.checkVictory()) {
        this.isWin = true;
      } else this.isWin = false;
      this.transferCoins();
      this.onShowGameModal();
      this.isGameStarted = true;
    },
    async transferCoins() {
      await this.$store.dispatch({
        type: "addMove",
        contact: null,
        amount: this.isWin ? this.amount : -this.amount,
      });
    },
    onShowGameModal() {
      setTimeout(() => {
        this.showGameModal = true;
      }, 4000);
    },
    checkVictory() {
      return this.winningNums.some(
        (winningNum) => winningNum === this.chosenNum
      );
    },
    restartGame() {
      this.winningNums = utilService.getRandomArray().splice(0, 5);
      this.isGameStarted = false;
      this.showGameModal = false;
      this.isWin = null;
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  components: {
    NumPicker,
    LotteryNums,
    WinLoseModal,
  },
};
</script>


