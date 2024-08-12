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
      <div className="w-full  flex flex-col justify-center items-center gap-8 px-0 lg:px-2 ">
        <div className="flex justify-center  flex-col lg:flex-row gap-5 w-full">
          <div className="flex flex-col items-center justify-center w-1/2">
            <p className="text-xl lg:text-xl mb-1 font-bold w-full text-start">
              All Device Status
            </p>
            <MeterStatistics />
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 ">
            <p className="text-xl lg:text-xl mb-1 font-bold w-full text-start">
              Device Locations
            </p>
            <MeterLocationMap />
          </div>
        </div>
        <div className="w-[100%] px-4 flex items-center justify-center">
          <AlertDashboard />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
