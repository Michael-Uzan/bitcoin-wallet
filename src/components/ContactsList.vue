<template>
  <ul>
    <li v-for="contact in contacts" :key="contact._id">
      <ContactPreview :contact="contact" />
    </li>
  </ul>
</template>

<script>
import ContactPreview from "./ContactPreview.vue";

export default {
  name: "ContactsList",
  props: ["contacts"],
  components: {
    ContactPreview,
  },
};
</script>
