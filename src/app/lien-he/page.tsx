import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Liên hệ | Harmony Tử Vi',
  description: 'Liên hệ với đội ngũ Harmony Tử Vi để được hỗ trợ, giải đáp thắc mắc hoặc góp ý.',
}

export default function LienHePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero */}
      <div className="border-b border-red-100 bg-white py-14 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
          Hỗ Trợ
        </p>
        <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
          Liên Hệ
        </h1>
        <p className="mx-auto max-w-xl text-lg text-gray-500">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">Gửi tin nhắn</h2>
            <form className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700" htmlFor="name">
                  Họ và tên
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700" htmlFor="subject">
                  Chủ đề
                </label>
                <select
                  id="subject"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                >
                  <option value="">Chọn chủ đề...</option>
                  <option value="support">Hỗ trợ kỹ thuật</option>
                  <option value="billing">Thanh toán & Gói dịch vụ</option>
                  <option value="feedback">Góp ý sản phẩm</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700" htmlFor="message">
                  Nội dung
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Nội dung bạn muốn liên hệ..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Gửi tin nhắn
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">Thông tin liên hệ</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-2xl">✉️</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Email hỗ trợ</p>
                    <p className="text-sm text-gray-500">support@harmonytuvinam.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-2xl">⏰</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Thời gian phản hồi</p>
                    <p className="text-sm text-gray-500">Thứ 2 – Thứ 6, 9:00 – 18:00</p>
                    <p className="text-sm text-gray-500">Thường phản hồi trong vòng 24 giờ</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-2xl">📍</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Địa chỉ</p>
                    <p className="text-sm text-gray-500">Thành phố Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ shortcut */}
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
              <h3 className="mb-2 font-semibold text-gray-900">Câu hỏi thường gặp</h3>
              <p className="mb-4 text-sm text-gray-600">
                Trước khi gửi, hãy xem thử câu hỏi thường gặp — có thể bạn sẽ tìm được câu trả lời ngay.
              </p>
              <a
                href="/pricing#faq"
                className="inline-block rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-white"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                Xem FAQ →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
