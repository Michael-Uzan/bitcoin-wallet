<template>
  <form>
    <input
      @input="filter"
      type="search"
      placeholder="Search contact"
      v-model="filterBy.searchStr"
    />
  </form>
</template>

<script>
export default {
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
