<template>
  <form class="contact-filter">
    <input
      @input="filter"
      type="search"
      :placeholder="`Search ${contactsCount} contacts`"
      v-model="filterBy.searchStr"
    />
  </form>
</template>

<script>
export default {
  props: ["contactsCount"],
  name: "ContactFilter",
  data() {
    return {
      filterBy: {
        searchStr: "",
      },
    };
  },
  methods: {
    filter() {
      this.$emit("setFilter", { ...this.filterBy });
    },
  },
};
</script>
