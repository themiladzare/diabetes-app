// "use client";

// import React, { useState } from "react";
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   Box,
//   Button,
//   Typography,
//   Container,
// } from "@mui/material";
// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
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
//     fontFamily: "IRANSans, Arial, sans-serif",
//   },
// });

// const steps = ["مرحله ۱", "مرحله ۲", "مرحله ۳", "مرحله ۴"];

// const StepperComponent = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const renderStep = () => {
//     switch (activeStep) {
//       case 0:
//         return <Step1 nextStep={handleNext} />;
//       case 1:
//         return <Step2 nextStep={handleNext} />;
//       case 2:
//         return <Step3 nextStep={handleNext} />;
//       case 3:
//         return <Step4 nextStep={handleNext} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <CacheProvider value={cacheRtl}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />

//         <Container maxWidth="xl" sx={{ mt: 4 }}>
//           <Box className="w-full bg-white rounded-xl shadow-2xl p-4 md:p-8">
//             <Stepper activeStep={activeStep} alternativeLabel>
//               {steps.map((label) => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>

//             <Box sx={{ mt: 2, mb: 2 }}>
//               {activeStep === steps.length ? (
//                 <Typography variant="h5" align="center">
//                   شما تمام مراحل را کامل کردید!
//                 </Typography>
//               ) : (
//                 <div>
//                   {renderStep()}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       mt: 2,
//                     }}
//                   >
//                     <Button
//                       className={`bg-sky-500 text-white py-2 px-4 rounded w-full ${
//                         activeStep === 0 ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                       disabled={activeStep === 0}
//                       onClick={handleBack}
//                     >
//                       بازگشت
//                     </Button>
//                   </Box>
//                 </div>
//               )}
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     </CacheProvider>
//   );
// };

// export default StepperComponent;

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

// Importing Step Components
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

// Configuring RTL cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [stylisRTLPlugin],
});

// Theme configuration
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IRANSans, Arial, sans-serif",
  },
});

const steps = ["مرحله ۱", "مرحله ۲", "مرحله ۳", "مرحله ۴"];

const StepperComponent: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [resultTest, setResultTest] = useState(null);

  // Handler for next step
  const handleNext = () => setActiveStep((prev) => prev + 1);

  // Handler for previous step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Rendering the correct step
  const renderStep = () => {
    const stepComponents = [
      <Step1 nextStep={handleNext} setResultInParent={setResultTest} />,
      <Step2 />,
      <Step3 />,
      <Step4 />,
    ];
    return stepComponents[activeStep] || null;
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Box
            className="w-full bg-white rounded-xl shadow-2xl p-4 md:p-8"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: {
                xs: "16px",
                sm: "24px",
                md: "32px",
              },
            }}
          >
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{ width: "100%" }}
            >
              {steps.map((label,index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
              {resultTest && 'resultTest'}
            </Stepper>

            <Box
              sx={{
                mt: 2,
                mb: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {activeStep === steps.length ? (
                <Typography variant="h5" align="center">
                  شما تمام مراحل را کامل کردید!
                </Typography>
              ) : (
                <>
                  {renderStep()}
                  {/* <ActionButtons
                    isFirstStep={activeStep === 0}
                    handleBack={handleBack}
                  /> */}
                </>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

// Action buttons for navigation
const ActionButtons: React.FC<{
  isFirstStep: boolean;
  handleBack: () => void;
}> = ({ isFirstStep, handleBack }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "500px",
      mt: 2,
    }}
  >
    <Button
      className={`bg-sky-500 text-white py-2 px-4 rounded ${
        isFirstStep ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isFirstStep}
      fullWidth
      onClick={handleBack}
      sx={{
        mr: 1,
        maxWidth: {
          xs: "120px",
          sm: "150px",
        },
      }}
    >
      بازگشت
    </Button>
  </Box>
);

export default StepperComponent;
