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
  TextField,
  Container,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  weight: yup
    .number()
    .typeError("وزن باید یک عدد باشد")
    .required("وزن الزامی است")
    .positive("وزن باید مثبت باشد")
    .integer("وزن باید عدد صحیح باشد")
    .min(30, "وزن نمی‌تواند کمتر از 30 کیلوگرم باشد")
    .max(300, "وزن نمی‌تواند بیشتر از 300 کیلوگرم باشد"),
  height: yup
    .number()
    .typeError("قد باید یک عدد باشد")
    .required("قد الزامی است")
    .positive("قد باید مثبت باشد")
    .integer("قد باید عدد صحیح باشد")
    .min(100, "قد نمی‌تواند کمتر از 100 سانتی‌متر باشد")
    .max(250, "قد نمی‌تواند بیشتر از 250 سانتی‌متر باشد"),
  test1: yup.string(),
  test2: yup.string(),
  test12: yup.string(),
  test14: yup.string(),
  test198: yup.string(),
  test199: yup.string(),
  test22: yup.string(),
  test24: yup.string(),
  test203: yup.string(),
  test204: yup.string(),
  test215: yup.string(),
  test219: yup.string(),
  test253: yup.string(),
  test262: yup.string(),
});

const Step1 = ({ nextStep, loading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => nextStep(data);

  const renderSelectField = (name, label, options) => (
    <Box mb={3}>
      <FormControl component="fieldset" error={!!errors[name]} fullWidth>
        <FormLabel sx={{ mb: 1 }} className="text-right">
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
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </Box>
  );

  // const renderTextField = (name, label) => (
  //   <Box mb={3}>
  //     <FormControl component="fieldset" error={!!errors[name]} fullWidth>
  //       <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
  //       <FormGroup>
  //         <Controller
  //           name={name}
  //           control={control}
  //           defaultValue=""
  //           render={({ field }) => (
  //             <TextField {...field} variant="outlined" fullWidth />
  //           )}
  //         />
  //       </FormGroup>
  //       <FormHelperText>{errors[name]?.message}</FormHelperText>
  //     </FormControl>
  //   </Box>
  // );

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderSelectField("test1", "محدوده سنی شما چیست؟", [
          { value: "1", label: "20-29" },
          { value: "2", label: "30-39" },
          { value: "3", label: "40-49" },
          { value: "4", label: "50-59" },
          { value: "5", label: "60-69" },
        ])}
        {renderSelectField("test2", "جنسیت شما چیست؟", [
          { value: "1", label: "مرد" },
          { value: "2", label: "زن" },
        ])}

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.height} fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              قد شما چقدر است؟
            </FormLabel>
            <FormGroup>
              <Controller
                name="height"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.height?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.weight} fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              وزن شما چقدر است؟
            </FormLabel>
            <FormGroup>
              <Controller
                name="weight"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.weight?.message}</FormHelperText>
          </FormControl>
        </Box>

        {renderSelectField("test12", "چند بار فعالیت بدنی شدید؟", [
          { value: "1", label: "هرگز" },
          { value: "2", label: "یک بار در هفته" },
          { value: "3", label: "دو بار در هفته" },
          { value: "4", label: "سه یا چهار بار در هفته" },
          { value: "5", label: "پنج بار یا بیشتر در هفته" },
        ])}

        {renderSelectField("test14", "چند بار فعالیت بدنی متوسط؟", [
          { value: "1", label: "هرگز" },
          { value: "2", label: "یک بار در هفته" },
          { value: "3", label: "دو بار در هفته" },
          { value: "4", label: "سه یا چهار بار در هفته" },
          { value: "5", label: "پنج بار یا بیشتر در هفته" },
        ])}

        {renderSelectField(
          "test198",
          "هفته ای چند بار نوشيدنی گاز دار می نوشيد؟",
          [
            { value: "1", label: "اصلا" },
            { value: "2", label: "کمتر از هفته‌ای یکبار" },
            { value: "3", label: "1-2 بار" },
            { value: "4", label: "3-4 بار" },
            { value: "5", label: "5 بار و بیشتر" },
          ]
        )}

        {renderSelectField(
          "test199",
          "در هفته چه میزان از نوشیدنی های شیرین شده با شکر نظیر شربت های خانگی و بسته بندی و ابمیوه های بسته بندی استفاده میکنید؟",
          [
            { value: "1", label: "اصلا" },
            { value: "2", label: "کمتر از هفته‌ای یکبار" },
            { value: "3", label: "یکبار" },
            { value: "4", label: "3-2 بار" },
            { value: "5", label: "4 بار و بیشتر" },
          ]
        )}

        {renderSelectField(
          "test22",
          "در ماه گذشته، چند بار برای خوابيدن از قرص خواب آور يا آرام بخش استفاده کرده ايد؟ ",
          [
            { value: "1", label: " اصلا تجربه نکردم" },
            { value: "2", label: " کمتر از هفته ای یکبار" },
            { value: "3", label: "یک یا دوبار در هفته" },
            { value: "4", label: "سه بار بیشتر در هفته" },
          ]
        )}

        {renderSelectField(
          "test24",
          "در ماه گذشته، چند بار نيمه شب برای دستشويی رفتن بيدار شديد؟",
          [
            { value: "1", label: "اصلا تجربه نکردم" },
            { value: "2", label: "کمتر از هفته‌ای یکبار" },
            { value: "3", label: "یک یا دو بار در هفته" },
            { value: "4", label: "سه بار یا بیشتر در هفته" },
          ]
        )}

        {renderSelectField(
          "test203",
          "هر چندوقت یکبار از همبرگر، سوسیس، کالباس و پیتزا استفاده میکنید؟",
          [
            { value: "1", label: "روزی یکبار" },
            { value: "2", label: "هفته‌ای 3-1 بار" },
            { value: "3", label: "ماهی 3-1 بار" },
            { value: "4", label: "سالی 10-5 بار" },
            { value: "5", label: "هرگز" },
          ]
        )}

        {renderSelectField(
          "test204",
          "هر چندوقت یکبار از سیب زمینی سرخ کرده، سمبوسه، فلافل و ناگت استفاده میکنید؟",
          [
            { value: "1", label: "روزی یکبار" },
            { value: "2", label: "هفته‌ای 3-1 بار" },
            { value: "3", label: "ماهی 3-1 بار" },
            { value: "4", label: "سالی 10-5 بار" },
            { value: "5", label: "هرگز" },
          ]
        )}

        {renderSelectField(
          "test215",
          "به طورمتوسط هر روزچندحبه قند دراندازه متوسط مصرف ميکنيد؟",
          [
            { value: "1", label: "اصلا" },
            { value: "2", label: "1-2 بار" },
            { value: "3", label: "3-4 بار" },
            { value: "4", label: "5-8 بار" },
            { value: "5", label: "9 بار و بیشتر" },
          ]
        )}

        {renderSelectField(
          "test219",
          "در هفته بطور متوسط چند بار کيک، کلوچه و بيسکويت مصرف می کنيد؟",
          [
            { value: "1", label: "اصلا" },
            { value: "2", label: "کمتر از هفته‌ای یکبار" },
            { value: "3", label: "1-2 بار" },
            { value: "4", label: "3-4 بار" },
            { value: "5", label: "5 بار و بیشتر" },
          ]
        )}

        {renderSelectField("test253", "آیا سیگار می‌کشید؟", [
          { value: "1", label: "بلی" },
          { value: "2", label: "گاهی" },
          { value: "3", label: "ترک کرده‌ام" },
          {
            value: "4",
            label: "هیچگاه مصرف نکرده‌ام (زیر 100 عدد شامل این گزینه می‌شود)",
          },
        ])}

        {/* {renderSelectField("snackConsumption", "میان وعده‌هایی مثل چیپس:", [
          { value: "1", label: "اصلا" },
          { value: "2", label: "کمتر از هفته‌ای یکبار" },
          { value: "3", label: "1-2 بار" },
          { value: "4", label: "3-4 بار" },
          { value: "5", label: "5 بار و بیشتر" },
        ])} */}

        {renderSelectField("test262", "آیا سابقه درمان اعتیاد داشته اید؟", [
          { value: "1", label: "بله" },
          { value: "2", label: "خیر" },
        ])}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          color="primary"
          fullWidth
        >
          {loading ? <CircularProgress color="white" /> : "بعدی"}
        </Button>
      </form>
    </Container>
  );
};

export default Step1;
