import React from "react";
import Hero from "./Hero";
import Products from "../styles/Products";
import Services from "../../components/Services/Services";
import TopProducts from "../top_product/TopProducts";
import Electronics from "../electronics/Electronics";
import Testimonials from "./Testimonials";
import TheBanner from "../../../shared/banners/TheBanner";

const Landing = () => {
  return (
    <div>
      <div>
        <Hero />
      </div>
      <div>
        <Products />
      </div>
      <div>
        <Services />
      </div>
      <div>
        <TopProducts />
      </div>
      <div>
        <TheBanner />
      </div>
      <div>
        <Electronics />
      </div>
      <div>
        <Testimonials />
      </div>
    </div>
  );
};

export default Landing;
