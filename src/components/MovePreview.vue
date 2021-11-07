<template>
  <div class="move">
    <div v-if="isToUser">To {{ move.to }}</div>
    <h4>{{ move.amount }} ₿</h4>
    <h5>{{ new Date(move.at).toLocaleString() }}</h5>
  </div>
</template>

<script>
export default {
  props: ["move", "isToUser"],
};
</script>

