'use client'

import React, { useState } from 'react'
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import stylisRTLPlugin from 'stylis-plugin-rtl'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { motion } from 'framer-motion'
import { toPersianDigits } from './numberUtils'
import DialComponent from './DialComponent'
import cover from '../asset/qa.jpg'

// Importing Step Components
import Step0 from './Step0'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
// RTL cache configuration
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [stylisRTLPlugin],
})

// MUI theme configuration
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'IRANSans, Arial, sans-serif',
  },
})

const steps = ['ثبت نام', 'دمو گرافیک', 'پارا کلینیکی', 'کلینیکی', 'ژنتیک']

type FormData = {
  [key: string]: string | number
}

const INITIAL_FORM_DATA: FormData = {
  test1: '',
  test2: '',
  Ghad: '',
  Vazn: '',
  test12: '',
  test14: '',
  test198: '',
  test199: '',
  test22: '',
  test24: '',
  test203: '',
  test204: '',
  test215: '',
  test219: '',
  test253: '',
  test262: '',
  FSG: '',
  Chol: '',
  HDL: '',
  TG: '',
  LDL: '',
  test62: '',
  test71: '',
  test72: '',
  test82: '',
  test88: '',
  test89: '',
  test92: '',
  test102: '',
  test106: '',
}

interface ResultMessageProps {
  prediction: number
  confidence_class_0: number
  confidence_class_1: number
}

interface Result {
  prediction: number
  confidence_class_0: number
  confidence_class_1: number
}

const ResultMessage = ({
  prediction,
  confidence_class_0,
  confidence_class_1,
}: ResultMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          backgroundColor: prediction == 1 ? '#fdecea' : '#e0f7fa',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: prediction == 1 ? '#d32f2f' : '#00796b',
          }}
        >
          نتیجه فرایند
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <span style={{ fontWeight: 'bold' }}>
            {prediction == 1 ? ' دیابت دارید ،' : ' دیابت ندارید ،'}
          </span>
          {` میزان اطمینان به پاسخ `}
          <span style={{ fontWeight: 'bold' }}>
            {prediction == 2
              ? `${toPersianDigits((confidence_class_1 * 100).toFixed(2))}%`
              : `${toPersianDigits((confidence_class_0 * 100).toFixed(2))}%`}
          </span>
          {` است.`}
        </Typography>
      </Box>
    </motion.div>
  )
}

const StepperComponent: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [resultMessage, setResultMessage] = useState<string | null>('')
  const [result, setResult] = useState<Result | null>(null)
  const [nationalId, setNationalId] = useState<string>('')

  const sendFormData = async (data: FormData) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    // Determine the endpoint based on the active step
    const endpoint =
      activeStep === 0
        ? `${apiUrl}/Demographic/register/`
        : `${apiUrl}/Demographic/predict/`

    // Add national_id to all requests except registration
    const requestData =
      activeStep === 0 ? data : { ...data, national_id: nationalId }

    try {
      toast.loading('در حال ارسال داده‌ها...')
      const response = await axios.post(endpoint, requestData)

      if (response.status === 200) {
        toast.dismiss()
        toast.success('داده‌ها با موفقیت ارسال شدند!')

        // Only set result for prediction endpoints (not registration)
        if (activeStep !== 0) {
          setResult(response.data)

          const message = !response.data?.prediction
            ? `با توجه به پیش‌بینی، احتمال اینکه شخص دیابت داشته باشد ${
                response.data?.confidence_class_1 * 100
              }% است.`
            : `با توجه به پیش‌بینی، احتمال اینکه شخص دیابت نداشته باشد ${
                response.data?.confidence_class_0 * 100
              }% است.`

          setResultMessage(message)
        }

        setActiveStep((prev) => prev + 1)
        return response.data
      }
    } catch (error) {
      toast.dismiss()
      if (axios.isAxiosError(error)) {
        toast.error(
          `خطا در ارسال داده‌ها: ${
            error.response?.data?.message || error.message
          }`
        )
      } else {
        toast.error('خطای ناشناخته‌ای رخ داده است.')
      }
    }
  }

  const handleNext = async (data: FormData) => {
    const updatedFormData = { ...formData, ...data }
    setFormData(updatedFormData)

    // Store national_id from registration step
    if (activeStep === 0 && data.national_id) {
      setNationalId(data.national_id as string)
    }

    setIsLoading(true)
    await sendFormData(updatedFormData)
    setIsLoading(false)
  }

  const renderStep = () => {
    const stepComponents = [
      <Step0 key="step0" nextStep={handleNext} loading={isLoading} />,
      <Step1 key="step1" nextStep={handleNext} loading={isLoading} />,
      <Step2 key="step2" nextStep={handleNext} loading={isLoading} />,
      <Step3 key="step3" nextStep={handleNext} loading={isLoading} />,
      <Step4 key="step4" nextStep={handleNext} loading={isLoading} />,
    ]
    return stepComponents[activeStep]
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            backgroundImage: `url(${cover.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="px-6 pt-14 pb-8 lg:px-8 ">
            <Container maxWidth="xl">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255,.9)', // Semi-transparent white background
                  borderRadius: 2,
                  boxShadow: 3,
                  p: { xs: 2, sm: 3, md: 4 },
                }}
              >
                <div className="flex flex-col items-center mb-6">
                  <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    سپید
                  </h1>
                  <p className="mt-2 text-sm leading-8 text-gray-600">
                    سامانه پایش یزد دیابت
                  </p>
                </div>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{ width: '100%' }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {result && typeof result !== 'boolean' && resultMessage && (
                  <ResultMessage
                    prediction={result.prediction}
                    confidence_class_0={result.confidence_class_0}
                    confidence_class_1={result.confidence_class_1}
                  />
                )}

                <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
                  {activeStep > steps.length - 1 ? (
                    <div className="flex flex-col items-center">
                      {result && typeof result !== 'boolean' && (
                        <DialComponent
                          value={result.confidence_class_0 * 100}
                        />
                      )}
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}
                        className="!my-8"
                      >
                        تبریک! شما تمامی مراحل را با موفقیت به پایان رساندید 🎉
                      </Typography>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          padding: '12px 24px',
                          backgroundColor: '#1976d2',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '16px',
                        }}
                        onClick={() => {
                          setActiveStep(0)
                          setResult(null)
                          setResultMessage(null)
                          setNationalId('')
                        }}
                      >
                        شروع دوباره
                      </motion.button>
                    </div>
                  ) : (
                    renderStep()
                  )}
                </Box>
              </Box>
            </Container>
          </div>
        </Box>
        <Toaster />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default StepperComponent
