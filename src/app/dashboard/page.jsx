import { AlertSlider } from "@/components/AlertSlider";
import { MyLineChart } from "@/components/MyLineChart";
import { bg } from "@/assets/bg.jpg";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-12 p-4">
      <img
        src="https://img.freepik.com/free-vector/abstract-blue-technology-background_23-2149352058.jpg?w=1060&t=st=1723230659~exp=1723231259~hmac=37f630cf5978cecc658291b2a096b3932d2462c112bed56bbcff071cb70b5fb0"
        className=" fixed -z-50 h-96 w-screen top-0"
      />
      <div className="flex justify-between gap-4 items-center flex-col lg:flex-row max-w-[95%]">
        <div className="flex flex-col items-center justify-center w-full lg:w-[50%] ">
          <p className="w-full text-lg mb-4 text-[#fefefe] font-semibold">
            All Devices Status
          </p>
          <MyLineChart />
        </div>
        <div className="flex flex-col items-center justify-center w-full lg:w-[50%]">
          <p className="w-full text-lg mb-4 text-[#fefefe] font-semibold">
            All Devices Location
          </p>
          <img
            className="bg-[#fefefe] border border-border rounded-3xl h-[28rem]  p-2"
            src="https://preview.redd.it/onu66oy4iat91.png?width=620&format=png&auto=webp&s=264221aad2627d3ef34c564c9d91942d645e8f45"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <p className="max-w-[72vw] w-full text-start text-lg mb-4 text-[#1f1f1f] font-semibold">
          All Alarms
        </p>
        <div className="max-w-[72vw] p-4 bg-gradient-to-r from-blue-400 to-pink-400 flex justify-center items-center border border-border rounded-3xl">
          <AlertSlider />
        </div>
      </div>
    </div>
  );
};

export default page;
