<template>
  <section class="lottery-nums">
    <div
      v-for="(num, idx) in winningNums"
      :key="num"
      class="flex align-center justify-center"
    >
      <div
        :class="`num ${showNums[idx]} ${showResult && winningClass(num)}`"
        class="flex align-center justify-center"
      >
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
      showResult: false,
    };
  },
  mounted() {
    for (let i = 0; i < this.winLen; i++) {
      setTimeout(() => {
        this.showNums[i] = "show";
        this.showNums = [...this.showNums];
      }, 800 * i);
    }
    setTimeout(() => {
      this.showResult = true;
    }, 4000);
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

