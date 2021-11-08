<template>
  <section class="transfer-coins flex align-center direction-col">
    <form class="flex direction-row" @submit.prevent="onTransferCoins">
      <input
        type="number"
        :placeholder="`Transfer to ${contact.name}`"
        v-model.number="amount"
        min="0.1"
        step="0.1"
        required
      />
      <button>Transfer</button>
    </form>
    <div>Your Current Balance: {{ loggedinUser.coins.toFixed(2) }} BITs</div>
  </section>
</template>

<script>
import { showUserMsg } from "@/services/eventBus.service";
export default {
  data() {
    return {
      amount: null,
    };
  },
  props: ["contact"],
  methods: {
    onTransferCoins() {
      if (this.amount > this.loggedinUser.coins) {
        showUserMsg("not enough coins!", "danger");
        return;
      }
      this.$emit("onTransferCoins", this.amount);
      this.amount = null;
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>

