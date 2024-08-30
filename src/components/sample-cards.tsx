import React, { useState } from "react";
import { Button, Card, Modal, Stack, Typography } from "@mui/material";
import { Properties } from "./properties";

export const SampleCard = ({ result }: { result: any }) => {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <Card sx={{ minWidth: "300px", maxWidth: "300px" }} elevation={1}>
      <Stack direction={"column"} spacing="5px">
        <img src={result.image_url} alt="" width={"100%"} height="200px" />
        <Stack direction={"column"} spacing="10px" padding="20px">
          {result?.model_name && <Properties keyString={'Model name'} value={result?.model_name}/>}
          {result?.company &&  <Properties keyString="Company" value={result.company}/>}
          {result?.part_number &&  <Properties keyString="Part number" value={result.part_number}/>}
          <Button
            variant="outlined"
            onClick={() => window.open(result.website)}
          >
            Visit website
          </Button>
          <Button variant="outlined" onClick={() => setOpenDetails(true)}>
            View more details
          </Button>
        </Stack>
      </Stack>
      <Modal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        disablePortal={true}
      >
        <Stack
          direction={"column"}
          spacing="5px"
          borderRadius={"20px"}
          padding={"20px"}
          style={{
            maxWidth: "500px",
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            background: "white",
          }}
        >
          {Object.entries(result).map(([key, value],idx) => {
            if (key === "image_url" || key === "website") return <></>;
            else
              return (
                <Properties keyString={key} value={value as string} key={idx}/>
              );
          })}
          <Button
            variant="outlined"
            onClick={() => window.open(result.website)}
          >
            Visit website
          </Button>
        </Stack>
      </Modal>
    </Card>
  );
};
