<template>
  <section class="user-msg" :class="userMsgClass">
    <h6>{{ msg && msg.txt }}</h6>
  </section>
</template>

<script>
import eventBus, { SHOW_USER_MSG } from "../services/eventBus.service";

export default {
  name: "user-msg",
  data() {
    return {
      msg: null,
    };
  },
  computed: {
    userMsgClass() {
      if (!this.msg) return;
      return {
        [this.msg.type]: true,
        open: this.msg,
      };
    },
  },
  created() {
    eventBus.$on(SHOW_USER_MSG, (msg) => {
      this.msg = msg;
      var delay = 3000;
      setTimeout(() => {
        this.msg = null;
      }, delay);
    });
  },
};
</script>
