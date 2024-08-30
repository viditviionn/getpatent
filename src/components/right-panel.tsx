import {
  TextField,
  IconButton,
  Paper,
  Typography,
  Stack,
  Skeleton,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSendMessage } from "../hooks/sendMessage";
import { SendSharp, AccountCircle, SmartToy } from "@mui/icons-material";
import { SampleCard } from "./sample-cards";
import { SearchRecommendations } from "./search-recommendations";
import { backgroundColor } from "../assets/colors";
import PatentChart from "./PatentChart";
import CategoryChart from "./CategoryChart";

export const RightPanel = () => {
  const [inputText, setInputText] = useState("");
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const { sendMessage, loading, messages } = useSendMessage();
  const onSubmit = () => {
    if (inputText.trim().length > 0) {
      sendMessage(inputText);
      setInputText("");
    }
  };

  const selectRecommendation = (value: string) => {
    sendMessage(value);
  };
  useEffect(() => {
    const chatEnd = document.getElementById('chart-end');
    chatEnd && chatEnd.scrollIntoView()
  }, [messages.length])
  console.log(messages);
  const toggleViewGraph = () => {
    setIsGraphVisible(!isGraphVisible)
  }
  const handleDowloanPDF = async () => {
    try {
      // Make a fetch request to the backend to get the PDF
      const response = await fetch('http://192.168.2.195:3001/generate-pdf', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf', // Optional, mainly for server-side info
        },
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }

      // Convert the response to a blob
      const blob = await response.blob();

      // Create a URL for the blob and set it as the href of a link element
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Set the filename for the downloaded PDF
      link.setAttribute('download', 'download.pdf');

      // Append the link to the body, click it and then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Optionally, revoke the object URL to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('There was an error downloading the PDF.');
    }
  };
  return (
    <Paper
      elevation={2}
      sx={{ width: "90%", height: "90%", borderRadius: "20px" }}
    >
      <Stack
        direction={"column"}
        width="90%"
        height={"90%"}
        borderRadius="20px"
        padding={"20px"}
        style={{ background: "white" }}
        spacing="20px"
      >
        <Stack
          direction={"column"}
          spacing="20px"
          id="chat-containor"
          style={{ flex: 1, background: "white", overflowY: "auto" }}
        >

          {messages.map((message, idx) => (
            <Stack direction="column" key={idx} spacing="10px">
              <Stack
                direction="row"
                spacing="10px"
                justifyContent={"start"}
                alignItems="end"
              >
                {message.isResponse ? <SmartToy /> : <AccountCircle />}
                <Typography variant="body1" fontWeight={"bold"}>
                  {message.isResponse ? "Infind.ai" : "You"}
                </Typography>
                <Typography variant="subtitle2">
                  {message.time.toLocaleTimeString()}
                </Typography>
              </Stack>
              <Typography variant="body1">{message.message}</Typography>
              {message.isResponse ?
                <>
                
                  <h5 onClick={() => toggleViewGraph()} style={{cursor: "pointer", textDecoration: "underline", color: "blue"}}>View Graph</h5>
                  {/* <h5 onClick={() => handleDowloanPDF()} style={{cursor: "pointer", textDecoration: "underline", color: "blue"}}>Download full patent report</h5> */}
                  {isGraphVisible && <Grid>
                    <Grid style={{ display: "flex" }}>
                      <PatentChart />
                      <CategoryChart />

                    </Grid>
                  </Grid>}
                </>
                : ''}

              {message?.results && message?.results.length > 0 && (
                <Stack
                  direction={"row"}
                  spacing="20px"
                  padding='20px'
                  style={{ overflowX: "auto" }}
                >
                  {message.results.map((result, idx) => (
                    <SampleCard key={idx} result={result} />
                  ))}
                </Stack>
              )}
            </Stack>
          ))}
          <div id='chart-end'></div>
          {loading && (
            <Stack
              direction="row"
              spacing="10px"
              justifyContent={"start"}
              alignItems="end"
            >
              <SmartToy />
              <Typography variant="body1" fontWeight={"bold"}>
                Infind.ai
              </Typography>
              <Skeleton>
                <Typography variant="body1" fontWeight={"bold"}>
                  Fetching response
                </Typography>
              </Skeleton>
            </Stack>
          )}
        </Stack>
        {messages.length === 0 && (
          <SearchRecommendations onClick={selectRecommendation} />
        )}
        <TextField
          id="input-with-icon-textfield"
          label="Search"
          multiline
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={loading}
          InputProps={{
            sx: {
              borderRadius: "20px",
            },
            endAdornment: (
              <IconButton onClick={onSubmit}>
                <SendSharp htmlColor={backgroundColor} />
              </IconButton>
            ),
          }}
          variant="outlined"
          fullWidth
        />
      </Stack>
    </Paper>
  );
};
