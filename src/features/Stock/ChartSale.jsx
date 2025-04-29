import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
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
const CardChartSale = ({ saleGroup }) => {
  const [saleName, setSaleName] = useState([]);
  const [saleBalance, setSaleBalance] = useState([]);
  useEffect(() => {
    if (saleGroup && saleGroup.length > 0) {
      saleGroup.sort((a, b) => a.SaleBalance - b.SaleBalance);
      setSaleName(saleGroup.map((el) => el.SaleName));
      setSaleBalance(saleGroup.map((el) => el.SaleBalance));
    }
  }, [saleGroup]);
  const data = {
    labels: saleName,
    datasets: [
      {
        label: "Sales",
        data: saleBalance,
        borderColor: "#1c64f2",
        backgroundColor: "#7b9ff9",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        barThickness: 5,
        maxBarThickness: 15,
      },
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
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default CardChartSale;
