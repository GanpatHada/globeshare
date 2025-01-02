import React from "react";
import "./PostImages.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const PostImages = ({ images }) => {
  return <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
  {
    images.map((image,index)=>{
      return <SwiperSlide key={index}><img src={image} alt="" /></SwiperSlide>
    })
  }
</Swiper>
};

export default PostImages;
