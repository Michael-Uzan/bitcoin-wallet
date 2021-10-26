<script>
import { Bar } from "vue-chartjs";

export default {
  props: ["chartData"],
  extends: Bar,
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
              borderColor: "#f50057",
              backgroundColor: "#f50057",
              borderWidth: 1,
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
