import React from "react";
import Wears from "../../../assets/images/Wearclothes.jpg";
import Cards from "../../../shared/cards/Cards";
import Shoes from "../../../assets/images/newshoe.jpeg";
import Tshirt from "../../../assets/images/newwatch.png";
import ShortTshirt from "../../../assets/images/t-shirtgreef4.jpg";
import Img1 from "../../../assets/images/CartImage2.webp";
import Img2 from "../../../assets/images/shirt2.png";

const topProduct = [
  {
    id: 1,
    status: "In stock",
    img: Tshirt,
    title: "New watche",
    description: "Watches for men and women available",
    price: "800",
    reviews: "10",
  },
  {
    id: 2,
    status: "In stock",
    img: Shoes,
    title: "Shoes",
    description: "Both Men and Women shoes all color available here..",
    price: "200",
    reviews: "2",
  },
  {
    id: 3,
    status: "In stock",
    img: ShortTshirt,
    title: "Short Tshirt",
    description: "Short t-shirts both greefs and non-greefs",
    price: "800",
    reviews: "3",
  },
  {
    id: 4,
    status: "In stock",
    img: Img2,
    title: "Summer shirts",
    description: "Summer shirts for both men and women are available",
    price: "200",
    reviews: "7",
  },
  {
    id: 5,
    status: "In stock",
    img: Img1,
    title: "Men long coats",
    description: "Men' long coats all sizes and colors are available",
    price: "200",
    reviews: "7",
  },
];

const TopProducts = () => {
  return (
    <div className="">
      <div className="container dark:bg-gray-900">
        {/* Header section */}
        <div className="mb-10 gap-1 grid md:grid-cols-2 grid-cols-2 pt-10 ">
          <h1 className=" font-bold text-start text-gray-600 w-64">Best men and women styles</h1>
          <a
            href="#"
            className=" w-20 absolute md:right-24 right-2 underline text-gray-400 font-medium text-end hover:text-primary "
          >
            See more
          </a>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-items-center gap-10">
            
            {/* card section */}
            {topProduct.map((item, index) => {
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

export default TopProducts;
