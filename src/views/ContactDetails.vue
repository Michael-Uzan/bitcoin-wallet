<template>
  <section v-if="contact" class="contact-details">
    <button @click="deleteContact(contact._id)">delete</button>
    <RouterLink :to="`/contact/edit/${contact._id}`"> Edit </RouterLink>
    <RouterLink :to="`/contacts/`"> Back </RouterLink>
    <h2>{{ contact.name }}</h2>
    <img :src="contact.avatar" />
    <h4>Contact:</h4>
    <ul>
      <li>Email: {{ contact.email }}</li>
      <li>Phone: {{ contact.phone }}</li>
    </ul>
    <p>From {{ contact.location }}</p>
    <TransferCoins :contact="contact" @onTransferCoins="onTransferCoins" />
  </section>
</template>

<script>
import { contactsService } from "../services/contacts.service.js";
import { showUserMsg } from "@/services/eventBus.service";
import TransferCoins from "@/components/TransferCoins";
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
    onTransferCoins(amount) {
      console.log("amount", amount);
    },
  },
  components: {
    TransferCoins,
  },
};
</script>
