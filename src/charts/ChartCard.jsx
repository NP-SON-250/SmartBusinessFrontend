// Corrected ChartCard.jsx
import React from "react";

const ChartCard = ({ id, head, total, change, from }) => {
  return (
    <div key={id} className="z-1">
      <div className=" md:w-96 lg:w-56 w-64 md:pl-24 lg:pl-0 md:h-25 lg:h-24 h-32 bg-white rounded-md border-2 border-yellow-800 shadow-md duration-200 cursor-pointer hover:transform hover:scale-105 transition-transform">
        <p className="text-gray-700 text-l ml-3">{head}</p>
        <p className="text-gray-900 text-2xl font-bold ml-3">
          {total}
        </p>
        <div className="flex md:flex-row flex-col lg:flex-row gap-1">
          <p className="text-gray-700 text-l lg:-mt-0 md:-mt-0 -mt-2 ml-3">
            {from}
          </p>
          <p className="text-gray-700 bg-gray-400 rounded-full w-14 h-6 text-center ml-3">
            {change}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
