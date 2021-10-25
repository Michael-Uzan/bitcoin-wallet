<template>
  <div class="move">
    <div v-if="isToUser">To {{ move.to }}</div>
    <h4>{{ move.amount }} {{ move.amount > 1 ? "BITS" : "BIT" }}</h4>
    <h5>{{ new Date(move.at).toLocaleString() }}</h5>
  </div>
</template>

<script>
export default {
  props: ["move", "isToUser"],
};
</script>

