"use client";

import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

// Importing Step Components
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

// RTL cache configuration
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [stylisRTLPlugin],
});

// MUI theme configuration
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IRANSans, Arial, sans-serif",
  },
});

const steps = ["دموگرافیک", "پاراکلینیکی", "کلینیکی"];

type FormData = {
  [key: string]: string | number;
};

const INITIAL_FORM_DATA: FormData = {
  test1: "",
  test2: "",
  Ghad: "",
  Vazn: "",
  test12: "",
  test14: "",
  test198: "",
  test199: "",
  test22: "",
  test24: "",
  test203: "",
  test204: "",
  test215: "",
  test219: "",
  test253: "",
  test262: "",
  FSG: "",
  Chol: "",
  HDL: "",
  TG: "",
  LDL: "",
  test62: "",
  test71: "",
  test72: "",
  test82: "",
  test88: "",
  test89: "",
  test92: "",
  test102: "",
  test106: "",
};

const StepperComponent: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState(false);

  const sendFormData = async (data: FormData) => {
    try {
      toast.loading("در حال ارسال داده‌ها...");
      const response = await axios.post("http://127.0.0.1:8000/predict/", data);

      // console.log(response)

      if (response.status === 200) {
        toast.dismiss();
        toast.success("داده‌ها با موفقیت ارسال شدند!");
        const message =
          response.data?.prediction === 1
            ? `دیابت دارید و احتمال دیابت داشتن شما ${
              response.data?.confidence_class_0 * 100
              }% است.`
            : `شما دیابت ندارید و احتمال نداشتن دیابت ${
              response.data?.confidence_class_1 * 100
              }% است.`;
        setResultMessage(message);
        console.log(response.data)
        setActiveStep((prev) => prev + 1);
        return response.data;
      }
    } catch (error) {
      toast.dismiss();
      if (axios.isAxiosError(error)) {
        toast.error(
          `خطا در ارسال داده‌ها: ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        toast.error("خطای ناشناخته‌ای رخ داده است.");
      }
    }
  };

  const handleNext = async (data: FormData) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    setIsLoading(true);
    await sendFormData(updatedFormData);
    setIsLoading(false);
    
  };

  const renderStep = () => {
    const stepComponents = [
      <Step1 nextStep={handleNext} loading={isLoading} />,
      <Step2 nextStep={handleNext} loading={isLoading} />,
      <Step3 nextStep={handleNext} loading={isLoading} />,
    ];
    return stepComponents[activeStep];
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
              p: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{ width: "100%" }}
            >
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {resultMessage && (
              <div className="text-gray-600 font-medium">{resultMessage}</div>
            )}

            <Box sx={{ mt: 2, width: "100%", textAlign: "center" }}>
              {activeStep === steps.length ? (
                <Typography variant="h5">
                  شما تمام مراحل را کامل کردید!
                </Typography>
              ) : (
                renderStep()
              )}
            </Box>
          </Box>
          <Toaster />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default StepperComponent;
