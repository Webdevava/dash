// import { CarouselSize } from "@/components/AlertDashboard";
import dynamic from "next/dynamic";

const MeterStatistics = dynamic(() => import("@/components/MeterStatistics"), {
  ssr: false,
});
const MeterLocationMap = dynamic(
  () => import("@/components/MeterLocationMap"),
  { ssr: false }
);
const AlertDashboard = dynamic(() => import("@/components/AlertDashboard"), {
  ssr: false,
});
const Layout = dynamic(() => import("@/components/Layout"), { ssr: false });

const page = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-12 ">
        <div className="flex justify-between gap-4 items-center flex-col lg:flex-row ">
          <div className="flex flex-col items-center justify-center w-full lg:w-[36rem]  ">
            <p className="w-full text-2xl mb-4  font-bold">
              All Devices Status
            </p>
            <MeterStatistics />
          </div>
          <div className="flex flex-col items-center justify-center w-full lg:w-[36rem] ">
            <p className="w-full text-2xl mb-4 font-bold">
              All Devices Location
            </p>
            <MeterLocationMap />
          </div>
        </div>
        <AlertDashboard/>
      </div>
    </Layout>
  );
};

export default page;
