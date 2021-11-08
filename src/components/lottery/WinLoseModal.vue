<template>
  <section class="win-lose-modal flex align-center direction-col">
    <h4 v-if="isWin">You Win! {{ amount }} ₿</h4>
    <h4 v-else>Sorry, you Lose {{ amount }} ₿</h4>
    <p>Your Current Blalnce: {{ loggedinUserBalance.toFixed(2) }} ₿</p>
    <button @click="$emit('onRestartGame')">Play again</button>
  </section>
</template>

<script>
export default {
  props: ["isWin", "amount", "loggedinUserBalance"],
};
</script>
