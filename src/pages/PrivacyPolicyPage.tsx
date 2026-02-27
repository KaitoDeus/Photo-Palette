import React, { useEffect } from "react";

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-brand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand-100">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b-2 border-brand-200 pb-4 inline-block">
            Chính Sách & Miễn Trừ Trách Nhiệm
          </h1>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-brand-500 mb-4 flex items-center gap-2">
                1. Mục Đích Dự Án
              </h2>
              <p>
                Photo Palette là một phần mềm được xây dựng và phát triển bởi Võ
                Anh Khải với mục đích chính là học hỏi, nghiên cứu và rèn luyện
                kỹ năng lập trình web .
              </p>
              <p className="mt-2">
                Dự án này hoàn toàn phi lợi nhuận. Mình không thu bất kỳ khoản
                phí nào từ người chơi, không gắn quảng cáo, và chắc chắn không
                sử dụng cho mục đích kinh doanh hay thương mại nào.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-500 mb-4 flex items-center gap-2">
                2. Miễn Trừ Trách Nhiệm
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Tất cả hình ảnh, tài nguyên, và ý tưởng thiết kế trong dự án
                  này có thể được mình tham khảo từ các nguồn mở trên mạng
                </li>
                <li>
                  Hình ảnh mẫu được sử dụng để làm ví dụ minh họa trên trang
                  web. Nếu không muốn hình ảnh xuất hiện tại đây, vui lòng liên
                  hệ với mình để mình gỡ xuống ngay lập tức.
                </li>
                <li>
                  Dự án này hoàn toàn độc lập, không hề có liên quan hay hợp tác
                  với bất kỳ tổ chức, công ty hay nhãn hàng nào khác.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-500 mb-4 flex items-center gap-2">
                3. Vấn Đề Quyền Riêng Tư Và Dữ Liệu
              </h2>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Tất cả hình ảnh các bạn chụp đều được xử lý trực tiếp ngay
                  trên trình duyệt máy tính hoặc điện thoại của bạn.
                </li>
                <li>
                  Hệ thống sẽ không lưu lại, không tải lên hay chia sẻ bất cứ
                  bức ảnh nào của bạn.
                </li>
                <li>
                  Chỉ cần tắt trang web thì mọi dữ liệu hình ảnh sẽ tự động xóa
                  bỏ hoàn toàn.
                </li>
              </ul>
            </section>

            <section className="bg-brand-50 p-6 rounded-xl border border-brand-100">
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Liên Hệ Tác Giả
              </h2>
              <p className="text-sm">
                Nếu có bất cứ thắc mắc nào về bản quyền hoặc nội dung trên trang
                web, mọi người cứ thoải mái liên hệ với mình qua thông tin dưới
                đây để mình xử lý nhanh nhất nhé:
              </p>
              <div className="mt-4 font-medium flex flex-col gap-1">
                <span>Người phát triển: Võ Anh Khải</span>
                <span>
                  Email:{" "}
                  <a
                    href="mailto:khaivo300605@gmail.com"
                    className="text-brand-500 hover:underline"
                  >
                    khaivo300605@gmail.com
                  </a>
                </span>
              </div>
            </section>

            <div className="pt-8 border-t border-slate-100 text-center text-slate-400 text-sm italic">
              Cập nhật lần cuối ngày 21 tháng 02 năm 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
