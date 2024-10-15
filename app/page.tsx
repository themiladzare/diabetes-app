"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

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
    <div className="text-center py-32 sm:py-48 lg:py-56">
      <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        سامانه سپید
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        سلامتی شما اولویت شماست، امروز خطر خود را بدانید!
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          onClick={handleClick}
          disabled={loading}
          className="min-w-[150px] bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
        >
          {loading ? <CircularProgress color="white" /> : "اکنون شروع کنید"}
        </button>
      </div>
      {loading && (
        <div className="mt-6 text-lg leading-8 text-gray-600">
          در حال انتقال به صفحه تست...
        </div>
      )}
    </div>
  );
};

export default Home;
