"use client";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="text-center py-32 sm:py-48 lg:py-56">
      <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        بررسی کننده خطر دیابت
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        سلامتی شما اولویت شماست، امروز خطر خود را بدانید!
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link href="/test">
          <button className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
            اکنون شروع کنید
          </button>
        </Link>
        I
      </div>
    </div>
  );
};

export default Home;
