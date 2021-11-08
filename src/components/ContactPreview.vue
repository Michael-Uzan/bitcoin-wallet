<template>
  <section class="contact-preview">
    <RouterLink class="flex align-center" :to="`/contact/${contact._id}`">
      <img :src="contact.avatar" />
      <div>
        <h3>{{ contact.name }}</h3>
        <h4>{{ contact.email }}</h4>
        <h4>{{ contact.location }}</h4>
      </div>
    </RouterLink>
    <hr />
  </section>
</template>

<script>
export default {
  name: "ContactPreview",
  props: ["contact"],
};
</script>
