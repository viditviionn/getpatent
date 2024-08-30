import React, { useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryLabel } from "victory";
import { sampleData } from "../hooks/mock";
import { Modal } from "@mui/material";
import { PatentDetailModal } from "./PatentDetailModal";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const processCategoryData = (data: any) => {
  const categoryCount: any = {};

  data.forEach((patent: any) => {
    const category = patent.index;
    if (categoryCount[category]) {
      categoryCount[category].count++;
      categoryCount[category].patents.push(patent); // Store patent details
    } else {
      categoryCount[category] = { count: 1, color: getRandomColor(), patents: [patent] };
    }
  });

  return Object.keys(categoryCount).map((category) => ({
    category,
    count: categoryCount[category].count,
    color: categoryCount[category].color,
    patents: categoryCount[category].patents, // Include patents in data
  }));
};

const CategoryChart = () => {
  const data = processCategoryData(sampleData);
  const [open, setOpen] = useState(false);
  const [selectedPatents, setSelectedPatents] = useState([]);

  const handleBarClick = (patents: any) => {
    setSelectedPatents(patents);
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto", display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}>
      {/* <h4>Technology Focus Distribution</h4> */}
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryLabel
          text="Technology Focus Distribution"
          x={170}
          y={20}
          textAnchor="middle"
          style={{ fontSize: 15, fontWeight: 'bold' }}
        />
        <VictoryAxis
          dependentAxis tickFormat={(x: any) => `${x}`}
          label="Number of Patents"
          axisLabelComponent={<VictoryLabel dy={-20} />}
        />
        <VictoryAxis
          tickValues={data.map((d) => d.category)}
          tickFormat={data.map((d) => d.category)}
          label="Technology category"
          axisLabelComponent={<VictoryLabel dy={20} />}
        />

        <VictoryBar
          data={data}
          x="category"
          y="count"
          labels={({ datum }) => `${datum.count} patent(s)`}
          labelComponent={<VictoryTooltip />}
          style={{ data: { fill: ({ datum }) => datum.color, cursor: "pointer" } }}
          events={[{
            target: "data",
            eventHandlers: {
              onClick: (evt, clickedProps) => handleBarClick(clickedProps.datum.patents),
            },
          }]}
        />
      </VictoryChart>
      <PatentDetailModal
        handleCloseModal={handleCloseModal}
        selectedPatents={selectedPatents}
        open={open}
      />
    </div>
  );
};

export default CategoryChart;
