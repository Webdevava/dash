import AlertDashboard from "@/components/AlertDashboard";
import MeterStatistics from "@/components/MeterStatistics";
import MeterLocationMap from "@/components/MeterLocationMap";
import Layout from "@/components/Layout";

const page = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-12 p-4">
        <div className="flex justify-between gap-4 items-center flex-col lg:flex-row ">
          <div className="flex flex-col items-center justify-center w-[36rem]  ">
            <p className="w-full text-lg mb-4  font-semibold">
              All Devices Status
            </p>
            {/* <MyBarChart /> */}
            <MeterStatistics />
          </div>
          <div className="flex flex-col items-center justify-center w-[36rem] ">
            <p className="w-full text-lg mb-4 font-semibold">
              All Devices Location
            </p>
            <MeterLocationMap />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="max-w-[72vw] w-full flex items-center justify-between text-lg mb-4 text-[#1f1f1f] font-semibold">
            <p>All Alarms</p>
            <div className="flex text-xs space-x-4 mb-4">
              <div className="flex items-center space-x-2 bg-[#fefefe] rounded-3xl p-2 shadow-md">
                <span className="w-3 h-3 bg-[#3e4cc3] rounded-full"></span>
                <span className="text-sm font-semibold">Generated</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#fefefe] rounded-3xl p-2 shadow-md">
                <span className="w-3 h-3 bg-[#FFA500] rounded-full"></span>
                <span className="text-sm font-semibold">Pending</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#fefefe] rounded-3xl p-2 shadow-md">
                <span className="w-3 h-3 bg-[#22c55e] rounded-full"></span>
                <span className="text-sm font-semibold">Resolved</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 w-full">
            <AlertDashboard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
