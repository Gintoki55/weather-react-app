
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import axios from "axios";
import CloudIcon from "@mui/icons-material/Cloud";
import moment from "moment";
import "moment/min/locales"
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import "./i18n";

import CircularProgress from "@mui/material/CircularProgress";
///redux

import { useSelector, useDispatch } from "react-redux";
import {fetchWeather} from "./weatherApiSlice"

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
let cancelAxios = null
function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state)=>{
    return state.weather.isLoading
  })
  const temp = useSelector((state)=>{
    return state.weather.weather
  })
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState('');
  const [locale, setLocale] = useState('ar');
  const direction = locale === "ar" ? "rtl" : "ltr";
  function handleChangeLang(){
    if (locale === "en") {
       moment.locale("ar");
      setLocale("ar");
      i18n.changeLanguage("ar");
    } else {
       moment.locale("en");
      setLocale("en");
      i18n.changeLanguage("en");
    }
    setDate(moment().format("dddd, MMMM Do YYYY"));
  }

  // Make a request for a user with a given ID
  useEffect(()=>{
    dispatch(fetchWeather());
    moment.locale("ar")
    i18n.changeLanguage("ar")
   setDate(moment().format("dddd, MMMM Do YYYY"));
  }, [])


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            direction: direction,
          }}
        >
          <Card
            sx={{
              width: "100%",
              direction: direction,
              boxShadow: "0px 8px 2px rgba(0, 0, 0, 0.09) !important",
              borderRadius: "18px",
            }}
          >
            <CardHeader
              style={{
                color: "white",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#FFA62F",
                backgroundColor: "#050C9C",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              title={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "end",
                  }}
                >
                  <Typography variant="h3" sx={{ mr: 2, fontWeight: 400 }}>
                    {t(temp.name)}
                  </Typography>
                  <Typography variant="h5" sx={{ mr: 2 }}>
                    {" "}
                    {date}
                  </Typography>
                </Box>
              }
            />
            <CardContent sx={{ backgroundColor: "#3572EF", color: "#fff" }}>
              <Grid container spacing={1}>
                <Grid xs={6}>
                  <Typography variant="h1" sx={{ mr: 2, fontWeight: 400 }}>
                    {temp.number}
                    {isLoading? <CircularProgress sx={{color:"#fff"}}/>:""}
                    <img src={temp.icon} />
                  </Typography>
                  <div style={{ fontSize: "20px", fontFamily: "IBM" }}>
                    {t(temp.description)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "210px",
                      // marginRight: "70px",
                      marginInline: "20px",
                      marginTop: "30px",
                    }}
                  >
                    <div style={{ fontFamily: "IBM", fontWeight: "500" }}>
                      {t("min")}:{temp.min}
                    </div>
                    {"|"}
                    <div style={{ fontFamily: "IBM", fontWeight: "500" }}>
                      {t("max")}:{temp.max}
                    </div>
                  </div>
                </Grid>
                <Grid xs={6}>
                  <CloudIcon sx={{ fontSize: "150px" }} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "start" }}
          >
            {" "}
            <Button
              variant="text"
              sx={{ color: "#fff", marginTop: "20px" }}
              onClick={handleChangeLang}
            >
              {locale === "en" ? "Arabic" : "إنجليزي"}
            </Button>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
