
"use client"
import React from 'react';
import ReactApexChart  from "react-apexcharts"



// import dynamic from "next/dynamxic";
// const ReactApexChart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

const series = [
  {
    name: 'Total',
    data: [31, 40, 28, 51, 42, 109, 100]
  },
  {
    name: 'Half-Cut',
    data: [11, 32, 45, 32, 34, 52, 41]
  },
  {
    name: 'Full-Cut',
    data: [13, 62, 25, 42, 44, 22, 11]
  }
];

const options = {
  chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: [
      "2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z"
    ]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
};

const ActivityChart = () => {
  // let isRender = typeof window !== 'undefined';

  return (
    <div className='w-full h-full'>
    <><div id="chart">
        <ReactApexChart  className='w-full' options={options} series={series} type="area" height={250} />
      </div>
      <div id="html-dist"></div></>
    </div>
  );
};

export default ActivityChart;
