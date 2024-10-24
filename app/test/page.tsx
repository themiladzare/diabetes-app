import MultiStepForm from "../components/MultiStepForm";

const page = () => {
  return (
    <div className="flex flex-col">
      {/* <div className="flex flex-col items-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          سپید
        </h1>
        <p className="mt-4 text-sm leading-8 text-gray-600">
          سامانه پایش یزد دیابت
        </p>
      </div> */}
      <MultiStepForm />
    </div>
  );
};

export default page;
