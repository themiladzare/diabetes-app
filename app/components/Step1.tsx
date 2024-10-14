// components/Step1.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ResultModal from './ResultModal';

const schema = yup.object().shape({
  weight: yup.number().required('وزن الزامی است').positive('وزن باید مثبت باشد').integer('وزن باید عدد صحیح باشد'),
  height: yup.number().required('قد الزامی است').positive('قد باید مثبت باشد').integer('قد باید عدد صحیح باشد'),
  ageRange: yup.string().required('محدوده سنی الزامی است'),
  intenseExercise: yup.string().required('فعالیت بدنی شدید الزامی است'),
  moderateExercise: yup.string().required('فعالیت بدنی متوسط الزامی است'),
  midnightBathroom: yup.string().required('بیدار شدن نیمه شب الزامی است'),
  sodaConsumption: yup.string().required('مصرف نوشیدنی گازدار الزامی است'),
  sugarDrink: yup.string().required('مصرف نوشیدنی‌های شیرین الزامی است'),
  fastFood: yup.string().required('مصرف فست‌فود الزامی است'),
  friedFood: yup.string().required('مصرف سیب‌زمینی سرخ‌کرده و فست‌فود الزامی است'),
  sugarCubes: yup.string().required('مصرف قند الزامی است'),
  cakeConsumption: yup.string().required('مصرف کیک و کلوچه الزامی است'),
  snackConsumption: yup.string().required('مصرف میان‌وعده‌های شور الزامی است'),
  smoking: yup.string().required('وضعیت مصرف سیگار الزامی است'),
  addictionTreatment: yup.string().required('وضعیت درمان اعتیاد الزامی است'),
  gender: yup.string().required('جنسیت الزامی است'),
});

