import React from "react";
import Electronic from "../../../assets/images/electrobg.jpg";
import Cards from "../../../shared/cards/Cards";
import Tablets from "../../../assets/images/CartImage2.jpg";
import Tshirt from "../../../assets/images/Computer1.jpg";
import ShortTshirt from "../../../assets/images/electrostove1.avif";
import Img1 from "../../../assets/images/refregra1.jpg";
import Img2 from "../../../assets/images/Tele1.jpg";

const topElectronics = [
  {
    id: 1,
    status: "In stock",
    img: Tshirt,
    title: "Computers",
    description: "All brands and categories available",
    price: "800",
    reviews: "10",
  },
  {
    id: 2,
    status: "In stock",
    img: Tablets,
    title: "Cameras",
    description: "Cameras all brand available here..",
    price: "200",
    reviews: "2",
  },
  {
    id: 3,
    status: "In stock",
    img: ShortTshirt,
    title: "Electric Stoves",
    description: "All electric stoves are here on cheap price",
    price: "800",
    reviews: "3",
  },
  {
    id: 4,
    status: "In stock",
    img: Img2,
    title: "Telephones",
    description: "Smart phones, tablets, and cell phones are available",
    price: "200",
    reviews: "7",
  },
  {
    id: 5,
    status: "In stock",
    img: Img1,
    title: "Refrigerators",
    description: "All brands and sizes are available",
    price: "200",
    reviews: "7",
  },
];

const Electronics = () => {
  return (
    <div className="">
      <div className="container dark:bg-gray-900">
        {/* Header section */}
        <div className="mb-10 gap-1 grid md:grid-cols-2 grid-cols-2 ">
          <h1 className=" font-bold text-start text-gray-600">Electronic Devices</h1>
          <a
            href="#"
            className=" w-20 absolute md:right-24 right-2 underline text-gray-400 font-medium text-end hover:text-primary "
          >
            See more
          </a>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 place-items-center gap-10">
            {/* card section */}
            {topElectronics.map((item, index) => {
              return (
                <Cards
                  key={index}
                  status={item.status}
                  image={item.img}
                  reviews={item.reviews}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Electronics;
