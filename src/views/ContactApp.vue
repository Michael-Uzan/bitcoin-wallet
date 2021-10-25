<template>
  <section class="contact-app">
    <h1>Contacts</h1>
    <template v-if="loggedinUser">
      <RouterLink to="contact/edit/">Add contact</RouterLink>
      <ContactFilter @setFilter="setFilter" />
      <ContactsList :contacts="contactsToShow" />
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
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    contactsToShow() {
      if (!this.filterBy) return this.contacts;
      const contactsToShow = this.contacts.filter((contact) => {
        const scarchKey = this.filterBy.searchStr.toLowerCase();
        return (
          contact.name.toLowerCase().includes(scarchKey) ||
          contact.location.toLowerCase().includes(scarchKey)
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
