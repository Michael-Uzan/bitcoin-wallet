<template>
  <section class="transfer-list">
    <h4 v-if="!isToUser" class="tac">Last moves to {{ toName }}</h4>
    <ul class="clean-list">
      <li v-for="move in movesToShow" :key="move.at">
        <MovePreview
          :move="move"
          :isToUser="isToUser"
          :bitCoinRate="bitCoinRate"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import MovePreview from "@/components/MovePreview";
export default {
  props: ["movesToShow", "isToUser", "bitCoinRate"],
  computed: {
    toName() {
      return this.movesToShow[0].to;
    },
  },
  components: {
    MovePreview,
  },
};
</script>

