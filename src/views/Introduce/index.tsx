import { IMAGES } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Introduce = () => {
  return (
    <div className="min-h-screen container py-24 px-4 sm:px-6 lg:px-8">
      {/* Phần Giới thiệu */}
      <section className="mb-32">
        <h2 className="text-5xl font-bold text-gray-900 mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Giải Pháp Hồ Bơi & Phòng Xông Hơi Cao Cấp
          </span>
        </h2>

        {/* Card chính với hiệu ứng glass morphism */}
        <div className="backdrop-blur-lg bg-white/80 rounded-3xl shadow-2xl p-12 hover:shadow-3xl transition-all duration-500 border border-white/20">
          <div className="space-y-6">
            <p className="text-2xl font-semibold text-gray-800 leading-relaxed">
              Kiến tạo không gian thư giãn đẳng cấp với công nghệ hiện đại
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Với hơn 500+ dự án thành công trên toàn quốc, chúng tôi tự hào
              mang đến giải pháp toàn diện về:
            </p>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Thiết kế & thi công hồ bơi thông minh tiêu chuẩn quốc tế
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Lắp đặt phòng xông hơi cao cấp với công nghệ Châu Âu
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Bảo trì và vận hành chuyên nghiệp trọn đời
              </li>
            </ul>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
                title: "Thiết kế sáng tạo",
                desc: "Phong cách độc đáo",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Chất lượng hàng đầu",
                desc: "Vật liệu cao cấp",
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                title: "Đội ngũ chuyên gia",
                desc: "15+ năm kinh nghiệm",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mt-6 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phần Sứ mệnh */}
      <section className="mb-20">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Sứ mệnh
          </span>
          <div className="h-1 flex-grow bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        </h2>
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mb-6">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Tầm nhìn của chúng tôi
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Trở thành đối tác tin cậy và là người tiên phong trong việc cung
                cấp các giải pháp công nghệ sáng tạo, góp phần thúc đẩy sự phát
                triển của doanh nghiệp và xã hội.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">
                  Cam kết của chúng tôi
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Đảm bảo chất lượng sản phẩm tốt nhất
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Hỗ trợ khách hàng 24/7
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Liên tục cải tiến và đổi mới
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phần Thành tích với card mới */}
      <section className="max-w-7xl mx-auto mb-32">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Thành tích
          </span>
          <div className="h-1 flex-grow bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              number: "1000+",
              text: "Khách hàng hài lòng",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ),
            },
            {
              number: "Top 10",
              text: "Công ty công nghệ tiêu biểu 2023",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              ),
            },
            {
              number: "2023",
              text: "Giải thưởng Sao Khuê",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              ),
            },
          ].map((item, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  {item.number}
                </h3>
                <p className="text-lg text-gray-700">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phần Đánh giá khách hàng */}
      <section className="mb-20">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Khách hàng nói gì về chúng tôi
          </span>
          <div className="h-1 flex-grow bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Nguyễn Văn A",
              position: "Giám đốc Công ty ABC",
              content:
                "Chất lượng dịch vụ và sản phẩm vượt xa mong đợi. Đội ngũ chuyên nghiệp và tận tâm.",
              image: IMAGES.gray,
            },
            {
              name: "Trần Thị B",
              position: "Chủ khách sạn XYZ Resort",
              content:
                "Hồ bơi được thi công đúng tiến độ, chất lượng tuyệt vời. Khách hàng rất hài lòng.",
              image: IMAGES.gray,
            },
            {
              name: "Lê Văn C",
              position: "Chủ đầu tư Dự án DEF",
              content:
                "Phòng xông hơi cao cấp với công nghệ hiện đại. Dịch vụ bảo trì chuyên nghiệp.",
              image: IMAGES.gray,
            },
            {
              name: "Phạm Thị D",
              position: "Quản lý Spa GHI",
              content:
                "Đội ngũ tư vấn nhiệt tình, am hiểu chuyên môn. Rất hài lòng với kết quả.",
              image: IMAGES.gray,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <Image
                  width={64}
                  height={64}
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-gray-600">{item.position}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section với gradient mới */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="relative group rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90"></div>
          <div className="relative px-12 py-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Bắt đầu dự án của bạn ngay hôm nay
            </h2>
            <p className="text-white/90 text-xl mb-8">
              Hãy để chúng tôi giúp bạn hiện thực hóa ý tưởng kinh doanh
            </p>
            <Link
              href="/lien-he"
              className="bg-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:transform hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Liên hệ ngay
              </span>
              <div className="absolute rounded-full inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduce;
