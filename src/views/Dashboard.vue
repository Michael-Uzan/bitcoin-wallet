<template>
  <section class="dasboard">
    <h1>Dashboard</h1>
    <h3>Market Price over time (USD)</h3>
    <LineBarTradeVolume :chartData="chartData" />
    <p>Average USD market price across major bitcoin exchanges.</p>
  </section>
</template>

<script>
import LineBarTradeVolume from "../components/LineBarTradeVolume.vue";
import { bitcoinService } from "@/services/bitcoin.service.js";
export default {
  data() {
    return {
      chartData: null,
    };
  },
  created() {
    this.getChartData();
  },
  methods: {
    async getChartData() {
      this.chartData = await bitcoinService.getMarketPrice();
    },
  },
  components: {
    LineBarTradeVolume,
  },
};
</script>
