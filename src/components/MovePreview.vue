<template>
  <div class="move-preview">
    <h4 class="to" v-if="isToUser">To {{ move.to }}</h4>
    <h4>
      <span>{{ move.amount }} ₿</span> | $ {{ amountConvertedToDollar }}
    </h4>
    <h5>{{ new Date(move.at).toLocaleString() }}</h5>
    <hr />
  </div>
</template>

<script>
export default {
  props: ["move", "isToUser", "bitCoinRate"],
  computed: {
    amountConvertedToDollar() {
      return (this.move.amount / this.bitCoinRate).toLocaleString("en-GB", {
        maximumFractionDigits: 0,
      });
    },
  },
};
</script>

