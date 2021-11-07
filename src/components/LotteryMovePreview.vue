<template>
  <section class="lottery-move-preview" :class="moveClass">
    <h4>You {{ winOrLose }} {{ Math.abs(lotteryMove.amount) }} ₿</h4>
    <h5>{{ moveDate }}</h5>
  </section>
</template>

<script>
export default {
  props: ["lotteryMove"],
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
  },
};
</script>

<style>
</style>