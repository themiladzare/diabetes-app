'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { motion } from 'framer-motion'
import cover from './asset/home.jpg'
import Image from 'next/image'

import { NextPage } from 'next'

export type PageWithNoLayout = NextPage & {
  noLayout?: boolean
}

const Home: PageWithNoLayout = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
      router.push('/test')
    }, 10000)
    return () => clearTimeout(timer)
  }, [router])

  const handleClick = () => {
    setLoading(true)
    router.push('/test')
  }

  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-center">
      <Image
        src={cover}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
        alt="home"
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-10" />
      <div className="relative z-20 max-w-2xl px-4 sm:px-8 lg:px-12">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-8xl">
          سپید
        </h1>
        <p className="mt-12 text-3xl leading-8 text-white">
          سامانه پایش یزد دیابت
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
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
            disabled={loading}
            onClick={handleClick}
          >
            {loading ? 'در حال انتقال...' : 'اکنون شروع کنید'}
          </motion.button>
        </div>
      </div>
      <Backdrop open={loading} style={{ zIndex: 1200 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Home
