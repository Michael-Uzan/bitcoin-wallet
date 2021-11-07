<template>
  <section class="lottery">
    <h1>Lets play lottery!</h1>
    <NumPicker @chooseNum="setNum" :chosenNum="chosenNum" />
    <div>
      <div>
        <label for="amount">Amount: </label>
        <input
          type="number"
          :placeholder="`Amount ₿`"
          v-model.number="amount"
          id="amount"
          min="0.1"
          :disabled="isGameStarted"
          required
        />
      </div>
    </div>
    <span> Your Lucky number: {{ chosenNum }} </span>
    <button :disabled="isGameStarted" @click="startLottery">
      Start playing
    </button>
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
    this.winningNums = utilService.getRandomArray().splice(0, 6);
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
        amount: this.amount,
      });
    },
    onShowGameModal() {
      setTimeout(() => {
        this.showGameModal = true;
      }, 5000);
    },
    checkVictory() {
      return this.winningNums.some(
        (winningNum) => winningNum === this.chosenNum
      );
    },
    restartGame() {
      this.winningNums = utilService.getRandomArray().splice(0, 6);
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


