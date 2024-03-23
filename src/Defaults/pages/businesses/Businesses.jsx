import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../../shared/fonts/Heading";
import Button from "../../../shared/button/Button";

// import images
import Img1 from "../../../assets/images/blog-1.jpg";
import Img2 from "../../../assets/images/blog-2.jpg";
import Img3 from "../../../assets/images/blog-3.jpg";

const BlogData = [
  {
    title: "How to choose perfect smartwatch",
    subtitle:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
    published: "Jan 20, 2024",
    publishedBy: "Steven",
    image: Img1,
    aosDelay: "0",
  },
  {
    title: "5 Star Fashion",
    subtitle:
      "5 Star Fashion is a business company that sells different styles for ladies and",
    published: "Jan 20, 2024",
    publishedBy: "Steven",
    image: Img3,
    aosDelay: "400",
  },
  {
    title: "5 Star Electronics",
    subtitle:
      "5 Star Electronics is a business company that sells different Electronic devices for ladies and gentlemen",
    published: "Jan 20, 2024",
    publishedBy: "Kalim",
    image: Img2,
    aosDelay: "400",
  },
];
const Businessess = () => {
  return (

    

    <div className="pt-32 pb-24">
      <div className="container">
        {/* Header section */}
        <Heading title="Registered Businesses" subtitle={"View Performance"} />
      {/* Business section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7">
        {/* card section */}
        {BlogData.map((data) => (
          <div
            data-aos="fade-up"
            data-aos-delay={data.aosDelay}
            className="group"
            key={data.id}
          >
            <div className="relative">
              <img
                src={data.image}
                alt=""
                className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500 cursor-pointer"
              />
              {/* hover button */}
              <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
                <Link to={"/analytics"}>
                <Button
                  text={"Analytics"}
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                  textFont={"md:text-sm text-xl"}

                />
                </Link>
              </div>
            </div>
            {/* content section */}
            <div className="space-y-2">
                <div className="grid grid-cols-2 ">
                  <p className="text-xs text-gray-500 ml-10 md:mt-2">
                    {data.published}
                  </p>
                  <p className="text-xl text-gray-500 text-bold text-end mr-10 md:-mt-0 -mt-1">
                    {data.publishedBy}
                  </p>
                </div>
                <p className="font-bold line-clamp-1 ml-5">{data.title}</p>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400 ml-5 ">
                  {data.subtitle}
                </p>
                
              </div>
            </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Businessess;
