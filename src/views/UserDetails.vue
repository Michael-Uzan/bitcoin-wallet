<template>
  <section class="user-details">
    <template v-if="user">
      <section class="content-countainer">
        <div class="btn-nav flex space-between">
          <router-link :to="`/`"> Back </router-link>
          <router-link :to="`/user/edit/${loggedinUser._id}`">Edit</router-link>
        </div>
        <section class="details">
          <h1 class="tac">{{ user.name }}</h1>
          <ul class="clean-list">
            <li>Email : {{ user.email }}</li>
            <li>Balance : ₿ {{ userBalance }}</li>
          </ul>
        </section>
      </section>
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
