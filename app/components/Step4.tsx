/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  Container,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const rsOptions = [
  { id: "rs1169288", label: "rs1169288", value: "rs1169288" },
  { id: "rs1801212", label: "rs1801212", value: "rs1801212" },
  { id: "rs1801214", label: "rs1801214", value: "rs1801214" },
  { id: "rs689", label: "rs689", value: "rs689" },
  { id: "rs757110", label: "rs757110", value: "rs757110" },
  { id: "rs4148646", label: "rs4148646", value: "rs4148646" },
  { id: "rs6520383", label: "rs6520383", value: "rs6520383" },
  { id: "rs5219", label: "rs5219", value: "rs5219" },
  { id: "rs5215", label: "rs5215", value: "rs5215" },
  { id: "rs5213", label: "rs5213", value: "rs5213" },
  { id: "rs10010131", label: "rs10010131", value: "rs10010131" },
  { id: "rs1046316", label: "rs1046316", value: "rs1046316" },
];

const schema = yup.object().shape(
  rsOptions.reduce((acc, option) => {
    acc[option.id] = yup.boolean();
    return acc;
  }, {} as Record<string, yup.BooleanSchema>)
);

const DnaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-500"
  >
    <path d="M2 15c6.667-6 13.333 0 20-6" />
    <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
    <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
    <path d="m17 6-2.5-2.5" />
    <path d="m14 8-1-1" />
    <path d="m7 18 1 1" />
    <path d="m3.5 14.5.5.5" />
    <path d="m20 9 .5.5" />
    <path d="m6.5 12.5 1 1" />
    <path d="m16.5 10.5 1 1" />
    <path d="m10 16 1.5 1.5" />
  </svg>
);

interface Step4Props {
  nextStep: (data: any) => void;
  loading: boolean;
}

const Step4: React.FC<Step4Props> = ({ nextStep, loading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: rsOptions.reduce((acc, option) => {
      acc[option.id] = false;
      return acc;
    }, {} as Record<string, boolean>),
  });

  const onSubmit = async (data: any) => nextStep(data);

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="min-w-[25rem]">
        <div className="text-gray-500 text-sm !mb-8 mt-4 text-right">
          لطفاً گزینه‌های مورد نظر خود را انتخاب کنید
        </div>

        <Box mb={3}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              لیست rs ها
            </FormLabel>
            <FormGroup>
              {rsOptions.map((option) => (
                <Controller
                  key={option.id}
                  name={option.id}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                      label={
                        <div className="flex justify-between w-full items-center  pb-2 p-2 rounded">
                          <div className="flex items-center">
                            <DnaIcon />
                            <span className="font-medium text-gray-700 mr-2">
                              {option.label}
                            </span>
                          </div>
                          {/* <span className="text-right text-gray-500 font-arabic">
                            {(rsOptions.findIndex((o) => o.id === option.id) + 1) + '.'}
                          </span> */}
                        </div>
                      }
                      className="flex-row-reverse justify-between w-full mb-2"
                    />
                  )}
                />
              ))}
            </FormGroup>
            {errors && errors.root && (
              <FormHelperText error>{errors.root?.message}</FormHelperText>
            )}
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

export default Step4;
