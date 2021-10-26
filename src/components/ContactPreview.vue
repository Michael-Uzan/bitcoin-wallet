<template>
  <section>
    <RouterLink :to="`/contact/${contact._id}`">
      <img :src="contact.avatar" />
      <div>
        <h3>{{ contact.name }}</h3>
        <h4>{{ contact.email }}</h4>
        <h4>{{ contact.location }}</h4>
      </div>
    </RouterLink>
  </section>
</template>

<script>
export default {
  name: "ContactPreview",
  props: ["contact"],
};
</script>
