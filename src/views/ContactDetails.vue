<template>
  <section class="contact-details">
    <template v-if="contact">
      <button @click="deleteContact(contact._id)">Delete</button>
      <RouterLink :to="`/contact/edit/${contact._id}`"> Edit </RouterLink>
      <RouterLink :to="`/contacts/`"> Back </RouterLink>
      <h2>{{ contact.name }}</h2>
      <img :src="contact.avatar" />
      <h4>Contact:</h4>
      <ul>
        <li>Email: {{ contact.email }}</li>
        <li>Phone: {{ contact.phone }}</li>
        <li>Age: {{ contact.age }}</li>
        <li>Gender: {{ contact.gender }}</li>
      </ul>
      <p>From {{ contact.location }}</p>
      <TransferCoins :contact="contact" @onTransferCoins="onTransferCoins" />
      <TransferList v-if="movesToShow.length" :movesToShow="movesToShow" />
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

export default {
  data() {
    return {
      contact: null,
    };
  },
  created() {
    this.loadContact();
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