const Step1 = ({ nextStep }: { nextStep: () => void }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [openModal, setOpenModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const onSubmit = async (data: any) => {
    console.log(data);
    setResultMessage('داده‌ها با موفقیت ارسال شدند!');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    nextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* فیلدهای ورودی برای قد و وزن */}
        <Box mb={2}>
          <Controller
            name="weight"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="وزن (کیلوگرم)" variant="outlined" fullWidth error={!!errors.weight} helperText={errors.weight?.message} />
            )}
          />
        </Box>
        <Box mb={2}>
          <Controller
            name="height"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="قد (سانتی‌متر)" variant="outlined" fullWidth error={!!errors.height} helperText={errors.height?.message} />
            )}
          />
        </Box>

        {/* محدوده سنی */}
        <Box mb={2}>
          <Controller
            name="ageRange"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.ageRange}>
                <InputLabel>محدوده سنی</InputLabel>
                <Select {...field} label="محدوده سنی">
                  <MenuItem value="20-29">20-29</MenuItem>
                  <MenuItem value="30-39">30-39</MenuItem>
                  <MenuItem value="40-49">40-49</MenuItem>
                  <MenuItem value="50-59">50-59</MenuItem>
                  <MenuItem value="60-69">60-69</MenuItem>
                </Select>
                <FormHelperText>{errors.ageRange?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* فعالیت بدنی شدید */}
        <Box mb={2}>
          <Controller
            name="intenseExercise"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.intenseExercise}>
                <InputLabel>فعالیت بدنی شدید</InputLabel>
                <Select {...field} label="فعالیت بدنی شدید">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="1 بار در هفته">1 بار در هفته</MenuItem>
                  <MenuItem value="2 بار در هفته">2 بار در هفته</MenuItem>
                  <MenuItem value="3-4 بار در هفته">3-4 بار در هفته</MenuItem>
                  <MenuItem value="5 بار یا بیشتر">5 بار یا بیشتر</MenuItem>
                </Select>
                <FormHelperText>{errors.intenseExercise?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* فعالیت بدنی متوسط */}
        <Box mb={2}>
          <Controller
            name="moderateExercise"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.moderateExercise}>
                <InputLabel>فعالیت بدنی متوسط</InputLabel>
                <Select {...field} label="فعالیت بدنی متوسط">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="1 بار در هفته">1 بار در هفته</MenuItem>
                  <MenuItem value="2 بار در هفته">2 بار در هفته</MenuItem>
                  <MenuItem value="3-4 بار در هفته">3-4 بار در هفته</MenuItem>
                  <MenuItem value="5 بار یا بیشتر">5 بار یا بیشتر</MenuItem>
                </Select>
                <FormHelperText>{errors.moderateExercise?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* بیدار شدن نیمه شب */}
        <Box mb={2}>
          <Controller
            name="midnightBathroom"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.midnightBathroom}>
                <InputLabel>بیدار شدن برای دستشویی در نیمه شب</InputLabel>
                <Select {...field} label="بیدار شدن برای دستشویی در نیمه شب">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="گاهی">گاهی</MenuItem>
                  <MenuItem value="معمولاً">معمولاً</MenuItem>
                  <MenuItem value="همیشه">همیشه</MenuItem>
                </Select>
                <FormHelperText>{errors.midnightBathroom?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* سایر فیلدهای چند گزینه‌ای */}
        <Box mb={2}>
          <Controller
            name="sodaConsumption"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.sodaConsumption}>
                <InputLabel>نوشیدنی گازدار</InputLabel>
                <Select {...field} label="نوشیدنی گازدار">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="گاهی">گاهی</MenuItem>
                  <MenuItem value="معمولاً">معمولاً</MenuItem>
                  <MenuItem value="همیشه">همیشه</MenuItem>
                </Select>
                <FormHelperText>{errors.sodaConsumption?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* مصرف نوشیدنی های شیرین شده با شکر */}
        <Box mb={2}>
          <Controller
            name="sugarDrink"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.sugarDrink}>
                <InputLabel>نوشیدنی‌های شیرین شده با شکر</InputLabel>
                <Select {...field} label="نوشیدنی‌های شیرین شده با شکر">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="گاهی">گاهی</MenuItem>
                  <MenuItem value="معمولاً">معمولاً</MenuItem>
                  <MenuItem value="همیشه">همیشه</MenuItem>
                </Select>
                <FormHelperText>{errors.sugarDrink?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* مصرف فست فود */}
        <Box mb={2}>
          <Controller
            name="fastFood"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.fastFood}>
                <InputLabel>مصرف فست‌فود</InputLabel>
                <Select {...field} label="مصرف فست‌فود">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="گاهی">گاهی</MenuItem>
                  <MenuItem value="معمولاً">معمولاً</MenuItem>
                  <MenuItem value="همیشه">همیشه</MenuItem>
                </Select>
                <FormHelperText>{errors.fastFood?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* سایر فیلدها */}
        <Box mb={2}>
          <Controller
            name="friedFood"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.friedFood}>
                <InputLabel>سیب‌زمینی سرخ‌کرده و فست‌فودها</InputLabel>
                <Select {...field} label="سیب‌زمینی سرخ‌کرده و فست‌فودها">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="گاهی">گاهی</MenuItem>
                  <MenuItem value="معمولاً">معمولاً</MenuItem>
                  <MenuItem value="همیشه">همیشه</MenuItem>
                </Select>
                <FormHelperText>{errors.friedFood?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* قند */}
        <Box mb={2}>
          <Controller
            name="sugarCubes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.sugarCubes}>
                <InputLabel>مصرف قند</InputLabel>
                <Select {...field} label="مصرف قند">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="گاهی">گاهی</MenuItem>
                  <MenuItem value="معمولاً">معمولاً</MenuItem>
                  <MenuItem value="همیشه">همیشه</MenuItem>
                </Select>
                <FormHelperText>{errors.sugarCubes?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* کیک و کلوچه */}
        <Box mb={2}>
          <Controller
            name="cakeConsumption"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.cakeConsumption}>
                <InputLabel>کیک و کلوچه و بیسکوئیت</InputLabel>
                <Select {...field} label="کیک و کلوچه و بیسکوئیت">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="گاهی">گاهی</MenuItem>
                  <MenuItem value="معمولاً">معمولاً</MenuItem>
                  <MenuItem value="همیشه">همیشه</MenuItem>
                </Select>
                <FormHelperText>{errors.cakeConsumption?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* میان وعده‌های شور */}
        <Box mb={2}>
          <Controller
            name="snackConsumption"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.snackConsumption}>
                <InputLabel>مصرف میان‌وعده‌های شور</InputLabel>
                <Select {...field} label="مصرف میان‌وعده‌های شور">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="گاهی">گاهی</MenuItem>
                  <MenuItem value="معمولاً">معمولاً</MenuItem>
                  <MenuItem value="همیشه">همیشه</MenuItem>
                </Select>
                <FormHelperText>{errors.snackConsumption?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* مصرف سیگار */}
        <Box mb={2}>
          <Controller
            name="smoking"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.smoking}>
                <InputLabel>مصرف سیگار</InputLabel>
                <Select {...field} label="مصرف سیگار">
                  <MenuItem value="هرگز">هرگز</MenuItem>
                  <MenuItem value="گاهی">گاهی</MenuItem>
                  <MenuItem value="معمولاً">معمولاً</MenuItem>
                  <MenuItem value="همیشه">همیشه</MenuItem>
                </Select>
                <FormHelperText>{errors.smoking?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* سابقه درمان اعتیاد */}
        <Box mb={2}>
          <Controller
            name="addictionTreatment"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.addictionTreatment}>
                <InputLabel>سابقه درمان اعتیاد</InputLabel>
                <Select {...field} label="سابقه درمان اعتیاد">
                  <MenuItem value="بله">بله</MenuItem>
                  <MenuItem value="خیر">خیر</MenuItem>
                </Select>
                <FormHelperText>{errors.addictionTreatment?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* جنسیت */}
        <Box mb={2}>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth error={!!errors.gender}>
                <InputLabel>جنسیت</InputLabel>
                <Select {...field} label="جنسیت">
                  <MenuItem value="مرد">مرد</MenuItem>
                  <MenuItem value="زن">زن</MenuItem>
                </Select>
                <FormHelperText>{errors.gender?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          بعدی
        </Button>
      </form>

      {/* نمایش مدال */}
      <ResultModal open={openModal} message={resultMessage} onClose={handleCloseModal} />
    </>
  );
};

export default Step1;
