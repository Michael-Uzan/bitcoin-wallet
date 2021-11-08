<template>
  <section class="contact-app">
    <template v-if="loggedinUser">
      <ContactFilter @setFilter="setFilter" :contactsCount="contactsCount" />
      <ContactsList :contacts="contactsToShow" />
      <h2 class="no-result" v-if="!contactsToShow.length">
        Sorry, no result for your Search...
      </h2>
      <RouterLink class="btn-add-contact" to="/contact/edit/">+</RouterLink>
    </template>
    <template v-else>
      <router-link to="/login"><h1>Login to see contacts</h1></router-link>
    </template>
  </section>
</template>

<script>
import { contactsService } from "../services/contacts.service.js";
import ContactsList from "../components/ContactsList.vue";
import ContactFilter from "../components/ContactFilter.vue";

export default {
  name: "ContactApp",
  data() {
    return {
      contacts: [],
      filterBy: null,
    };
  },
  async created() {
    this.contacts = await contactsService.query();
  },
  computed: {
    contactsCount() {
      return this.contacts.length;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    contactsToShow() {
      if (!this.filterBy) return this.contacts;
      const regex = new RegExp(this.filterBy.searchStr, "i");
      const contactsToShow = this.contacts.filter((contact) => {
        return (
          regex.test(contact.name) ||
          regex.test(contact.location) ||
          regex.test(contact.email)
        );
      });
      return contactsToShow;
    },
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  components: {
    ContactsList,
    ContactFilter,
  },
};
</script>
