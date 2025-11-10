import React from "react";
import ImageCarousel from "../Pages/Carousel";
import { Carousel } from "react-responsive-carousel";
import CarouselPart from "../Pages/Carousel";
import CategoryCard from "../Pages/CategoryCard";
import RecentBills from "../Pages/RecentBills";
import BillsCardSection from "../Pages/RecentBills";
import EnergySavingTips from "../Pages/Extrasec1";
import AboutSmartUtility from "../Pages/Extrasec2";


const Home = () => {
  return (
    <div className=" w-full ">
     <div className="container mx-auto">
        <CarouselPart></CarouselPart>
        <CategoryCard></CategoryCard>
        <BillsCardSection></BillsCardSection>
        <EnergySavingTips></EnergySavingTips>
        <AboutSmartUtility></AboutSmartUtility>

     </div>
    </div>
  );
};

export default Home;
