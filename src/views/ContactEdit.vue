<template>
  <section class="contact-edit">
    <div class="btn-nav flex space-between">
      <RouterLink :to="`/contacts/`">Back</RouterLink>
    </div>
    <template v-if="contactToEdit">
      <h1 v-if="isEdit">Contact Edit</h1>
      <h1 v-else>New Contact</h1>
      <section class="flex align-center direction-col">
        <img :src="contactToEdit.avatar" />
        <form @submit.prevent="saveContact" class="flex direction-col">
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
          <button>Save</button>
        </form>
      </section>
    </template>
    <template v-else>
      <Loading></Loading>
    </template>
  </section>
</template>

<script>
import { contactsService } from "../services/contacts.service.js";
import Loading from "@/components/Loading";
import { showUserMsg } from "@/services/eventBus.service";

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
        await contactsService.save(this.contactToEdit);
        showUserMsg("Cobtact saved!");
      } catch (err) {
        showUserMsg("Cant save contact!", "danger");
        console.log("error saving contact ", err);
      }
    },
  },
  components: {
    Loading,
  },
};
</script>