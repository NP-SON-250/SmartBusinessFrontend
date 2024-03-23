import React from "react";
import {
  FaCarSide,
  FaHeadphonesAlt,
  FaWallet,
  FaCheckCircle,
} from "react-icons/fa";

const ServiceData = [
  {
    id: 1,
    icon: <FaCarSide className="text-4xl md:text-5xl text-blue-500" />,
    title: "Free Shipping",
    description: "Free Shipping On All Order",
  },
  {
    id: 2,
    icon: <FaCheckCircle className="text-4xl md:text-5xl text-green-800" />,
    title: "Safe Money ",
    description: "30 Days Money Back",
  },
  {
    id: 3,
    icon: <FaWallet className="text-4xl md:text-5xl text-red-500" />,
    title: "Secure Payment",
    description: "All Payment Secure",
  },
  {
    id: 4,
    icon: <FaHeadphonesAlt className="text-4xl md:text-5xl text-primary" />,
    title: "Online Supoort 24/7",
    description: "Technical Support 24/7",
  },
];

const Services = () => {
  return (
    <div className="dark:bg-gray-900 ">
      <div className="container pt-10 pb-10">
        <div className="overflow-x-scroll lg:overflow-x-hidden flex gap-5">
          {ServiceData.map((data) => (
            <div className="flex flex-col items-start sm:flex-row gap-4">
              {data.icon}
              <div>
                <h1 className="lg:text-xl font-bold w-[13rem]">{data.title}</h1>
                <h1 className="text-gray-400 text-sm">{data.description}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
