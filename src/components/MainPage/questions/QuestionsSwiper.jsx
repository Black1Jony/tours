import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const QuestionsSwiper = ({ faq }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      a11y={{ enabled: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      spaceBetween={24}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {faq.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="p-8 border-2 border-transparent rounded-3xl bg-white h-full flex flex-col justify-between shadow-md hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
            <h3 className="font-semibold text-lg mb-3 text-indigo-700">{item.question}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
            <span className="mt-4 text-xs text-gray-400 italic">
              Answer provided by our support team
            </span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default QuestionsSwiper;

