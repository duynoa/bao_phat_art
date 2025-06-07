import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

const Aboutus = () => {
  return (
    <div className="container mx-auto max-w-screen-xl flex flex-col gap-4 justify-center items-center">
      <h1 className="text-headline2 text-gray-900">Về chúng tôi</h1>
      <p className="text-body1 text-gray-600 text-center w-[90%] xl:w-[70%]">
        Chúng tôi là đơn vị chuyên nghiệp hàng đầu trong lĩnh vực thiết kế và thi công hồ bơi, 
        sông hơi và nhà phố. Với đội ngũ kỹ sư giàu kinh nghiệm cùng công nghệ hiện đại, 
        chúng tôi cam kết mang đến những công trình chất lượng cao, 
        đáp ứng mọi yêu cầu khắt khe của khách hàng. Sự hài lòng của quý khách 
        chính là thước đo thành công của chúng tôi.
      </p>
      <Image
        src={IMAGES.aboutus}
        alt="About us"
        width={1000}
        height={1000}
        className="w-[90%] aspect-[3] object-cover rounded-lg"
      />
    </div>
  );
};

export default Aboutus;
