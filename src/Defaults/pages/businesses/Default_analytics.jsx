import React from 'react';
import { earningData } from '../../../shared/data/DummyData';
const Default_analytics = () => {
  return (
    <div className="pt-[8rem] pb-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:-mr-64 justify-center gap-5 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 w-44 dark:text-gray-200 dark:bg-gray-900 md:w-56  p-4 pt-9 rounded-md ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Default_analytics