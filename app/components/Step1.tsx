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
    .required("وزن الزامی است")
    .positive("وزن باید مثبت باشد")
    .integer("وزن باید عدد صحیح باشد"),
  height: yup
    .number()
    .required("قد الزامی است")
    .positive("قد باید مثبت باشد")
    .integer("قد باید عدد صحیح باشد"),
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

const Step1 = ({ nextStep }: { nextStep: () => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [openModal, setOpenModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const onSubmit = async (data: any) => {
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

      let resultMessage;
      if (result.prediction === 1) {
        resultMessage = `دیابت دارید و احتمال دیابت داشتن شما ${
          result.confidence_class_0 * 100
        }% است.`;
      } else {
        resultMessage = `شما دیابت ندارید و احتمال نداشتن دیابت ${
          result.confidence_class_1 * 100
        }% است.`;
      }

      setResultMessage(resultMessage);

      setOpenModal(true);
    } catch (error) {
      // console.error("Error submitting data:", error);
      setResultMessage("خطایی در ارسال داده‌ها رخ داد.");
      toast.error("خطایی در ارسال داده‌ها رخ داد.");
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    nextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.weight} fullWidth>
            <FormLabel component="legend">وزن شما چقدر است؟</FormLabel>
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
            <FormLabel component="legend">قد شما چقدر است؟</FormLabel>
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
          <FormControl component="fieldset" error={!!errors.ageRange} fullWidth>
            <FormLabel component="legend">محدوده سنی شما چیست؟</FormLabel>
            <FormGroup>
              <Controller
                name="ageRange"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">20-29</MenuItem>
                    <MenuItem value="2">30-39</MenuItem>
                    <MenuItem value="3">40-49</MenuItem>
                    <MenuItem value="4">50-59</MenuItem>
                    <MenuItem value="5">60-69</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.ageRange?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.intenseExercise}
            fullWidth
          >
            <FormLabel component="legend">
              به طور متوسط چند بار در هفته فعالیت بدنی شدید( که در آن سرعت ضربان
              قلبتان بالا رفته یا عرق کردید) مثل دویدن یا کار بدنی سنگین، شرکت
              کرده‌اید؟{" "}
            </FormLabel>
            <FormGroup>
              <Controller
                name="intenseExercise"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">هرگز</MenuItem>
                    <MenuItem value="2"> یک بار در هفته</MenuItem>
                    <MenuItem value="3"> دو بار در هفته</MenuItem>
                    <MenuItem value="4">سه یا چهار بار در هفته</MenuItem>
                    <MenuItem value="5"> پنج بار یا بیشتر در هفته</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.intenseExercise?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.moderateExercise}
            fullWidth
          >
            <FormLabel component="legend">
              به طور متوسط چند بار در هفته فعالیت بدنی متوسط ( که در آن خسته
              نشدید یا به مقدار کم عرق کردید) مثل تند راه رفتن یا کار متوسط شرکت
              می‌کنید؟{" "}
            </FormLabel>
            <FormGroup>
              <Controller
                name="moderateExercise"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">هرگز</MenuItem>
                    <MenuItem value="2"> یک بار در هفته</MenuItem>
                    <MenuItem value="3"> دو بار در هفته</MenuItem>
                    <MenuItem value="4">سه یا چهار بار در هفته</MenuItem>
                    <MenuItem value="5"> پنج بار یا بیشتر در هفته</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.moderateExercise?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.midnightBathroom}
            fullWidth
          >
            <FormLabel component="legend">
              در ماه گذشته چندبار نیمه شب برای دستشویی رفتن بیدار شدید؟{" "}
            </FormLabel>
            <FormGroup>
              <Controller
                name="midnightBathroom"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">صلا تجربه نکردم</MenuItem>
                    <MenuItem value="2"> کمتر از هفته‌ای یکبار</MenuItem>
                    <MenuItem value="3">یک یا دو بار در هفته</MenuItem>
                    <MenuItem value="4">سه بار یا بیشتر در هفته</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.midnightBathroom?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.sodaConsumption}
            fullWidth
          >
            <FormLabel component="legend">
              هفته‌ای چند بار نوشیدنی گازدار می‌نوشید؟{" "}
            </FormLabel>
            <FormGroup>
              <Controller
                name="sodaConsumption"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">اصلا</MenuItem>
                    <MenuItem value="2">کمتر از هفته‌ای یکبار</MenuItem>
                    <MenuItem value="3">1-2 بار</MenuItem>
                    <MenuItem value="4">3-4 بار</MenuItem>
                    <MenuItem value="5"> 5 بار و بیشتر</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.sodaConsumption?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.sugarDrink}
            fullWidth
          >
            <FormLabel component="legend">
              در هفته چه میزان از نوشیدنی‌های شیرین شده با شکر نظیر شربت‌های
              خانگی و بسته بندی و آب میوه‌های بسته بندی استفاده می‌کنید؟{" "}
            </FormLabel>
            <FormGroup>
              <Controller
                name="sugarDrink"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">اصلا</MenuItem>
                    <MenuItem value="2">کمتر از هفته‌ای یکبار</MenuItem>
                    <MenuItem value="3">یکبار</MenuItem>
                    <MenuItem value="4">3-2 بار</MenuItem>
                    <MenuItem value="5"> 4 بار و بیشتر</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.sugarDrink?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.unknow} fullWidth>
            <FormLabel component="legend">نامشخص</FormLabel>
            <FormGroup>
              <Controller
                name="unknow"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">تبلیغات</MenuItem>
                    <MenuItem value="2">به عنوان یک سرگرمی</MenuItem>
                    <MenuItem value="3">
                      امکان مصرف ان با خانواده و دوستان
                    </MenuItem>
                    <MenuItem value="4">سایر موارد</MenuItem>
                    <MenuItem value="5">اصلا استفاده نمیکنم</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.unknow?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.fastFood} fullWidth>
            <FormLabel component="legend">
              همبرگر، سوسیس، کالباس، پیتزا:
            </FormLabel>
            <FormGroup>
              <Controller
                name="fastFood"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">روزی یکبار</MenuItem>
                    <MenuItem value="2">هفته‌ای 3-1 بار</MenuItem>
                    <MenuItem value="3"> ماهی 3-1 بار</MenuItem>
                    <MenuItem value="4"> سالی 10-5 بار</MenuItem>
                    <MenuItem value="5"> هرگز</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.fastFood?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.friedFood}
            fullWidth
          >
            <FormLabel component="legend">
              سیب زمینی سرخ کرده، سمبوسه، فلافل، ناگت:{" "}
            </FormLabel>
            <FormGroup>
              <Controller
                name="friedFood"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">روزی یکبار</MenuItem>
                    <MenuItem value="2">هفته‌ای 3-1 بار</MenuItem>
                    <MenuItem value="3"> ماهی 3-1 بار</MenuItem>
                    <MenuItem value="4"> سالی 10-5 بار</MenuItem>
                    <MenuItem value="5"> هرگز</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.friedFood?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.sugarCubes}
            fullWidth
          >
            <FormLabel component="legend">
              به طور متوسط هر روز جند حبه قند در اندازه متوسط مصرف می‌کنید؟
            </FormLabel>
            <FormGroup>
              <Controller
                name="sugarCubes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">اصلا</MenuItem>
                    <MenuItem value="2">1-2 بار</MenuItem>
                    <MenuItem value="3">3-4 بار</MenuItem>
                    <MenuItem value="4">5-8 بار</MenuItem>
                    <MenuItem value="5">9 بار و بیشتر</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.sugarCubes?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.cakeConsumption}
            fullWidth
          >
            <FormLabel component="legend">
              در هفته بطور متوسط چند بار کیک، کلوچه و بیسکوئیت استفاده می‌کنید؟{" "}
            </FormLabel>
            <FormGroup>
              <Controller
                name="cakeConsumption"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">اصلا</MenuItem>
                    <MenuItem value="2"> کمتر از هفته‌ای یکبار</MenuItem>
                    <MenuItem value="3">1-2 بار</MenuItem>
                    <MenuItem value="4"> 3-4 بار</MenuItem>
                    <MenuItem value="5"> 5 بار و بیشتر</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.cakeConsumption?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.snackConsumption}
            fullWidth
          >
            <FormLabel component="legend">
              در هفته بطور متوسط چندبار از میان وعده‌هایی مثل چیپس، پفک و کرانچی
              استفاده می‌کنید؟{" "}
            </FormLabel>
            <FormGroup>
              <Controller
                name="snackConsumption"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">اصلا</MenuItem>
                    <MenuItem value="2">کمتر از هفته‌ای یکبار</MenuItem>
                    <MenuItem value="3"> 1-2 بار</MenuItem>
                    <MenuItem value="4"> 3-4 بار 3-4 بار</MenuItem>
                    <MenuItem value="5"> 3-4 بار</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.snackConsumption?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.smoking} fullWidth>
            <FormLabel component="legend">آیا سیگار می‌کشید؟ </FormLabel>
            <FormGroup>
              <Controller
                name="smoking"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">بلی</MenuItem>
                    <MenuItem value="2">گاهی</MenuItem>
                    <MenuItem value="3"> ترک کرده‌ام</MenuItem>
                    <MenuItem value="4">
                      {" "}
                      هیچگاه مصرف نکرده‌ام (زیر 100 عدد شامل این گزینه می‌شود)
                    </MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.smoking?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.addictionTreatment}
            fullWidth
          >
            <FormLabel component="legend">
              آیا سابقه درمان اعتیاد دارید؟
            </FormLabel>
            <FormGroup>
              <Controller
                name="addictionTreatment"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">بله</MenuItem>
                    <MenuItem value="2">خیر</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>
              {errors.addictionTreatment?.message}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl component="fieldset" error={!!errors.gender} fullWidth>
            <FormLabel component="legend">جنسیت شما چیست؟</FormLabel>
            <FormGroup>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} fullWidth>
                    <MenuItem value="1">مرد</MenuItem>
                    <MenuItem value="2">زن</MenuItem>
                  </Select>
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          بعدی
        </Button>
      </form>

      <ResultModal
        open={openModal}
        message={resultMessage}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Step1;
