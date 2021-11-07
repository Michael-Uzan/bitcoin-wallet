<template>
  <section class="user-edit">
    <template v-if="user">
      <h1>Edit user</h1>
      <form v-if="user" @submit.prevent="save" class="flex column align-center">
        <div>
          <label for="name">Name: </label>
          <input type="text" id="name" v-model="user.name" placeholder="Name" />
        </div>
        <div>
          <label for="email">Email: </label>
          <input
            type="text"
            id="email"
            v-model="user.email"
            placeholder="email"
          />
        </div>
        <div>
          <label for="pass">Password: </label>
          <input
            type="password"
            id="pass"
            v-model="user.password"
            placeholder="Pass"
          />
        </div>
        <button>Save</button>
      </form>
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

