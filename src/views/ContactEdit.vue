<template>
  <section class="contact-details">
    <template v-if="contactToEdit">
      <RouterLink :to="`/contacts/`">Back</RouterLink>
      <h1 v-if="isEdit">Contact Edit</h1>
      <h1 v-else>New Contact</h1>
      <img :src="contactToEdit.avatar" />
      <form @submit.prevent="saveContact">
        <input
          v-model.trim="contactToEdit.name"
          type="text"
          placeholder="name"
        />
        <input
          v-model.trim="contactToEdit.phone"
          type="text"
          placeholder="phone"
        />
        <input
          v-model.trim="contactToEdit.email"
          type="text"
          placeholder="email"
        />
        <button>Save!</button>
      </form>
    </template>
    <template v-else>
      <Loading></Loading>
    </template>
  </section>
</template>

<script>
import { contactsService } from "../services/contacts.service.js";
import Loading from "@/components/Loading";

export default {
  name: "ContactEdit",
  data() {
    return {
      contactToEdit: null,
      isEdit: false,
    };
  },
  created() {
    this.loadContact();
  },
  methods: {
    async loadContact() {
      try {
        const { contactId } = this.$route.params;
        this.contactToEdit = contactId
          ? await contactsService.getById(contactId)
          : await contactsService.getEmptyUser();
        this.isEdit = contactId ? true : false;
      } catch (err) {
        console.log("error load contact", err);
      }
    },
    async saveContact() {
      try {
        console.log("contactToEdit", this.contactToEdit);
        await contactsService.save(this.contactToEdit);
      } catch (err) {
        console.log("error saving contact ", err);
      }
    },
  },
  components: {
    Loading,
  },
};
</script>