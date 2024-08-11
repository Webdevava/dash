import dynamic from "next/dynamic";

const MeterStatistics = dynamic(() => import("@/components/MeterStatistics"), {
  ssr: false,
});
const MeterLocationMap = dynamic(
  () => import("@/components/MeterLocationMap"),
  {
    ssr: false,
  }
);
const AlertDashboard = dynamic(() => import("@/components/AlertDashboard"), {
  ssr: false,
});
const Layout = dynamic(() => import("@/components/Layout"), { ssr: false });

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-8 lg:gap-12 px-4 lg:px-8 py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
          <div className="flex flex-col items-center justify-center w-[97%] lg:w-1/2">
            <p className="text-xl lg:text-2xl mb-4 font-bold w-full text-start">
              All Devices Status
            </p>
            <MeterStatistics />
          </div>
          <div className="flex flex-col items-center justify-center w-[97%] lg:w-1/2">
            <p className="text-xl lg:text-2xl mb-4 font-bold w-full text-start">
              All Devices Location
            </p>
            <MeterLocationMap />
          </div>
        </div>
        <div className="w-full">
          <AlertDashboard />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
