import React from "react";
import Slider from "react-slick";
import user1 from "../../../assets/images/women.png";
import user2 from "../../../assets/images/women2.jpg";
import user3 from "../../../assets/images/women3.jpg";
import user4 from "../../../assets/images/women4.jpg";
import user5 from "../../../assets/images/mine.jpeg";

const TestimonialData = [
  {
    id: 1,
    name: "Joseline",
    text: "Every thing is right and we are all aware of the unstoppable growth of eCommerce and the rising competitiveness that comes along with it.",
    img: user1,
  },
  {
    id: 2,
    name: "Meron Cyomukama",
    text: "This is a great way to show potential customers that the company is trustworthy and that the products are of high quality.",
    img: user2,
  },
  {
    id: 3,
    name: "Shalon Mbabazi",
    text: "Smart business is an ecommerce store that specializes in selling all categories of products and by different sellere and suppliers.",
    img: user3,
  },
  {
    id: 5,
    name: "Alexis Kalim",
    text: "Every thing is right and we are all aware of the unstoppable growth of eCommerce and the rising competitiveness that comes along with it.",
    img: user5,
  },
  {
    id: 6,
    name: "Sandra",
    text: "We are all aware of the unstoppable growth of smart business and the rising competitiveness that comes along with it.",
    img: user4,
  },
];

const Testimonials = ({ testimonials }) => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <div className="container dark:bg-gray-900 pt-10 pb-10">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            What our customers are saying
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Testimonials
          </h1>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div className="my-6">
                <div
                  key={data.id}
                  className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative"
                >
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
