import React from "react";
import ImageCarousel from "../Pages/Carousel";
import { Carousel } from "react-responsive-carousel";
import CarouselPart from "../Pages/Carousel";


const Home = () => {
  return (
    <div className=" w-full ">
     <div className="container mx-auto">
        <CarouselPart></CarouselPart>
     </div>
    </div>
  );
};

export default Home;
