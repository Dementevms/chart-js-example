import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import moment from "moment";

import fakeData from "../../fakedata";

Chart.register(zoomPlugin);

const plugin = {
  id: "custom_canvas_background_color",
  beforeDraw: (chart: any) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

const getData = () => {
  const labels: string[] = [];
  const dataset: number[] = [];
  fakeData.forEach((item) => {
    labels.push(moment(item.clock).format("h:mm:ss"));
    dataset.push(item.avg);
  });
  return { labels, dataset };
};

const init = () => {
  const canvas = document.getElementById("myChart") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  const { labels, dataset } = getData();
  return new Chart(ctx!, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "# of Votes",
          data: dataset,
          borderColor: "rgba(0, 200, 255, 0.8)",
          backgroundColor: "rgba(0, 200, 255, 0.1)",
          fill: true,
          cubicInterpolationMode: "monotone",
          tension: 0.4,
        },
      ],
    },
    plugins: [plugin],
    options: {
      elements: {
        point: {
          radius: 2,
        },
      },
      scales: {
        xAxis: {
          grid: { color: "#333" },
          ticks: {
            maxTicksLimit: 10,
            maxRotation: 0,
            minRotation: 0,
            color: "#999",
          },
        },
      },
      plugins: {
        zoom: {
          zoom: {
            drag: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x" as const,
          },
          pan: {
            modifierKey: "ctrl",
          },
        },
      },
    },
  });
};

export default function App() {
  let chart: any = null;

  useEffect(() => {
    chart = init();
  }, []);

  return (
    <div>
      <canvas id="myChart" width="400" height="200"></canvas>
      <button
        onClick={() => {
          chart.resetZoom();
        }}
      >
        ResetZoom
      </button>
    </div>
  );
}
