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
import axios from "axios";
import ResultModal from "./ResultModal";
import toast from "react-hot-toast";

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
  ageRange: yup.string(),
  intenseExercise: yup.string(),
  moderateExercise: yup.string(),
  midnightBathroom: yup.string(),
  sodaConsumption: yup.string(),
  sugarDrink: yup.string(),
  unknow: yup.string(),
  fastFood: yup.string(),
  friedFood: yup.string(),
  sugarCubes: yup.string(),
  cakeConsumption: yup.string(),
  snackConsumption: yup.string(),
  smoking: yup.string(),
  addictionTreatment: yup.string(),
  gender: yup.string(),
});

const Step1 = ({ nextStep, setResultInParent }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [openModal, setOpenModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const onSubmit = async (data) => {
    const dataPost = {
      Vazn: data?.weight,
      Ghad: data?.height,
      test1: data?.ageRange,
      test12: data?.intenseExercise,
      test14: data?.moderateExercise,
      test24: data?.midnightBathroom,
      test198: data?.sodaConsumption,
      test199: data?.sugarDrink,
      test201: data?.unknow,
      test203: data?.fastFood,
      test204: data?.friedFood,
      test215: data?.sugarCubes,
      test219: data?.cakeConsumption,
      test220: data?.snackConsumption,
      tst253: data?.smoking,
      tst262: data?.addictionTreatment,
      tst2: data?.gender,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict/",
        dataPost
      );

      const result = response.data;

      const message =
        result.prediction === 1
          ? `دیابت دارید و احتمال دیابت داشتن شما ${
              result.confidence_class_0 * 100
            }% است.`
          : `شما دیابت ندارید و احتمال نداشتن دیابت ${
              result.confidence_class_1 * 100
            }% است.`;

      setResultMessage(message);
      setResultInParent(message)
      setOpenModal(true);
      setResultInParent(result); // Pass result to parent component
    } catch (error) {
      if (
        error.code === "ERR_NETWORK" ||
        error.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        toast.error("اتصال به سرور برقرار نشد. لطفاً اتصال خود را بررسی کنید.");
      } else {
        toast.error("خطایی در ارسال داده‌ها رخ داد.");
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    nextStep();
  };

  const renderSelectField = (name, label, options) => (
    <Box mb={3}>
      <FormControl component="fieldset" error={!!errors[name]} fullWidth>
        <FormLabel component="legend" sx={{ mb: 1 }}>
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

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.weight} fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }}>
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

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.height} fullWidth>
            <FormLabel component="legend" sx={{ mb: 1 }}>
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

        {renderSelectField("ageRange", "محدوده سنی شما چیست؟", [
          { value: "1", label: "20-29" },
          { value: "2", label: "30-39" },
          { value: "3", label: "40-49" },
          { value: "4", label: "50-59" },
          { value: "5", label: "60-69" },
        ])}

        {renderSelectField("intenseExercise", "چند بار فعالیت بدنی شدید؟", [
          { value: "1", label: "هرگز" },
          { value: "2", label: "یک بار در هفته" },
          { value: "3", label: "دو بار در هفته" },
          { value: "4", label: "سه یا چهار بار در هفته" },
          { value: "5", label: "پنج بار یا بیشتر در هفته" },
        ])}

        {renderSelectField("moderateExercise", "چند بار فعالیت بدنی متوسط؟", [
          { value: "1", label: "هرگز" },
          { value: "2", label: "یک بار در هفته" },
          { value: "3", label: "دو بار در هفته" },
          { value: "4", label: "سه یا چهار بار در هفته" },
          { value: "5", label: "پنج بار یا بیشتر در هفته" },
        ])}

        {renderSelectField("midnightBathroom", "چندبار نیمه شب بیدار شدید؟", [
          { value: "1", label: "صلا تجربه نکردم" },
          { value: "2", label: "کمتر از هفته‌ای یکبار" },
          { value: "3", label: "یک یا دو بار در هفته" },
          { value: "4", label: "سه بار یا بیشتر در هفته" },
        ])}

        {renderSelectField("sodaConsumption", "چند بار نوشیدنی گازدار؟", [
          { value: "1", label: "اصلا" },
          { value: "2", label: "کمتر از هفته‌ای یکبار" },
          { value: "3", label: "1-2 بار" },
          { value: "4", label: "3-4 بار" },
          { value: "5", label: "5 بار و بیشتر" },
        ])}

        {renderSelectField("sugarDrink", "نوشیدنی‌های شیرین شده با شکر؟", [
          { value: "1", label: "اصلا" },
          { value: "2", label: "کمتر از هفته‌ای یکبار" },
          { value: "3", label: "یکبار" },
          { value: "4", label: "3-2 بار" },
          { value: "5", label: "4 بار و بیشتر" },
        ])}

        {renderSelectField("unknow", "نامشخص", [
          { value: "1", label: "تبلیغات" },
          { value: "2", label: "به عنوان یک سرگرمی" },
          { value: "3", label: "امکان مصرف ان با خانواده و دوستان" },
          { value: "4", label: "سایر موارد" },
          { value: "5", label: "اصلا استفاده نمیکنم" },
        ])}

        {renderSelectField("fastFood", "همبرگر، سوسیس، کالباس، پیتزا:", [
          { value: "1", label: "روزی یکبار" },
          { value: "2", label: "هفته‌ای 3-1 بار" },
          { value: "3", label: "ماهی 3-1 بار" },
          { value: "4", label: "سالی 10-5 بار" },
          { value: "5", label: "هرگز" },
        ])}

        {renderSelectField("friedFood", "سیب زمینی سرخ کرده و غیره:", [
          { value: "1", label: "روزی یکبار" },
          { value: "2", label: "هفته‌ای 3-1 بار" },
          { value: "3", label: "ماهی 3-1 بار" },
          { value: "4", label: "سالی 10-5 بار" },
          { value: "5", label: "هرگز" },
        ])}

        {renderSelectField("sugarCubes", "حبه قند مصرفی روزانه:", [
          { value: "1", label: "اصلا" },
          { value: "2", label: "1-2 بار" },
          { value: "3", label: "3-4 بار" },
          { value: "4", label: "5-8 بار" },
          { value: "5", label: "9 بار و بیشتر" },
        ])}

        {renderSelectField("cakeConsumption", "کیک، کلوچه، بیسکوئیت:", [
          { value: "1", label: "اصلا" },
          { value: "2", label: "کمتر از هفته‌ای یکبار" },
          { value: "3", label: "1-2 بار" },
          { value: "4", label: "3-4 بار" },
          { value: "5", label: "5 بار و بیشتر" },
        ])}

        {renderSelectField("snackConsumption", "میان وعده‌هایی مثل چیپس:", [
          { value: "1", label: "اصلا" },
          { value: "2", label: "کمتر از هفته‌ای یکبار" },
          { value: "3", label: "1-2 بار" },
          { value: "4", label: "3-4 بار" },
          { value: "5", label: "5 بار و بیشتر" },
        ])}

        {renderSelectField("smoking", "آیا سیگار می‌کشید؟", [
          { value: "1", label: "بلی" },
          { value: "2", label: "گاهی" },
          { value: "3", label: "ترک کرده‌ام" },
          {
            value: "4",
            label: "هیچگاه مصرف نکرده‌ام (زیر 100 عدد شامل این گزینه می‌شود)",
          },
        ])}

        {renderSelectField("addictionTreatment", "سابقه درمان اعتیاد دارید؟", [
          { value: "1", label: "بله" },
          { value: "2", label: "خیر" },
        ])}

        {renderSelectField("gender", "جنسیت شما چیست؟", [
          { value: "1", label: "مرد" },
          { value: "2", label: "زن" },
        ])}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          بعدی
        </Button>
      </form>

      <ResultModal
        open={openModal}
        message={resultMessage}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default Step1;
