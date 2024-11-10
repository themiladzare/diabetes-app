import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  Select,
  MenuItem,
  FormHelperText,
  Container,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CircularProgress from "@mui/material/CircularProgress";

// Define validation schema using Yup
const schema = yup.object().shape({
  test62: yup.string(),
  test71: yup.string(),
  test72: yup.string(),
  test82: yup.string(),
  test88: yup.string(),
  test89: yup.string(),
  test92: yup.string(),
  test102: yup.string(),
  test106: yup.string(),
});
interface Step1Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextStep: (data: any) => void;
  loading: boolean;
}
const Step3: React.FC<Step1Props> = ({ nextStep, loading }) => {
  // Initialize react-hook-form with Yup validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data :any) => nextStep(data);

  // Render select field with Controller from react-hook-form
  const renderSelectField = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: any,
    label: string,
    options: Array<{ label: string; value: string }>
  ) => (
    <Box mb={3}>
      <FormControl
        component="fieldset"
        error={!!errors[name as keyof typeof errors]}
        fullWidth
      >
        <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
          {label}
        </FormLabel>
        <FormGroup>
          <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} fullWidth>
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormGroup>
        <FormHelperText>
          {errors[name as keyof typeof errors]?.message as string}
        </FormHelperText>
      </FormControl>
    </Box>
  );

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Render all select fields with respective labels and options */}
        {renderSelectField("test62", "بیماری قلبی؟", [
          { value: "1", label: "بله" },
          { value: "2", label: "خیر" },
        ])}

        {renderSelectField("test71", "پرفشاری خون؟", [
          { value: "1", label: "بله" },
          { value: "2", label: "خیر" },
        ])}

        {renderSelectField(
          "test72",
          "درصورت ابتلا به بيماری فوق(پرفشاری خون)، چند سال ازشروع آن می گذرد؟",
          [
            { value: "1", label: "کمتر از یک سال" },
            { value: "2", label: "1-2 سال" },
            { value: "3", label: "3-4 سال" },
            { value: "4", label: "5-6 سال" },
            { value: "5", label: "7سال و بیشتر" },
          ]
        )}

        {renderSelectField(
          "test82",
          "از کدام روش برای کنترل ديابت استفاده می کنيد؟",
          [
            { value: "1", label: "رژيم غذايی" },
            { value: "2", label: " داروی گياهی" },
            { value: "3", label: "قرص" },
            { value: "4", label: "انسولين" },
            { value: "5", label: "هیچکدام" },
          ]
        )}

        {renderSelectField(
          "test88",
          " آيا بستگان درجه يک (پدر، مادر، خواھر، برادر، فرزندان) شما سابقه دیابت را دارند؟",
          [
            { value: "1", label: "بله" },
            { value: "2", label: "خیر" },
          ]
        )}

        {renderSelectField("test89", "افزايش کلسترول خون دارید؟", [
          { value: "1", label: "بله" },
          { value: "2", label: "خیر" },
        ])}

        {renderSelectField(
          "test92",
          "آيا بستگان درجه يک (پدر،مادر، خواھر، برادر، فرزندان) شما سابقه بيماری کلسترول خون را دارند؟",
          [
            { value: "1", label: "بله" },
            { value: "2", label: "خیر" },
          ]
        )}

        {renderSelectField("test102", "مشکلات غده تيروئيد دارید؟", [
          { value: "1", label: "بله" },
          { value: "2", label: "خیر" },
        ])}

        {renderSelectField(
          "test106",
          "آيا بستگان درجه يک (پدر، مادر، خواھر، برادر، فرزندان) شما سابقه اين بيماری را دارند؟",
          [
            { value: "1", label: "بله" },
            { value: "2", label: "خیر" },
          ]
        )}

        {/* Submit button with loading indicator */}
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

export default Step3;
