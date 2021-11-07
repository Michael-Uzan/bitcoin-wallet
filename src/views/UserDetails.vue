<template>
  <section class="user-details">
    <template v-if="user">
      <h1>User Details</h1>
      <router-link :to="`/user/edit/${loggedinUser._id}`">Edit</router-link>
      <p>Name : {{ user.name }}</p>
      <p>Email : {{ user.email }}</p>
      <p>Balance : {{ userBalance }} ₿</p>
    </template>
    <template v-else>
      <Loading></Loading>
    </template>
  </section>
</template>

<script>
import { userService } from "@/services/user.service";
import Loading from "@/components/Loading";

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    const { userId } = this.$route.params;
    const user = await userService.getById(userId);
    if (user && user._id === this.loggedinUser._id) this.user = user;
    else this.$router.push("/");
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    userBalance() {
      return this.loggedinUser.coins.toLocaleString("en-GB", {
        maximumFractionDigits: 2,
      });
    },
  },
  components: {
    Loading,
  },
};
</script>
