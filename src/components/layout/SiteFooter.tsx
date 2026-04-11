import Link from 'next/link'

const ANMENH_URL = 'https://anmenh.vutera.net'
const HARMONY_URL = 'https://www.vutera.net/harmony'

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Ecosystem section */}
        <div className="mb-10 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-red-50 p-6">
          <p className="mb-4 text-center text-sm font-semibold text-gray-700">
            Hệ sinh thái Harmony — Nền tảng phong thủy & tử vi toàn diện cho người Việt
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={HARMONY_URL}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:shadow"
            >
              <span>🌐</span>
              <span>Harmony</span>
              <span className="text-xs text-gray-400">vutera.net/harmony</span>
            </a>
            <span className="hidden text-gray-300 sm:block">·</span>
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm"
              style={{ color: 'var(--color-primary)' }}>
              <span>⭐</span>
              <span>TuVi</span>
              <span className="text-xs text-red-300">tuvi.vutera.net</span>
              <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-xs text-red-600">Bạn đang ở đây</span>
            </div>
            <span className="hidden text-gray-300 sm:block">·</span>
            <a
              href={ANMENH_URL}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #C41E3A)' }}
            >
              <span>🔮</span>
              <span>AnMenh</span>
              <span className="text-xs opacity-75">Cá nhân hóa sâu hơn →</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☯</span>
              <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                Harmony Tử Vi
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Nền tảng phong thủy, tử vi và xem ngày tốt xấu toàn diện cho người Việt.
            </p>
          </div>

          {/* Tính năng */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Tính năng</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/lich" className="hover:text-red-700">Lịch Vạn Niên</Link></li>
              <li><Link href="/xem-menh" className="hover:text-red-700">Xem Mệnh</Link></li>
              <li><Link href="/tu-vi" className="hover:text-red-700">Lá Số Tử Vi</Link></li>
              <li><Link href="/so-sanh-la-so" className="hover:text-red-700">So Sánh Lá Số</Link></li>
              <li><Link href="/xem-ngay" className="hover:text-red-700">Xem Ngày Tốt</Link></li>
              <li><Link href="/phong-thuy" className="hover:text-red-700">Phong Thủy</Link></li>
            </ul>
          </div>

          {/* Kiến thức */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Kiến thức</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/blog" className="hover:text-red-700">Blog Tử Vi</Link></li>
              <li><Link href="/blog?category=ngu-hanh" className="hover:text-red-700">Ngũ Hành</Link></li>
              <li><Link href="/blog?category=tu-vi" className="hover:text-red-700">Tử Vi Đẩu Số</Link></li>
              <li><Link href="/blog?category=phong-thuy" className="hover:text-red-700">Phong Thủy</Link></li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href={ANMENH_URL} className="hover:text-purple-700">
                  🔮 AnMenh — Cá nhân hóa
                </a>
              </li>
              <li><Link href="/lien-he" className="hover:text-red-700">Liên hệ</Link></li>
              <li><Link href="/chinh-sach" className="hover:text-red-700">Chính sách</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Harmony Tử Vi. Bảo lưu mọi quyền.</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <span className="element-kim rounded px-2 py-0.5 text-xs">Kim</span>
            <span className="element-moc rounded px-2 py-0.5 text-xs">Mộc</span>
            <span className="element-thuy rounded px-2 py-0.5 text-xs">Thủy</span>
            <span className="element-hoa rounded px-2 py-0.5 text-xs">Hỏa</span>
            <span className="element-tho rounded px-2 py-0.5 text-xs">Thổ</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
