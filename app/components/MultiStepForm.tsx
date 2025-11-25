'use client'

import React, { useState } from 'react'
import { Box, Typography, Container, CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import stylisRTLPlugin from 'stylis-plugin-rtl'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { motion } from 'framer-motion'
import { toPersianDigits } from './numberUtils'
import DialComponent from './DialComponent'
import Image from 'next/image'
// import cover from '../asset/qa.jpg'
import cover from '../asset/sepid-bg-00.jpg'
// Importing Step Components
import Step0 from './Step0'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
// import Step4 from './Step4' // Temporarily disabled
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

const steps = ['ثبت نام', 'دمو گرافیک', 'پارا کلینیکی', 'کلینیکی'] // 'ژنتیک' temporarily disabled

// Custom Stepper Component matching the image design
interface CustomStepperProps {
  activeStep: number
  steps: string[]
}

const CustomStepper: React.FC<CustomStepperProps> = ({ activeStep, steps }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        py: 3,
        px: { xs: 1, sm: 2 },
        flexWrap: 'wrap',
      }}
    >
      {steps.map((step, index) => {
        const isCompleted = index < activeStep
        const isActive = index === activeStep

        return (
          <React.Fragment key={step}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                flex: { xs: '1 1 auto', sm: '0 0 auto' },
                minWidth: { xs: '70px', sm: '90px' },
                maxWidth: { xs: '90px', sm: '110px' },
              }}
            >
              {/* Step Circle */}
              <Box
                sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isActive
                    ? '#1976d2'
                    : isCompleted
                    ? '#e0e0e0'
                    : '#f5f5f5',
                  border: isActive
                    ? '2px solid #1976d2'
                    : isCompleted
                    ? '2px solid #e0e0e0'
                    : '2px solid #e0e0e0',
                  color: isActive
                    ? '#ffffff'
                    : isCompleted
                    ? '#666666'
                    : '#999999',
                  fontWeight: 'bold',
                  fontSize: { xs: '14px', sm: '16px' },
                  transition: 'all 0.3s ease',
                  zIndex: 2,
                }}
              >
                {isCompleted ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                      fill="#666666"
                    />
                  </svg>
                ) : (
                  <span>{toPersianDigits(String(index + 1))}</span>
                )}
              </Box>

              {/* Step Label */}
              <Typography
                sx={{
                  mt: 1,
                  fontSize: { xs: '10px', sm: '12px' },
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive
                    ? '#1976d2'
                    : isCompleted
                    ? '#666666'
                    : '#999999',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {step}
              </Typography>
            </Box>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  flex: { xs: '0 0 8px', sm: '0 0 16px' },
                  height: '2px',
                  backgroundColor: '#e0e0e0',
                  mx: { xs: 0.5, sm: 1 },
                  display: {
                    xs: index === steps.length - 2 ? 'none' : 'block',
                    sm: 'block',
                  },
                  alignSelf: 'flex-start',
                  mt: { xs: '20px', sm: '24px' },
                }}
              />
            )}
          </React.Fragment>
        )
      })}
    </Box>
  )
}

type FormData = {
  [key: string]: string | number | null
}

const INITIAL_FORM_DATA: FormData = {
  test1: null,
  test2: null,
  Ghad: null,
  Vazn: null,
  test12: null,
  test14: null,
  test198: null,
  test199: null,
  test22: null,
  test24: null,
  test203: null,
  test204: null,
  test215: null,
  test219: null,
  test253: null,
  test262: null,
  FSG: null,
  Chol: null,
  HDL: null,
  TG: null,
  LDL: null,
  test62: null,
  test71: null,
  test72: null,
  test82: null,
  test88: null,
  test89: null,
  test92: null,
  test102: null,
  test106: null,
}

interface ResultMessageProps {
  risk_percentage: number
}

interface Result {
  prediction: number
  risk_percentage: number
}

const ResultMessage = ({ risk_percentage }: ResultMessageProps) => {
  const formattedRisk = toPersianDigits(Number(risk_percentage || 0).toFixed(2))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          backgroundColor: '#fdecea',
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
            color: '#d32f2f',
          }}
        >
          نتیجه فرایند
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <span style={{ fontWeight: 'bold' }}>
            ریسک ابتلای شما به دیابت {formattedRisk}% است
          </span>
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

      if (response.status === 200 || response.status === 201) {
        toast.dismiss()
        toast.success('داده‌ها با موفقیت ارسال شدند!')

        // Only set result for prediction endpoints (not registration)
        if (activeStep !== 0) {
          setResult(response.data)
          const riskValue = Number(response.data?.risk_percentage || 0).toFixed(
            2
          )
          const message = `ریسک ابتلای شما به دیابت ${riskValue}% است`

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

  // Helper function to convert empty strings to null
  const normalizeFormData = (data: FormData): FormData => {
    const normalized: FormData = {}
    for (const key in data) {
      const value = data[key]
      // Convert empty strings, undefined, or whitespace-only strings to null
      if (
        value === '' ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '')
      ) {
        normalized[key] = null
      } else {
        normalized[key] = value
      }
    }
    return normalized
  }

  const handleNext = async (data: FormData) => {
    // Normalize the incoming data (convert empty strings to null)
    const normalizedData = normalizeFormData(data)
    const updatedFormData = normalizeFormData({
      ...formData,
      ...normalizedData,
    })
    setFormData(updatedFormData)

    // Store national_id from registration step
    if (activeStep === 0 && normalizedData.national_id) {
      setNationalId(normalizedData.national_id as string)
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
      // <Step4 key="step4" nextStep={handleNext} loading={isLoading} />, // Temporarily disabled
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
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
          }}
        >
          {/* Background Image with Next.js Image Optimization */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              overflow: 'hidden',
            }}
          >
            <Image
              src={cover}
              alt="Background"
              fill
              quality={90}
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              sizes="100vw"
            />
          </Box>

          {/* Content Layer */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
            }}
          >
            <div className="px-6 pt-14 pb-8 lg:px-8 ">
              <Container maxWidth="md">
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
                  <CustomStepper activeStep={activeStep} steps={steps} />

                  {result && typeof result !== 'boolean' && resultMessage && (
                    <ResultMessage risk_percentage={result.risk_percentage} />
                  )}

                  <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
                    {activeStep > steps.length - 1 ? (
                      <div className="flex flex-col items-center">
                        {result && typeof result !== 'boolean' && (
                          <DialComponent value={result.risk_percentage} />
                        )}
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}
                          className="!my-8"
                        >
                          تبریک! شما تمامی مراحل را با موفقیت به پایان رساندید
                          🎉
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
        </Box>
        <Toaster />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default StepperComponent
