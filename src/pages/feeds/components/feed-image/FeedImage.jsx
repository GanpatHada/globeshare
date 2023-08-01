import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './FeedImage.css'
const FeedImage = ({ images }) => {
  return (
    <Swiper
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {images.map((image,index) => {
        return (
          <SwiperSlide key={index}>
            <section className="feed-image">
              <div className="feed-image-wrapper">
                <img
                  src={image}
                  alt=""
                />
              </div>
            </section>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default FeedImage;
