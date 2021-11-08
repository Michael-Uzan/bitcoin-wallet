<template>
  <section class="lottery-move-preview" :class="moveClass">
    <h4>
      <span> You {{ winOrLose }}: </span>
      <span>{{ Math.abs(lotteryMove.amount) }} ₿</span> | $
      {{ amountConvertedToDollar }}
    </h4>
    <h5>{{ moveDate }}</h5>
    <hr />
  </section>
</template>

<script>
export default {
  props: ["lotteryMove", "bitCoinRate"],
  computed: {
    winOrLose() {
      if (this.lotteryMove.amount > 0) return "Won";
      else return "Lose";
    },
    moveClass() {
      if (this.lotteryMove.amount > 0) return "win";
      else return "lose";
    },
    moveDate() {
      return new Date(this.lotteryMove.at).toLocaleString();
    },
    amountConvertedToDollar() {
      return (this.lotteryMove.amount / this.bitCoinRate).toLocaleString(
        "en-GB",
        {
          maximumFractionDigits: 0,
        }
      );
    },
  },
};
</script>

<style>
</style>