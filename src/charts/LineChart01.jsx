import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  tension: 0.3,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Activities ",
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Total Sales",
      data: [
        10000, 20000, 15000, 12000, 14000, 18000, 20000, 12000, 8000, 3000,
        9000, 1000,
      ],
      borderColor: "#ed8900",
      backgroundColor: "#RRGGBB",
    },
    {
      label: "Total Purchases",
      data: [
        1000, 21000, 10000, 1000, 20000, 19000, 2000, 11000, 10000, 25000, 7000,
        2000,
      ],
      borderColor: "#RRGGBB",
      backgroundColor: "#ed8900",
    },
  ],
};

export default function LineCart01() {
  return <Line options={options} data={data} />;
}
