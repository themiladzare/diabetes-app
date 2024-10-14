// "use client";
// import React, { useState } from "react";
// import Step1 from "./Step1"; // اضافه کردن واردات
// import Step2 from "./Step2"; // اضافه کردن واردات
// import Step3 from "./Step3"; // اضافه کردن واردات
// import Step4 from "./Step4";

// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { CssBaseline } from "@mui/material";
// import stylisRTLPlugin from "stylis-plugin-rtl";

// const cacheRtl = createCache({
//   key: "muirtl",
//   stylisPlugins: [stylisRTLPlugin],
// });

// const theme = createTheme({
//   direction: "rtl",
//   typography: {
//     fontFamily: "IRANSans, Arial, sans-serif", // تنظیم فونت IRANSans
//   },
// });

// const MultiStepForm: React.FC = () => {
//   const [step, setStep] = useState(1); // نگه‌داری شماره مرحله
//   const [riskPercentage, setRiskPercentage] = useState<number | null>(null); // ذخیره درصد ریسک

//   // مدیریت مراحل بعدی
//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   // مدیریت مراحل قبلی
//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   // ارسال داده‌ها به سرور (شبیه‌سازی)
//   const handleSubmit = async (formData: any) => {
//     // try {
//     //   // شبیه‌سازی ارسال داده به سرور
//     //   const response = await fetch('/api/risk', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(formData),
//     //   });

//     //   const data = await response.json();
//     //   setRiskPercentage(data.risk); // دریافت درصد ریسک از پاسخ
//     //   nextStep(); // انتقال به مرحله بعد
//     // } catch (error) {
//     //   console.error('Error submitting form', error);
//     // }
//     nextStep();
//   };

//   // رندر هر مرحله
//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return <Step1 nextStep={handleSubmit} />;
//       case 2:
//         return <Step2 nextStep={handleSubmit} prevStep={prevStep} />;
//       case 3:
//         return <Step3 nextStep={handleSubmit} prevStep={prevStep} />;
//       case 4:
//         return <Step4 prevStep={prevStep} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <CacheProvider value={cacheRtl}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />

//         <div className="flex justify-center items-center">
//           <div className="min-h-screen flex flex-col justify-center items-center bg-white rounded-lg w-fit">
//             <h1 className="text-3xl font-bold mb-4">Step {step}</h1>
//             {renderStep()}
//             {riskPercentage !== null && (
//               <div className="mt-6 p-4 bg-green-100 text-green-600 rounded">
//                 Your risk percentage is: {riskPercentage}%
//               </div>
//             )}
//           </div>
//         </div>
//       </ThemeProvider>
//     </CacheProvider>
//   );
// };

// export default MultiStepForm;
// components/StepperComponent.tsx
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
} from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import stylisRTLPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [stylisRTLPlugin],
});

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IRANSans, Arial, sans-serif", // تنظیم فونت IRANSans
  },
});

const steps = ["مرحله ۱", "مرحله ۲", "مرحله ۳", "مرحله ۴"];

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 nextStep={handleNext} />;
      case 1:
        return <Step2 nextStep={handleNext} />;
      case 2:
        return <Step3 nextStep={handleNext} />;
      case 3:
        return <Step4 nextStep={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Box className="w-full bg-white rounded-xl shadow-2xl p-4 md:p-8">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 2, mb: 2 }}>
              {activeStep === steps.length ? (
                <Typography variant="h5" align="center">
                  شما تمام مراحل را کامل کردید!
                </Typography>
              ) : (
                <div>
                  {renderStep()}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Button
                      className={`bg-sky-500 text-white py-2 px-4 rounded w-full ${
                        activeStep === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      بازگشت
                    </Button>

                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      sx={{ ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "ارسال" : "بعدی"}
                    </Button> */}
                  </Box>
                </div>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default StepperComponent;
