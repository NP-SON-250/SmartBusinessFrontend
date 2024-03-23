import React from "react";
import { FaStar, FaCheck } from "react-icons/fa6";

const Cards = ({
  id,
  reviews,
  image,
  title,
  description,
  price,
  status,
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={price}
      key={id}
      className="space-y-1"
    >
      <div className="flex ml-10 mb-10">
        <FaCheck className="text-white h-4 w-4 rounded-full bg-green-900 opacity-80" />
        <p className="text-green-900 absolute -top-2 left-16 opacity-40">{status}</p>
      </div>
      <div>
        <img
          src={image}
          alt=""
          className="h-[150px] w-[150px] object-cover rounded-md cursor-pointer hover:transform hover:scale-105 transition-transform"
        />
      </div>
      <div className="flex items-center gap-0">
        <FaStar className="dark:text-primary/40 text-primary" />
        <FaStar className="dark:text-primary/40 text-primary" />
        <FaStar className="dark:text-primary/40 text-primary" />
        <FaStar className="text-gray-600" />
        <FaStar className="text-gray-600" />
        <span className="text-gray-600 ml-3">Revies({reviews})</span>
      </div>
      <div className="font-semibold">
        <h1>{title}</h1>
      </div>
      <div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex gap-2">
        <span className="text-gray-900 dark:text-white">{price}($)</span>
        <button className=" text-primary font-semibold hover:scale-105 duration-300 py-0 rounded-full mt-0 group-hover:bg-white group-hover:text-primary">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Cards;
