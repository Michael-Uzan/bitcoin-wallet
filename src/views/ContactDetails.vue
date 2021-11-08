<template>
  <section class="contact-details">
    <template v-if="contact">
      <div class="btn-nav flex space-between">
        <RouterLink :to="`/contacts/`"> Back </RouterLink>
        <RouterLink :to="`/contact/edit/${contact._id}`"> Edit </RouterLink>
      </div>
      <section class="contact flex align-center direction-col">
        <img :src="contact.avatar" />
        <h2 class="contact-name">{{ contact.name }}</h2>
        <ul class="clean-list">
          <li>Phone: {{ contact.phone }}</li>
          <li>Email: {{ contact.email }}</li>
          <li>Age: {{ contact.age }}</li>
          <li>Gender: {{ contact.gender }}</li>
          <li>From {{ contact.location }}</li>
          <li><button @click="deleteContact(contact._id)">Delete</button></li>
        </ul>
      </section>
      <TransferCoins :contact="contact" @onTransferCoins="onTransferCoins" />
      <TransferList
        v-if="movesToShow.length"
        :movesToShow="movesToShow"
        :bitCoinRate="bitCoinRate"
      />
    </template>
    <template v-else>
      <Loading></Loading>
    </template>
  </section>
</template>

<script>
import { contactsService } from "../services/contacts.service.js";
import { showUserMsg } from "@/services/eventBus.service";
import TransferCoins from "@/components/TransferCoins";
import TransferList from "@/components/TransferList";
import Loading from "@/components/Loading";
import { bitcoinService } from "../services/bitcoin.service";

export default {
  data() {
    return {
      contact: null,
      bitCoinRate: 0,
    };
  },
  async created() {
    this.loadContact();
    this.bitCoinRate = await bitcoinService.getBitcoinRate();
  },
  methods: {
    async loadContact() {
      try {
        const { contactId } = this.$route.params;
        this.contact = await contactsService.getById(contactId);
      } catch (err) {
        console.log("error load contact", err);
      }
    },
    async deleteContact(contactId) {
      await contactsService.deleteContact(contactId);
      this.$router.push("/contacts");
      showUserMsg("deleted succesfully");
    },
    async onTransferCoins(amount) {
      await this.$store.dispatch({
        type: "addMove",
        contact: this.contact,
        amount,
      });
      showUserMsg("Transfer complete succesfully");
    },
  },
  computed: {
    movesToShow() {
      const loggedinUser = this.$store.getters.loggedinUser;
      return loggedinUser.moves.filter(
        (move) => move.toId === this.contact._id
      );
    },
  },
  components: {
    TransferCoins,
    TransferList,
    Loading,
  },
};
</script>
