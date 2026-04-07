import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
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
              <li><Link href="/gia-ca" className="hover:text-red-700">Bảng giá</Link></li>
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
