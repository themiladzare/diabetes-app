// components/Step3.tsx
import React, { useState } from "react";
import { Box, Button, TextField, FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ResultModal from "./ResultModal";

// تعریف اعتبارسنجی با Yup
const schema = yup.object().shape({
  heartComplications: yup.string().required("سابقه عوارض قلبی الزامی است"),
  eyeComplications: yup.string().required("سابقه عوارض چشمی الزامی است"),
  kidneyComplications: yup.string().required("سابقه عوارض کلیوی الزامی است"),
});

// تعریف کامپوننت مرحله سوم
const Step3 = ({ nextStep }: { nextStep: () => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [openModal, setOpenModal] = useState(false); // برای کنترل نمایش مدال
  const [resultMessage, setResultMessage] = useState(""); // برای ذخیره پیام نتیجه

  const onSubmit = async (data: any) => {
    console.log(data); // برای مشاهده داده‌های ورودی در کنسول

    // شبیه‌سازی درخواست به سرور (در اینجا می‌توانید کد واقعی API را اضافه کنید)
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("داده با موفقیت ارسال شد!"); // پیام موفقیت
      }, 1000);
    });

    setResultMessage(response as string); // ذخیره پیام نتیجه
    setOpenModal(true); // باز کردن مدال
  };

  const handleCloseModal = () => {
    setOpenModal(false); // بسته شدن مدال
    nextStep(); // رفتن به مرحله بعد
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <Controller
            name="heartComplications"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="عوارض قلبی (سابقه آنژیوگرافی)"
                variant="outlined"
                fullWidth
                error={!!errors.heartComplications}
                helperText={errors.heartComplications?.message}
              />
            )}
          />
        </Box>
        <Box mb={2}>
          <Controller
            name="eyeComplications"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="عوارض چشمی"
                variant="outlined"
                fullWidth
                error={!!errors.eyeComplications}
                helperText={errors.eyeComplications?.message}
              />
            )}
          />
        </Box>
        <Box mb={2}>
          <Controller
            name="kidneyComplications"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="عوارض کلیوی"
                variant="outlined"
                fullWidth
                error={!!errors.kidneyComplications}
                helperText={errors.kidneyComplications?.message}
              />
            )}
          />
        </Box>
        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center  dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
        >
          بعدی
        </button>
      </form>

      {/* استفاده از کامپوننت مدال */}
      <ResultModal
        open={openModal}
        message={resultMessage}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Step3;
