<template>
  <section class="num-picker">
    <div v-for="num in nums" :key="num">
      <div
        @click="$emit('chooseNum', num)"
        :class="chosenNumClass(num)"
        class="num"
      >
        {{ num }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["chosenNum"],
  data() {
    return {
      nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  methods: {
    chosenNumClass(num) {
      if (num === this.chosenNum) return "choosen-num";
      else return "";
    },
  },
};
</script>

