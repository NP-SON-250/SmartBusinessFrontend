import React from "react";
import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/images/footer-pattern.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const FooterLinks = [
  {
    title: "About Us",
    link: "/about",
  },
  {
    title: "SSales Blogs",
    link: "/#Ssaleblogs",
  },
  {
    title: "Collaboration",
    link: "/#collaboration",
  },
  {
    title: "FAQ's",
    link: "/#faqs",
  },
];
const MoreInfo = [
  {
    title: "Term and Conditions",
    link: "/terms",
  },
  {
    title: "Privacy Policy",
    link: "/#policy",
  },
  {
    title: "Shipping Policy",
    link: "/#shipping",
  },
  {
    title: "Sitemap",
    link: "/#sitemap",
  },
];
const Dash_footer = () => {
  return (
    <div style={BannerImg} className="text-white -mb-10">
      <div className="container ">
        <div data-aos="zoom-in" className=" grid lg:grid-cols-3 lg:pb-24 pt-5 lg:ml-60">
          {/* company details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-0">
              <img src={footerLogo} alt="" className="max-w-[50px]" />S
              <span className="text-secondary">Business</span>
            </h1>
            <p>
              Integration of different technologies helps streamline processes,
              reduce manual intervention, and enhance overall productivity of
              your busines.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Company
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  More Info
                </h1>
                <ul className="flex flex-col gap-3">
                  {MoreInfo.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* social links */}

            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Social Medias
              </h1>
              <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl hover:text-primary hover:translate-x-1 duration-300" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl hover:text-primary hover:translate-x-1 duration-300" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl hover:text-primary hover:translate-x-1 duration-300" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3 hover:text-primary cursor-pointer hover:translate-x-1 duration-300">
                  <FaLocationArrow />
                  <p>Huye, Alema Softs</p>
                </div>
                <div className="flex flex-cols-2 items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>
                    +250786731449 <br />
                    +250783313398
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center w-full lg:ml-96 md:ml-[4rem] md:pb-24">
            <p className="text-center md:text-white text-black  hover:text-primary cursor-pointer hover:translate-x-1 duration-300 mt-20">
              &copy; 2023 Alema softs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash_footer;
