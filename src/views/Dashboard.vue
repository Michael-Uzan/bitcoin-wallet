<template>
  <section class="dasboard">
    <div class="chart1">
      <h3>Market Price over time (USD)</h3>
      <ChartLineMatketPrice :chartData="chartDataMarket" />
      <p>Average USD market price across major bitcoin exchanges.</p>
    </div>
    <div class="chart2">
      <h3>Trade Volume (USD)</h3>
      <ChartBarTradeVolume :chartData="chartDataTrade" />
      <p>The total USD value of trading volume on major bitcoin exchanges.</p>
    </div>
  </section>
</template>

<script>
import ChartLineMatketPrice from "../components/ChartLineMatketPrice.vue";
import ChartBarTradeVolume from "../components/ChartBarTradeVolume";
import { bitcoinService } from "@/services/bitcoin.service.js";

export default {
  data() {
    return {
      chartDataMarket: null,
      chartDataTrade: null,
    };
  },
  created() {
    this.getChartDataMarket();
    this.getChartDataTrade();
  },
  methods: {
    async getChartDataMarket() {
      this.chartDataMarket = await bitcoinService.getMarketPrice();
    },
    async getChartDataTrade() {
      this.chartDataTrade = await bitcoinService.getTradeVolume();
    },
  },
  components: {
    ChartLineMatketPrice,
    ChartBarTradeVolume,
  },
};
</script>
