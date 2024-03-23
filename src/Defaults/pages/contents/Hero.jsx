import React from "react";
import Image1 from "../../../assets/images/headphone.png";
import Image2 from "../../../assets/images/gaming.png";
import Image3 from "../../../assets/images/macbook.png";
import Image4 from "../../../assets/images/greenWitch.png";
import Image5 from "../../../assets/images/speaker.png";
import Image6 from "../../../assets/images/shirt3.png";
import Slider from "react-slick";
import { usePopup } from "../../../PopupContext";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% off on all Cameras",
    description:
      "Get different kinds of camera on cheap price, by pressing order now button",
  },
  {
    id: 2,
    img: Image2,
    title: "30% off on all Tablet Devices",
    description:
      "All different tablets of all kinds all upto 30% is off. press order now",
  },
  {
    id: 3,
    img: Image3,
    title: "70% off on all Products Sale",
    description:
      "Get different kinds of clothes for both kids, men, amd women.",
  },
  {
    id: 4,
    img: Image4,
    title: "Upto 50% off on all Cameras",
    description:
      "Get different kinds of camera on cheap price, by pressing order now button",
  },
  {
    id: 5,
    img: Image5,
    title: "30% off on all Tablet Devices",
    description:
      "All different tablets of all kinds all upto 30% is off. press order now",
  },
  {
    id: 6,
    img: Image6,
    title: "70% off on all Products Sale",
    description:
      "Get different kinds of clothes for both kids, men, amd women.",
  },
];

const Hero = () => {
  const { handleOrderPopup } = usePopup();
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
      {/* background pattern */}
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
      {/* hero section */}
      <div className="container pb-8 sm:pb-0 md:mt-0 lg:mt-10 mt-32">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-once="true"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="100"
                    className="text-sm"
                  >
                    {data.description}
                  </p>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="300"
                  >
                    <button
                      onClick={handleOrderPopup}
                      className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full md:ml-10"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
                {/* image section */}
                <div className="order-1 sm:order-2">
                  <div
                    data-aos="zoom-in"
                    data-aos-once="true"
                    className="relative z-10"
                  >
                    <img
                      src={data.img}
                      alt=""
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
