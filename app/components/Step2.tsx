/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Container,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CircularProgress from "@mui/material/CircularProgress";

const schema = yup.object().shape({
  FSG: yup
    .mixed()
    .test(
      "is-number",
      "باید یک عدد باشد",
      (value) => value === null || value === "" || !isNaN(Number(value))
    ),
  Chol: yup
    .mixed()
    .test(
      "is-number",
      "باید یک عدد باشد",
      (value) => value === null || value === "" || !isNaN(Number(value))
    ),
  HDL: yup
    .mixed()
    .test(
      "is-number",
      "باید یک عدد باشد",
      (value) => value === null || value === "" || !isNaN(Number(value))
    ),
  TG: yup
    .mixed()
    .test(
      "is-number",
      "باید یک عدد باشد",
      (value) => value === null || value === "" || !isNaN(Number(value))
    ),
  LDL: yup
    .mixed()
    .test(
      "is-number",
      "باید یک عدد باشد",
      (value) => value === null || value === "" || !isNaN(Number(value))
    ),
});

interface Step1Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextStep: (data: any) => void;
  loading: boolean;
}
const Step2: React.FC<Step1Props> = ({ nextStep, loading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    nextStep(data);
  };

  // const handleCloseModal = () => {
  //   nextStep();
  // };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-gray-500 text-sm !mb-8 mt-4 text-right">
          مقادیر هر یک از پارامتر های زیر را با توجه به اخرین آزمایشاتی که انجام
          داده اید، وارد کنید
        </div>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.FSG} fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              Fasting Blood glucose(FBS)
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
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              Cholesterol (Chol)
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
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              High-density lipoprotein(HDL)
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
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              Triglyceride (TG)
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
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              Low-density lipoprotein (LDL)
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

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          color="primary"
          fullWidth
        >
          {loading ? <CircularProgress /> : "بعدی"}
        </Button>
      </form>
    </Container>
  );
};

export default Step2;
