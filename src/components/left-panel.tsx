import { Paper, Stack, Typography } from "@mui/material";
import Logo from '../assets/InFind.png';
import React from "react";
import { serviceDescriptionCards } from "../assets/colors";

export const LeftPanel = () => {
  return (
    <Stack
      direction="column"
      spacing="20px"
      paddingLeft={"20px"}
      paddingRight="20px"
      paddingTop={'40px'}
    >
      <a href="http://infind.ai">
        <img
        height='50px'          
          src={Logo}
          alt="logo"
        />
      </a>
      <Stack
        style={{
          background: serviceDescriptionCards,
          padding: "20px",
        }}
        borderRadius='20px'
        justifyContent="center"
        alignItems={"center"}
        direction={"column"}
      >
        <img
          src="http://infind.ai/wp-content/uploads/2023/07/boost-icon.svg"
          alt="boost-icon"
          width={"30px"}
          height="30px"
        />
        <Typography color={"black"}>
          Click example prompts on the top of text box to get you started!
        </Typography>
      </Stack>
      <Stack
        style={{
          background: serviceDescriptionCards,
          padding: "20px",
        }}
        borderRadius='20px'
        justifyContent="center"
        alignItems={"center"}
      >
        <img
          src="http://infind.ai/wp-content/uploads/2023/07/bounce-rate-icon.svg"
          alt="bounce-rate-icon"
          width={"30px"}
          height="30px"
        />
        <Typography color={"black"}>
          When answering questions, you can just simply list your answers like
          "1. answer a, answer b; 2. answer c..." without repeating questions.
        </Typography>
      </Stack>
      <Stack
        style={{
          background: serviceDescriptionCards,
          padding: "20px",
        }}
        borderRadius='20px'
        justifyContent="center"
        alignItems={"center"}
      >
        <img
          src="http://infind.ai/wp-content/uploads/2023/07/increase-conversion-icon.svg"
          alt="increase-conversion-icon"
          width={"30px"}
          height="30px"
        />
        <Typography color={"black"}>
          You can do data analysis on product recommendations using a prompt like 
          "What is the part number that has the lowest price?"
        </Typography>
      </Stack>
    </Stack>
  );
};
