import React, { forwardRef, RefObject, useRef, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryLabel } from "victory";
import { Button, Modal } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { sampleData } from "../hooks/mock";
import { PatentDetailModal } from "./PatentDetailModal";

interface PatentChartProps {
  categoryChartRef: RefObject<HTMLDivElement>;
  patentChartRef: RefObject<HTMLDivElement>;
}

const processData = (data: any) => {
  const result: any = {};

  data.forEach((patent: any) => {
    const year = patent.publication_date.split("-")[0];
    if (result[year]) {
      result[year].count++;
      result[year].patents.push(patent);
    } else {
      result[year] = { count: 1, patents: [patent] };
    }
  });

  return Object.keys(result).map((year) => ({
    year,
    count: result[year].count,
    patents: result[year].patents,
  }));
};

  const PatentChart = forwardRef<HTMLDivElement, PatentChartProps>(({ patentChartRef, categoryChartRef }, ref) => {
  const data = processData(sampleData);
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
      <div ref={patentChartRef} style={{ width: "100%" }}> {/* Chart container with ref */}
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryLabel
            text="Patent Publication Timeline"
            x={170}
            y={20}
            textAnchor="middle"
            style={{ fontSize: 15, fontWeight: 'bold' }}
          />

          <VictoryAxis
            tickValues={data.map((d) => d.year)}
            tickFormat={data.map((d) => d.year)}
            label="Publication Year"
            axisLabelComponent={<VictoryLabel dy={20} />}
          />

          <VictoryAxis
            dependentAxis
            tickFormat={(x: any) => (`${x}`)}
            tickValues={Array.from({ length: Math.max(...data.map(d => d.count)) + 1 }, (_, i) => i + 1)}
            label="Number of Patents"
            axisLabelComponent={<VictoryLabel dy={-20} angle={-90} />}
          />
          <VictoryBar
            data={data}
            x="year"
            y="count"
            labels={({ datum }) => `${datum.count} patent(s)`}
            labelComponent={<VictoryTooltip />}
            style={{ data: { fill: "#B0D9ED", cursor: "pointer" } }}
            events={[{
              target: "data",
              eventHandlers: {
                onClick: (evt, clickedProps) => handleBarClick(clickedProps.datum.patents),
              },
            }]}
          />
        </VictoryChart>
      </div>
      <PatentDetailModal
        handleCloseModal={handleCloseModal}
        selectedPatents={selectedPatents}
        open={open}
      />
    </div>
  );
});

export default PatentChart;
