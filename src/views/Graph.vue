<template>
  <v-container>
    <!-- RWD -->
    <h2 class="h2">Vue-Chart-3 Testing</h2>
    <v-row class="mb-6" no-gutters>
      <v-col cols="6" sm="12" md="6">
        <DoughnutChart v-bind="doughnutChartProps"
      /></v-col>
      <v-col cols="6" sm="12" md="6">
        <BarChart v-bind="barChartProps"
      /></v-col>
    </v-row>
    <v-row class="mb-6" no-gutters>
      <v-col cols="6" sm="12" md="6"
        ><LineChart v-bind="lineChartProps"
      /></v-col>
      <v-col cols="6" sm="12" md="6"
        ><RadarChart v-bind="radarChartProps"
      /></v-col>
    </v-row>

    <div style="display: flex; justify-content: center">
      <v-btn class="button" color="warning" @click="shuffleData">Shuffle</v-btn>
      <v-btn class="button" color="warning" @click="switchLegend"
        >Swicth legends</v-btn
      >
      <v-btn class="button" color="warning" @click="AddDataSet"
        >Add DataSet</v-btn
      >
      <v-btn class="button" color="warning" @click="RemoveDataSet"
        >Remove DataSet</v-btn
      >
    </div>
  </v-container>
</template>


<script>
import { computed, ref } from "vue";
import { shuffle } from "lodash";
import {
  DoughnutChart,
  useDoughnutChart,
  BarChart,
  useBarChart,
  LineChart,
  useLineChart,
  RadarChart,
  useRadarChart,
} from "vue-chart-3";
import { Chart, registerables } from "chart.js"; //, ChartData, ChartOptions
Chart.register(...registerables);
export default {
  data() {
    return {
      values: [],
    };
  },
  name: "GraphView",
  components: { DoughnutChart, BarChart, LineChart, RadarChart },
  setup() {
    const dataValues = ref([30, 40, 60, 70, 5]);
    const datalabel = ref(["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"]);
    const toggleLegend = ref(true);
    const testData = computed(() => ({
      //<ChartData<"doughnut">>
      labels: datalabel.value,
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
        },
      ],
    }));
    let delayed;
    const options = computed(() => ({
      //<ChartOptions<"doughnut">>
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (
            context.type === "data" &&
            context.mode === "default" &&
            !delayed
          ) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      scales: {
        myScale: {
          type: "logarithmic",
          position: toggleLegend.value ? "left" : "right",
        },
      },
      plugins: {
        legend: {
          position: toggleLegend.value ? "top" : "bottom",
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
        },
      },
    }));
    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData: testData,
      options,
    });
    const { barChartProps, barChartRef } = useBarChart({
      chartData: testData,
      options,
    });
    const { lineChartProps, lineChartRef } = useLineChart({
      chartData: testData,
      options,
    });
    const { radarChartProps, radarChartRef } = useRadarChart({
      chartData: testData,
      options,
    });
    function shuffleData() {
      dataValues.value = shuffle(dataValues.value);
      console.log(doughnutChartRef.value.chartInstance);
    }
    function switchLegend() {
      toggleLegend.value = !toggleLegend.value;
    }
    function AddDataSet() {
      console.log(dataValues.value);
      dataValues.value = dataValues.value.push(Math.random() * 100);
      console.log(dataValues.value);
    }
    function RemoveDataSet() {
      console.log(dataValues.value);
      dataValues.value = dataValues.value.pop();
      console.log(dataValues.value);
    }
    return {
      shuffleData,
      switchLegend,
      testData,
      options,
      doughnutChartRef,
      doughnutChartProps,
      AddDataSet,
      RemoveDataSet,
      barChartProps,
      barChartRef,
      lineChartProps,
      lineChartRef,
      radarChartProps,
      radarChartRef,
    };
  },
};
</script>

<style>
button.button {
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
}
</style>