import React from "react";
import { Line } from "react-chartjs-2";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CardChartSale = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Pendapatan",
        data: [30, 45, 25, 60, 50, 70, 90],
        borderColor: "#1c64f2",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3, // Membuat garis lebih halus
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };
  return (
    <>
      {/* card header */}
      <div className="w-full bg-[#1c64f2] p-2">
        <div className="text-2xl text-white text-center">Graphic of Sales</div>
      </div>
      {/* card body */}
      <div className="bg-white p-3 h-[400px] rounded-b-2xl">
        <Line data={data} options={options} className="w-full h-full" />
      </div>
    </>
  );
};

export default CardChartSale;
