import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library

const ChartComponent = ({ sparklineData }) => {
  useEffect(() => {
    // Create a chart using the sparkline data
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from(Array(sparklineData?.length), (_, i) => i + 1),
        datasets: [{
          label: "Price Trend",
          data: sparklineData,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        }],
      },
    });

    return () => {
      // Cleanup chart when component unmounts
      myChart.destroy();
    };
  }, [sparklineData]);

  return (
    <div>
      <canvas id="myChart" width="700" height="600"></canvas>
    </div>
  );
};

export default ChartComponent;


