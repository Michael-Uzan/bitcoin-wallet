<template>
  <section class="user-edit">
    <template v-if="user">
      <div class="btn-nav flex space-between">
        <router-link :to="`/user/${loggedinUser._id}`"> Back </router-link>
      </div>
      <section class="flex align-center direction-col">
        <form v-if="user" @submit.prevent="save" class="flex direction-col">
          <div>
            <input
              type="text"
              id="name"
              v-model="user.name"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="text"
              id="email"
              v-model="user.email"
              placeholder="email"
            />
          </div>
          <div>
            <input
              type="password"
              id="pass"
              v-model="user.password"
              placeholder="Pass"
            />
          </div>
          <button>Save</button>
        </form>
      </section>
    </template>
    <template v-else>
      <Loading></Loading>
    </template>
  </section>
</template>

<script>
import { showUserMsg } from "@/services/eventBus.service";
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
  },
  methods: {
    async save() {
      await this.$store.dispatch({ type: "saveUser", user: this.user });
      showUserMsg("Saved succesfully!");
      this.$router.push("/contacts");
    },
  },
  components: {
    Loading,
  },
};
</script>

