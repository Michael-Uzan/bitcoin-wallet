<template>
  <section class="contact-app">
    <h1>
      Contacts <span v-if="loggedinUser">({{ contactsCount }} contacts)</span>
    </h1>
    <template v-if="loggedinUser">
      <RouterLink to="/contact/edit/">Add contact</RouterLink>
      <ContactFilter @setFilter="setFilter" />
      <ContactsList :contacts="contactsToShow" />
      <h2 v-if="!contactsToShow.length">Sorry, no result for your Search...</h2>
    </template>
    <template v-else>
      <h1>Login to see contacts</h1>
      <router-link to="/login">Login</router-link>
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
