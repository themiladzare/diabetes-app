import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Container,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CircularProgress from "@mui/material/CircularProgress";

const schema = yup.object().shape({
  FSG: yup.number(),
  Chol: yup.number(),
  HDL: yup.number(),
  TG: yup.number(),
  LDL: yup.number(),
});

const Step2 = ({ nextStep, loading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  

  const onSubmit = async (data) => {
    nextStep(data);
  };

  const handleCloseModal = () => {
    nextStep();
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-gray-500 text-sm !mb-8 mt-4">
          مقادیر هر یک از پارامتر های زیر را با توجه به اخرین آزمایشاتی که انجام
          داده اید، وارد کنید
        </div>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.FSG} fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              FSG
            </FormLabel>
            <FormGroup>
              <Controller
                name="FSG"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.FSG?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.Chol} fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              Chol
            </FormLabel>
            <FormGroup>
              <Controller
                name="Chol"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.Chol?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.HDL} fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              HDL
            </FormLabel>
            <FormGroup>
              <Controller
                name="HDL"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.HDL?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.TG} fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              TG
            </FormLabel>
            <FormGroup>
              <Controller
                name="TG"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.TG?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.LDL} fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              LDL
            </FormLabel>
            <FormGroup>
              <Controller
                name="LDL"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.LDL?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Button type="submit" variant="contained" disabled={loading} color="primary" fullWidth>
        {loading ? <CircularProgress color="white" /> : "بعدی"}

        </Button>
      </form>

      
    </Container>
  );
};

export default Step2;
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   FormGroup,
//   TextField,
//   Container,
//   CircularProgress,
// } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// const schema = yup.object().shape({
//   FSG: yup.number(),
//   Chol: yup.number(),
//   HDL: yup.number(),
//   TG: yup.number(),
//   LDL: yup.number(),
// });

// const Step2 = ({ nextStep, loading }) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => nextStep(data);

//   return (
//     <Container maxWidth="sm">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="text-gray-500 text-sm !mb-8 mt-4">
//           مقادیر هر یک از پارامتر های زیر را با توجه به اخرین آزمایشاتی که انجام
//           داده اید، وارد کنید
//         </div>

//         {["FSG", "Chol", "HDL", "TG", "LDL"].map((param) => (
//           <Box mb={3} key={param}>
//             <FormControl component="fieldset" error={!!errors[param]} fullWidth>
//               <FormLabel component="legend" sx={{ mb: 1 }}>
//                 {param}
//               </FormLabel>
//               <FormGroup>
//                 <Controller
//                   name={param}
//                   control={control}
//                   defaultValue=""
//                   render={({ field }) => (
//                     <TextField {...field} variant="outlined" fullWidth />
//                   )}
//                 />
//               </FormGroup>
//               <FormHelperText>{errors[param]?.message}</FormHelperText>
//             </FormControl>
//           </Box>
//         ))}

//         <Button
//           type="submit"
//           variant="contained"
//           disabled={loading}
//           color="primary"
//           fullWidth
//         >
//           {loading ? <CircularProgress color="white" /> : "بعدی"}
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default Step2;
