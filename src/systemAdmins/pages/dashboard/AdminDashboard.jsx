import React from 'react';
import ChartCard from '../../../charts/ChartCard';
import LineCart01 from '../../../charts/LineChart01';


const Cards = [
  {
    id: 1,
    head: " Sales",
    total: "200",
    change: "10.2",
    from: "Increased",
  },
  {
    id: 2,
    head: " Purchases",
    total: "300",
    change: "13.22",
    from: "Decreased",
  },
  {
    id: 3,
    head: " Orders",
    total: "20",
    change: "2.6",
    from: "Decreased",
  },
];
const AdminsDashboards = () => {
  return (
    <div className="bg-white pr-2 pt-16">
            <div className="absolute lg:top-16 md:top-[4rem] top-22 md:right-[4rem] p-5 lg:left-72  right-8 grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 lg:gap-5 md:gap-10 gap-5">
              {Cards.map((item, index) => (
                <ChartCard
                  key={index}
                  head={item.head}
                  total={item.total}
                  change={item.change}
                  from={item.from}
                />
              ))}
            </div>
            <div className="basis-[100%] grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:pt-28 md:pt-48 pt-96 pr-0 p-2 gap-4 lg:ml-72 md:ml-72">
              <div className="w-full md:mt-[20rem] lg:mt-10 bg-white rounded-md">
                <div className="selection text-center p-4">
                  <select
                    name="month"
                    id="month"
                    className="w-1/2 text-center h-8 bg-transparent border border-gray-700 rounded-md text-gray-900"
                  >
                    <option value="Jan">Jan</option>
                    <option value="Jan">Feb</option>
                    <option value="Jan">Mar</option>
                    <option value="Jan">Apr</option>
                    <option value="Jan">May</option>
                    <option value="Jan">Jun</option>
                    <option value="Jan">Jul</option>
                    <option value="Jan">Aug</option>
                    <option value="Jan">Sep</option>
                    <option value="Jan">Oct</option>
                    <option value="Jan">Nov</option>
                    <option value="Jan">Dec</option>
                  </select>
                </div>
                <LineCart01 />
              </div>
              <div className="w-full lg:mt-10 md:mt-10 pt-0 bg-white rounded-md">
                <h1 className="text-l text-gray-600 text-center font-normal">
                  Monthly Gain
                </h1>

                <div className="grid lg:grid-cols-2 md:pt-10 md:grid-cols-2 grid-cols-1 gap-2 md:pl-4 pl-12 pt-5">
                  <div className="h-20 md:h-30 lg:h-20 md:mb-16 pl-2 text-center profit bg-transparent border-2 border-yellow-800 rounded-md cursor-pointer hover:transform hover:scale-105 transition-transform  w-5/6 shadow-md">
                    <h1 className="text-gray-700 text-md text-left">
                      Purchases Made: <br />
                    </h1>
                    <h1 className="text-gray-900 text-2xl font-bold">
                      {"500 $"}
                    </h1>
                  </div>
                  <div className="h-20 md:h-30 lg:h-20 md:mb-16 text-center profit bg-transparent border-2 border-yellow-800 rounded-md cursor-pointer hover:transform hover:scale-105 transition-transform w-5/6 shadow-md">
                    <h1 className="text-gray-700 text-md">
                      Sales Made: <br />
                    </h1>
                    <h1 className="text-gray-900 text-2xl font-bold">
                      {"300 $"}
                    </h1>
                  </div>
                  <div className="h-20 md:h-30 lg:h-20 md:mb-16 text-center profit bg-transparent border-2 border-yellow-800 rounded-md cursor-pointer hover:transform hover:scale-105 transition-transform w-5/6 shadow-md">
                    <h1 className="text-gray-700 text-md">
                      Expenses Used: <br />
                    </h1>
                    <h1 className="text-gray-900 text-2xl font-bold">
                      {"50 $"}
                    </h1>
                  </div>
                  <div className="h-20 md:h-30 lg:h-20 md:mb-16 text-center profit bg-transparent border-2 border-yellow-800 rounded-md cursor-pointer hover:transform hover:scale-105 transition-transform w-5/6 shadow-md">
                    <h1 className="text-gray-700 text-md">
                      Profit Gained: <br />
                    </h1>
                    <h1 className="text-gray-900 text-2xl font-bold">
                      {"150 $"}
                    </h1>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-10 pt-5 p-4"></div>
              </div>
            </div>
          </div>
  );
};

export default AdminsDashboards;
