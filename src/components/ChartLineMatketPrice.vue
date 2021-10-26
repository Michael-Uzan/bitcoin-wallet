<script>
import { Line } from "vue-chartjs";

export default {
  props: ["chartData"],
  extends: Line,
  methods: {
    chartRender() {
      if (!this.chartData) return;
      this.renderChart(
        {
          labels: this.getChartLables,
          datasets: [
            {
              label: "$",
              data: this.getChartValues,
              backgroundColor: "transparent",
              borderColor: "rgba(1, 116, 188, 0.50)",
              pointBackgroundColor: "rgba(171, 71, 188, 1)",
            },
          ],
        },
        {
          legend: { display: false },
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Last 30 Days",
          },
        }
      );
    },
  },
  computed: {
    getChartLables() {
      return this.chartData.map((data) =>
        new Date(data.x * 1000).toLocaleDateString("en-GB")
      );
    },
    getChartValues() {
      return this.chartData.map((data) => data.y);
    },
  },
  watch: {
    chartData: function () {
      this.chartRender();
    },
  },
};
</script>
