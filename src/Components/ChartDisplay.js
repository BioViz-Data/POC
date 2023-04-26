import React, { useEffect, useState } from 'react';

const ChartDisplay = ({ data, chartType, supersetClient }) => {
    const [chartUrl, setChartUrl] = useState('');
  
    useEffect(() => {
      const generateChart = async () => {
        if (data.length > 0 && chartType) {
          const url = await supersetClient.createChart(data, chartType);
          setChartUrl(url);
        }
      };
  
      generateChart();
    }, [data, chartType, supersetClient]);
  
    return chartUrl ? <iframe src={chartUrl} title={chartType} /> : <p>Select a chart type to display</p>;
  };
  
  export default ChartDisplay;