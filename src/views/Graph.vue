<template>
  <v-container>
    <!-- RWD -->
    <h2 class="h2">Garbage Record Data Analysis</h2>
    <!-- <v-row class="mb6" no-gutters>
      <v-col cols="0" xs="0" sm="0" md="3" lg="3"> </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <DoughnutChart v-bind="MainProps" />
      </v-col>
      <v-col cols="0" xs="0" sm="0" md="3" lg="3"> </v-col>
    </v-row> -->
    <v-row class="mb-6" no-gutters>
      <v-col cols="6" sm="12" md="6">
         <DoughnutChart v-bind="MainProps" /></v-col>
      <v-col cols="6" sm="12" md="6">
        <BarChart v-bind="BarProps"
      /></v-col>
    </v-row>
    <v-row class="mb-6" no-gutters>
      <v-col cols="6" sm="12" md="6"
        ><LineChart v-bind="LineProps"
      /></v-col>
      <v-col cols="6" sm="12" md="6"
        ><RadarChart v-bind="RadarProps"
      /></v-col>
    </v-row>

    <div style="display: flex; justify-content: center">
      <v-btn class="button" color="warning" @click="shuffleData">Shuffle</v-btn>
      <v-btn class="button" color="warning" @click="switchLegend"
        >Swicth legends</v-btn
      >
      <!-- <v-btn class="button" color="warning" @click="AddDataSet"
        >Add DataSet</v-btn
      >
      <v-btn class="button" color="warning" @click="RemoveDataSet"
        >Remove DataSet</v-btn
      > -->
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
let totalAmountArray = ref([]);
let totalName = ref(["Plastic", "IronCan", "Paper", "ALCan"]);
Chart.register(...registerables);
export default {
  data() {
    return {
      values: [],
      mainPlastic: [],
      mainIroncan: [],
      mainPaper: [],
      mainALcan: [],
      totalPlastic: 0,
      totalIroncan: 0,
      totalPaper: 0,
      totalALcan: 0,
    };
  },
  name: "GraphView",
  components: { DoughnutChart, BarChart, LineChart, RadarChart },
  setup() {
    const dataValues = ref([30, 40, 60, 70, 5]);
    const datalabel = ref(["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"]);
    const toggleLegend = ref(true);
    const MainData = computed(() => ({
      labels: totalName.value,
      datasets: [
        {
          data: totalAmountArray.value,
          backgroundColor: ["#E63F00", "#FFAA33", "#BBFF66", "#009FCC"],
        },
      ],
    }));
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
          text: "Total Recycling Record Doughnut Chart",
        },
      },
    }));
    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData: testData,
      options,
    });
    const { radarChartProps, radarChartRef } = useRadarChart({
      chartData: testData,
      options,
    });
    //doughnutChart
    let MainProps = useDoughnutChart({
      chartData: MainData,
      options,
    }).doughnutChartProps;
    let MainRef = useDoughnutChart({
      chartData: MainData,
      options,
    }).doughnutChartRef;
    //barChart
    let BarProps = useBarChart({
      chartData: MainData,
      options,
    }).barChartProps;
    let BarRef = useBarChart({
      chartData: MainData,
      options,
    }).barChartRef;
    //LineChart
    let LineProps = useLineChart({
      chartData: MainData,
      options,
    }).lineChartProps;
    let LineRef = useLineChart({
      chartData: MainData,
      options,
    }).lineChartRef;
    //RadarChart
    let RadarProps = useRadarChart({
      chartData: MainData,
      options,
    }).radarChartProps;
    let RadarRef = useRadarChart({
      chartData: MainData,
      options,
    }).radarChartRef;
    function shuffleData() {
      dataValues.value = shuffle(dataValues.value);
      totalAmountArray.value = shuffle(totalAmountArray.value);
    }
    function switchLegend() {
      toggleLegend.value = !toggleLegend.value;
    }
    function AddDataSet() {
      dataValues.value.push(Math.random() * 100);
      datalabel.value.push("Test" + Math.floor(Math.random() * 100));
    }
    function RemoveDataSet() {
      dataValues.value.pop();
      datalabel.value.pop();
    }
    return {
      shuffleData,
      switchLegend,
      testData,
      options,
      AddDataSet,
      RemoveDataSet,
      MainProps,
      MainRef,
      BarProps,
      BarRef,
      LineProps,
      LineRef,
      RadarProps,
      RadarRef,
    };
  },
  beforeMount() {
    this.axios
      .get("/api/garbage_records/")
      .then((res) => {
        let tempPlastic = [];
        let tempIroncan = [];
        let tempPaper = [];
        let tempALcan = [];
        for (let i in res.data) {
          if (res.data[i].garbage_type["id"] == 0) {
            tempPlastic.push(res.data[i]);
            this.totalPlastic += res.data[i].weight;
          } else if (res.data[i].garbage_type["id"] == 1) {
            tempIroncan.push(res.data[i]);
            this.totalIroncan += res.data[i].weight;
          } else if (res.data[i].garbage_type["id"] == 2) {
            tempPaper.push(res.data[i]);
            this.totalPaper += res.data[i].weight;
          } else if (res.data[i].garbage_type["id"] == 3) {
            tempALcan.push(res.data[i]);
            this.totalALcan += res.data[i].weight;
          }
        }
        this.mainPlastic = tempPlastic;
        this.mainIroncan = tempIroncan;
        this.mainPaper = tempPaper;
        this.mainALcan = tempALcan;
        totalAmountArray.value = [
          this.totalPlastic,
          this.totalIroncan,
          this.totalPaper,
          this.totalALcan,
        ];
      })
      .catch((err) => console.log(err));
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