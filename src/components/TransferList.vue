<template>
  <section class="transfer-list">
    <h2>Last moves to {{ toName }}</h2>
    <ul class="clean-list">
      <li v-for="move in movesToShow" :key="move.at">
        <MovePreview :move="move" />
      </li>
    </ul>
  </section>
</template>

<script>
import MovePreview from "@/components/MovePreview";
export default {
  props: ["movesToShow"],
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

