import { Typography } from "@mui/material";
import React from "react";

export const Properties = ({
  keyString,
  value,
}: {
  keyString: string;
  value: string;
}) => (
  <Typography variant="subtitle1" fontWeight={"bold"} component="span">
    {`${keyString} :`}
    <Typography variant="subtitle1" component="span">
      {value}
    </Typography>
  </Typography>
);
