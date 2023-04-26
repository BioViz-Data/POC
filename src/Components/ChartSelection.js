import React from 'react';

const ChartSelection = ({ chartTypes, setChartType }) => {
  const handleSelectionChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <div>
      <label htmlFor="chart-type">Select a chart type:</label>
      <select id="chart-type" onChange={handleSelectionChange}>
        <option value="">Select</option>
        {chartTypes.map((chartType) => (
          <option key={chartType} value={chartType}>
            {chartType}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChartSelection;
