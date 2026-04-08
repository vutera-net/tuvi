import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chính sách & Điều khoản | Harmony Tử Vi',
  description: 'Chính sách bảo mật và điều khoản sử dụng dịch vụ Harmony Tử Vi.',
}

const LAST_UPDATED = '08/04/2026'

export default function ChinhSachPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero */}
      <div className="border-b border-red-100 bg-white py-14 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
          Pháp Lý
        </p>
        <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
          Chính Sách & Điều Khoản
        </h1>
        <p className="text-sm text-gray-400">Cập nhật lần cuối: {LAST_UPDATED}</p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14">
        {/* Nav anchor */}
        <div className="mb-10 flex flex-wrap gap-3">
          {[
            { href: '#dieu-khoan', label: 'Điều khoản sử dụng' },
            { href: '#bao-mat', label: 'Chính sách bảo mật' },
            { href: '#hoan-tien', label: 'Hoàn tiền' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border px-4 py-1.5 text-sm font-medium transition hover:bg-red-50"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="space-y-12 text-gray-700">
          {/* Điều khoản sử dụng */}
          <section id="dieu-khoan">
            <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">1. Điều khoản sử dụng</h2>

            <div className="space-y-4 text-sm leading-relaxed">
              <h3 className="font-semibold text-gray-800">1.1 Chấp nhận điều khoản</h3>
              <p>
                Bằng cách truy cập và sử dụng Harmony Tử Vi, bạn đồng ý tuân thủ các điều khoản và điều kiện được
                nêu trong tài liệu này. Nếu không đồng ý, vui lòng ngừng sử dụng dịch vụ.
              </p>

              <h3 className="font-semibold text-gray-800">1.2 Mục đích sử dụng</h3>
              <p>
                Harmony Tử Vi cung cấp thông tin về tử vi, phong thủy và lịch âm dương mang tính chất tham khảo.
                Các kết quả tính toán dựa trên tri thức dân gian truyền thống và <strong>không thay thế</strong> lời
                khuyên chuyên nghiệp về y tế, pháp lý hay tài chính.
              </p>

              <h3 className="font-semibold text-gray-800">1.3 Tài khoản người dùng</h3>
              <p>
                Bạn chịu trách nhiệm bảo mật thông tin đăng nhập và mọi hoạt động diễn ra dưới tài khoản của mình.
                Nghiêm cấm sử dụng tài khoản để thực hiện các hành vi vi phạm pháp luật hoặc gây hại cho người khác.
              </p>

              <h3 className="font-semibold text-gray-800">1.4 Sở hữu trí tuệ</h3>
              <p>
                Toàn bộ nội dung trên Harmony Tử Vi — bao gồm văn bản, hình ảnh, thuật toán và phần mềm — là tài sản
                của chúng tôi hoặc được cấp phép hợp lệ. Không sao chép, phân phối lại mà không có sự chấp thuận
                bằng văn bản.
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Chính sách bảo mật */}
          <section id="bao-mat">
            <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">2. Chính sách bảo mật</h2>

            <div className="space-y-4 text-sm leading-relaxed">
              <h3 className="font-semibold text-gray-800">2.1 Thông tin thu thập</h3>
              <p>Chúng tôi thu thập các thông tin sau khi bạn sử dụng dịch vụ:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Thông tin tài khoản: email, tên, ảnh đại diện (nếu đăng ký)</li>
                <li>Thông tin ngày sinh, giờ sinh (để tính toán tử vi, ngũ hành)</li>
                <li>Lịch sử tra cứu (để lưu kết quả cá nhân hóa)</li>
                <li>Dữ liệu kỹ thuật: địa chỉ IP, loại trình duyệt, thời gian truy cập</li>
              </ul>

              <h3 className="font-semibold text-gray-800">2.2 Mục đích sử dụng</h3>
              <p>Thông tin được sử dụng để:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Cung cấp và cải thiện dịch vụ</li>
                <li>Cá nhân hóa trải nghiệm người dùng</li>
                <li>Xử lý thanh toán và quản lý gói dịch vụ</li>
                <li>Gửi thông báo liên quan đến tài khoản (không spam)</li>
              </ul>

              <h3 className="font-semibold text-gray-800">2.3 Chia sẻ thông tin</h3>
              <p>
                Chúng tôi <strong>không bán</strong> thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ với
                bên thứ ba trong các trường hợp: xử lý thanh toán (Stripe), phân tích lưu lượng (Google Analytics),
                hoặc theo yêu cầu pháp lý.
              </p>

              <h3 className="font-semibold text-gray-800">2.4 Bảo mật dữ liệu</h3>
              <p>
                Dữ liệu được mã hóa khi truyền tải (HTTPS/TLS). Mật khẩu được hash trước khi lưu trữ. Chúng tôi
                áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin của bạn.
              </p>

              <h3 className="font-semibold text-gray-800">2.5 Quyền của bạn</h3>
              <p>Bạn có quyền:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Truy cập và chỉnh sửa thông tin cá nhân</li>
                <li>Yêu cầu xóa tài khoản và dữ liệu liên quan</li>
                <li>Rút lại sự đồng ý sử dụng dữ liệu bất kỳ lúc nào</li>
              </ul>
              <p>
                Để thực hiện các quyền này, vui lòng liên hệ qua{' '}
                <a href="/lien-he" className="underline hover:text-red-700" style={{ color: 'var(--color-primary)' }}>
                  trang liên hệ
                </a>.
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Chính sách hoàn tiền */}
          <section id="hoan-tien">
            <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">3. Chính sách hoàn tiền</h2>

            <div className="space-y-4 text-sm leading-relaxed">
              <h3 className="font-semibold text-gray-800">3.1 Hoàn tiền trong 7 ngày</h3>
              <p>
                Nếu bạn không hài lòng với dịch vụ, chúng tôi hoàn tiền 100% trong vòng <strong>7 ngày</strong> kể
                từ ngày thanh toán đầu tiên — không cần giải thích lý do.
              </p>

              <h3 className="font-semibold text-gray-800">3.2 Điều kiện hoàn tiền</h3>
              <ul className="ml-4 list-disc space-y-1">
                <li>Yêu cầu phải được gửi trong vòng 7 ngày kể từ ngày thanh toán</li>
                <li>Áp dụng cho lần thanh toán đầu tiên (không áp dụng cho gia hạn)</li>
                <li>Hoàn tiền qua phương thức thanh toán ban đầu trong 5–10 ngày làm việc</li>
              </ul>

              <h3 className="font-semibold text-gray-800">3.3 Hủy đăng ký</h3>
              <p>
                Bạn có thể hủy đăng ký bất kỳ lúc nào. Sau khi hủy, dịch vụ vẫn hoạt động đến hết chu kỳ
                thanh toán hiện tại. Chúng tôi không hoàn tiền cho phần thời gian còn lại.
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400">
            Có câu hỏi về chính sách?{' '}
            <a href="/lien-he" className="underline hover:text-gray-600">
              Liên hệ chúng tôi
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
