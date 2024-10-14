// components/Step4.tsx
import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ResultModal from "./ResultModal";

// تعریف اعتبارسنجی با Yup
const schema = yup.object().shape({
  hormones: yup.string().required("ورود هورمون‌های عامل الزامی است"),
});

// تعریف کامپوننت مرحله چهارم
const Step4 = ({ nextStep }: { nextStep: () => void }) => {
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
            name="hormones"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="هورمون های عامل استعداد ابتلا به دیابت"
                variant="outlined"
                fullWidth
                error={!!errors.hormones}
                helperText={errors.hormones?.message}
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

export default Step4;
