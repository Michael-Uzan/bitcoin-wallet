<template>
  <section class="lottery-nums">
    <div v-for="(num, idx) in winningNums" :key="num">
      <div :class="`num ${showNums[idx]} ${winningClass(num)}`">
        {{ num }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["winningNums", "chosenNum", "isWin"],
  data() {
    return {
      showNums: Array(this.winLen).fill(""),
    };
  },
  mounted() {
    for (let i = 0; i < this.winLen; i++) {
      setTimeout(() => {
        this.showNums[i] = "show";
        this.showNums = [...this.showNums];
      }, 800 * i);
    }
  },
  computed: {
    winLen() {
      return this.winningNums.length;
    },
  },
  methods: {
    winningClass(num) {
      if (this.isWin && this.chosenNum === num) return "win-num";
      else return "";
    },
  },
};
</script>

