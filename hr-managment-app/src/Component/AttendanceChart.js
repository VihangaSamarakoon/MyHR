import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function AttendanceChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Attendance',
            data: data.values,
            backgroundColor: '#0d0c22',
            borderColor: '#0d0c22',
            borderWidth: 1,
            barThickness: 50
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 12,
                usePointStyle: true
              }
            }
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10
            }
          },
          font: {
            weight: 'bold'
          }
        }
      });
    }
  }, [data]);

  return <canvas ref={chartRef} className="attendance-chart-canvas" />;
}

export default AttendanceChart;
