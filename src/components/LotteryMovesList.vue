<template>
  <section class="lottery-list">
    <pre>
    {{ lotteryMovesToShow }}
      </pre
    >
  </section>
</template>

<script>
export default {
  props: ["lotteryMovesToShow"],
};
</script>

