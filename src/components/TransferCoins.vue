<template>
  <section class="transfer-coins">
    <form @submit.prevent="$emit('onTransferCoins', amount)">
      <input
        type="number"
        :placeholder="`Transfer to ${contact.name}`"
        v-model="amount"
        required
      />
      <button>Transfer</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      amount: null,
    };
  },
  props: ["contact"],
};
</script>

