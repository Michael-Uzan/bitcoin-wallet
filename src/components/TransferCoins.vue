<template>
  <section class="transfer-coins">
    <form @submit.prevent="onTransferCoins">
      <input
        type="number"
        :placeholder="`Transfer to ${contact.name}`"
        v-model.number="amount"
        required
      />
      <button>Transfer</button>
    </form>
    <div>Your Current Balance: {{ loggedinUser.coins }} BITs</div>
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
      if (this.amount <= 0) {
        showUserMsg("incorrect aomunt, try again!", "danger");
        this.amount = null;
        return;
      } else if (this.amount > this.loggedinUser.coins) {
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

