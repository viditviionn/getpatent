import React from "react";
import { Button, Grid, Paper } from "@mui/material";

export const SearchRecommendations = ({
  onClick,
}: {
  onClick: (value: string) => void;
}) => {
  // Add your recommendations here
  const Reccomendation = [
    "Find me a motor for semiconductors",
    "What should be important considerations for motor selection?",
  ];
  return (
    <Grid
      columns={5}
      style={{ width: "100%" }}
      container
      columnGap={"20px"}
      rowGap={"20px"}
    >
      {Reccomendation.map((rec) => (
        <Grid item xs={2.3}>
          <Button onClick={() => onClick(rec)} sx={{ padding: "20px", borderRadius: "20px", height: '100%' }} variant='outlined' fullWidth>
              {rec}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
