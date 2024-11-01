"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";
import cover from "./asset/home.jpg";
import Image from "next/image";

const Home: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      router.push("/test");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleClick = () => {
    setLoading(true);
    router.push("/test");
  };

  return (
    <div className="flex flex-col items-center text-center px-4 pt-8 sm:pt-12 lg:pt-14">
      <div className="w-full max-w-2xl mb-5">
        <Image
          src={cover}
          width={800}
          height={450}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
          alt="home"
        />
      </div>

      <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-8xl">
        سپید
      </h1>
      <p className="mt-12 text-3xl leading-8 text-gray-600">
        سامانه پایش یزد دیابت
      </p>

      <div className="mt-10 flex items-center justify-center gap-x-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            padding: "12px 24px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? "در حال انتقال..." : "اکنون شروع کنید"}
        </motion.button>
      </div>

      <Backdrop open={loading} style={{ zIndex: 1200 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Home;
