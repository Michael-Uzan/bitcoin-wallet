<template>
  <section class="lottery-list">
    <LotteryMovePreview
      v-for="(lotteryMove, idx) in lotteryMovesToShow"
      :lotteryMove="lotteryMove"
      :key="idx"
      :bitCoinRate="bitCoinRate"
    >
    </LotteryMovePreview>
  </section>
</template>

<script>
import LotteryMovePreview from "./LotteryMovePreview.vue";
export default {
  components: { LotteryMovePreview },
  props: ["lotteryMovesToShow", "bitCoinRate"],
};
</script>

