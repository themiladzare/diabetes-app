/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Container,
  CircularProgress,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  first_name: yup.string().required('نام الزامی است'),
  last_name: yup.string().required('نام خانوادگی الزامی است'),
  national_id: yup
    .string()
    .required('کد ملی الزامی است')
    .min(10, 'کد ملی باید 10 رقم باشد')
    .max(10, 'کد ملی باید 10 رقم باشد')
    .matches(/^\d+$/, 'کد ملی باید فقط عدد باشد'),
  phone_number: yup
    .string()
    .required('شماره تماس الزامی است')
    .matches(/^09\d{9}$/, 'شماره تماس باید با 09 شروع شود و 11 رقم باشد'),
})

interface Step0Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextStep: (data: any) => void
  loading: boolean
}

const Step0: React.FC<Step0Props> = ({ nextStep, loading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => nextStep(data)

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.first_name}
            fullWidth
          >
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              نام
            </FormLabel>
            <FormGroup>
              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>
              {errors.first_name?.message as string}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.last_name}
            fullWidth
          >
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              نام خانوادگی
            </FormLabel>
            <FormGroup>
              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>
              {errors.last_name?.message as string}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.national_id}
            fullWidth
          >
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              کد ملی
            </FormLabel>
            <FormGroup>
              <Controller
                name="national_id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>
              {errors.national_id?.message as string}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box mb={3}>
          <FormControl
            component="fieldset"
            error={!!errors.phone_number}
            fullWidth
          >
            <FormLabel component="legend" sx={{ mb: 1 }} className="text-right">
              شماره تماس
            </FormLabel>
            <FormGroup>
              <Controller
                name="phone_number"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} variant="outlined" fullWidth />
                )}
              />
            </FormGroup>
            <FormHelperText>
              {errors.phone_number?.message as string}
            </FormHelperText>
          </FormControl>
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          color="primary"
          fullWidth
        >
          {loading ? <CircularProgress /> : 'بعدی'}
        </Button>
      </form>
    </Container>
  )
}

export default Step0

