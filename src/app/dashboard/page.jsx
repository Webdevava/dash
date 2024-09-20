import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SPC from "@/components/SPC";
import SensorData from "@/components/SensorData";
import Analytics from "@/components/Analytics";
import Proximity from "@/components/Proximity";

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
      <div className="w-full flex flex-col justify-center items-center gap-8 px-4 lg:px-2">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="livecharts">Live Charts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="flex justify-center flex-col lg:flex-row gap-5 w-full">
              <div className="flex flex-col items-center justify-center lg:w-1/2">
                <p className="text-xl lg:text-xl mb-1 font-bold w-full text-start">
                  All Device Status
                </p>
                <MeterStatistics />
              </div>
              <div className="flex flex-col items-center justify-center lg:w-1/2 ">
                <p className="text-xl lg:text-xl mb-1 font-bold w-full text-start">
                  Device Locations
                </p>
                <MeterLocationMap />
              </div>
            </div>
            <div className="w-[100%] px-4 flex flex-col gap-8 items-center justify-center">
              <AlertDashboard />
            </div>
          </TabsContent>
          <TabsContent value="livecharts">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Live Charts</h2>
              <SensorData />
              {/* <Proximity/> */}
              <SPC />
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Analytics</h2>
              <Analytics />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Page;
