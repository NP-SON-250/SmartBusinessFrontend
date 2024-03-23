import React from 'react';
import smartwatch2 from "../../assets/images/greenWitch.png";
import Shared_bannerCard from './Shared_bannerCard';

const BannerData = {
    discount: "30% OFF",
    title: "Best Watch",
    date: "14 Jan 2023",
    image: smartwatch2,
    title2: "Smart Solo",
    title3: "Watch for men",
    title4:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
    bgColor: "#2dcc6f",
  };

const TheBanner = () => {
  return (
    <div> 
     <Shared_bannerCard data={BannerData} />
    </div>
  )
}

export default TheBanner