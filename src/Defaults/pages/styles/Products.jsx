import React from "react";
import Tablets from "../../../assets/images/SamusangTablet.webp";
import Wooferspeaker from "../../../assets/images/wooferspeaker2.webp";
import Tshirt from "../../../assets/images/t-shirtgreef2.jpg";
import ShortTshirt from "../../../assets/images/t-shirtgreef1.jpg";
import Img1 from "../../../assets/images/shirt.png";
import Img2 from "../../../assets/images/shirt2.png";
import Cards from "../../../shared/cards/Cards";

const ProductsData = [
  {
    id: 1,
    status: "In stock",
    img: Tshirt,
    title: "T-shirt",
    description: "Greef long t-shirts in all colors",
    price: "800",
    reviews: "10",
  },
  {
    id: 2,
    status: "In stock",
    img: Tablets,
    title: "Tablets",
    description: "Samsung Tablets all categories available here..",
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
    img: Img1,
    title: "Women western",
    description: "Red",
    price: "200",
    reviews: "7",
  },
  {
    id: 5,
    status: "In stock",
    img: Img2,
    title: "Women wears",
    description: "Womens shirt",
    price: "200",
    reviews: "7",
  },
  {
    id: 6,
    status: "In stock",
    img: Wooferspeaker,
    title: "Woofer Speaker",
    description: "Sound devices for both home and ceremony use",
    price: "600",
    reviews: "1",
  },
];

const Products = () => {
  return (
    <div className="">
      <div className="container dark:bg-gray-900">
        {/* Header section */}
        <div className="mb-10 gap-1 grid md:grid-cols-2 grid-cols-2 pt-10">
          <h1 className=" font-bold text-start text-gray-600">Top Products Liked</h1>
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
            {ProductsData.map((item, index) => {
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

export default Products;
